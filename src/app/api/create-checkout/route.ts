import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const rl = await rateLimit(`checkout:${session.userId}`, { limit: 5, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const { items, successUrl, cancelUrl } = await req.json();

  if (!items?.length) {
    return Response.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const maxItems = 50;
  const safeItems = items.slice(0, maxItems);

  const lineItems = safeItems.map((item: { name: string; price: number; quantity: number }) => ({
    price_data: {
      currency: "usd",
      product_data: { name: String(item.name || "").slice(0, 200) },
      unit_amount: Math.max(0, Math.round(Number(item.price || 0) * 100)),
    },
    quantity: Math.max(1, Math.floor(Number(item.quantity || 1))),
  }));

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: successUrl || `${req.headers.get("origin")}/checkout?success=true`,
    cancel_url: cancelUrl || `${req.headers.get("origin")}/checkout?cancelled=true`,
    shipping_address_collection: { allowed_countries: ["US", "MX", "ES", "AR", "CO", "CL", "PE"] },
  });

  const hasPartnerItems = safeItems.some((item: { type?: string }) => item.type === "partner");
  let partnerName = "";
  let partnerContact = "";
  let totalCommission = 0;

  if (hasPartnerItems) {
    const partnerItem = safeItems.find((item: { type?: string }) => item.type === "partner") as { partnerName?: string; partnerContact?: string; commission?: number; quantity?: number } | undefined;
    if (partnerItem) {
      partnerName = partnerItem.partnerName || "";
      partnerContact = partnerItem.partnerContact || "";
      totalCommission = safeItems
        .filter((item: { type?: string }) => item.type === "partner")
        .reduce((sum: number, item: { commission?: number; quantity?: number }) => sum + (item.commission || 0) * (item.quantity || 1), 0);
    }
  }

  await prisma.order.create({
    data: {
      email: "pending@checkout.com",
      name: "Stripe Checkout",
      amount: lineItems.reduce((t: number, i: { unit_amount: number; quantity: number }) => t + i.unit_amount * i.quantity, 0),
      status: "pending",
      paymentId: stripeSession.id,
      clerkUserId: session.userId,
      type: hasPartnerItems ? "partner" : "store",
      partnerName,
      partnerContact,
      commission: Math.round(totalCommission * 100),
    },
  });

  return Response.json({ url: stripeSession.url });
}
