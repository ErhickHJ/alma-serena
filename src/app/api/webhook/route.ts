import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email || "unknown@checkout.com";
    const name = session.customer_details?.name || "Stripe Customer";
    const amount = session.amount_total || 0;

    await prisma.order.updateMany({
      where: { paymentId: session.id },
      data: { email, name, amount, status: "completed" },
    });

    sendOrderConfirmation(email, name, amount, session.id);
  }

  return Response.json({ received: true });
}
