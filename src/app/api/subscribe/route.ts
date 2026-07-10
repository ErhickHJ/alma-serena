import { prisma } from "@/lib/db";
import { sendWelcomeSubscriber } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { validateOrigin, checkHoneypot } from "@/lib/security";

export async function POST(req: Request) {
  if (!validateOrigin(req)) {
    return Response.json({ error: "Origen no válido" }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`subscribe:${ip}`, { limit: 5, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const body = await req.json();

  if (!checkHoneypot(body)) {
    return Response.json({ error: "Spam detectado" }, { status: 400 });
  }

  const { email, name } = body;
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