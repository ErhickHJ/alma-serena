import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { items, successUrl, cancelUrl, clerkUserId } = await req.json();

  if (!items?.length) {
    return Response.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const lineItems = items.map((item: { name: string; price: number; quantity: number }) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: successUrl || `${req.headers.get("origin")}/checkout?success=true`,
    cancel_url: cancelUrl || `${req.headers.get("origin")}/checkout?cancelled=true`,
    shipping_address_collection: { allowed_countries: ["US", "MX", "ES", "AR", "CO", "CL", "PE"] },
  });

  await prisma.order.create({
    data: {
      email: "pending@checkout.com",
      name: "Stripe Checkout",
      amount: lineItems.reduce((t: number, i: { unit_amount: number; quantity: number }) => t + i.unit_amount * i.quantity, 0),
      status: "pending",
      paymentId: session.id,
      clerkUserId,
    },
  });

  return Response.json({ url: session.url });
}
