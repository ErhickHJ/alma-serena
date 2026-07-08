import { prisma } from "@/lib/db";
import { sendWelcomeSubscriber } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`subscribe:${ip}`, { limit: 5, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const { email, name } = await req.json();
  if (!email) return Response.json({ error: "Email requerido" }, { status: 400 });

  if (typeof email !== "string" || email.length > 200) {
    return Response.json({ error: "Email inválido" }, { status: 400 });
  }

  const existing = await prisma.subscriber.findUnique({ where: { email } });
  if (existing) return Response.json({ message: "Ya estás suscrito" });

  await prisma.subscriber.create({ data: { email, name: name || "" } });

  sendWelcomeSubscriber(email, name);

  return Response.json({ success: true });
}
