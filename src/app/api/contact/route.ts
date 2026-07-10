import { prisma } from "@/lib/db";
import { notifyNewContact } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { validateOrigin, checkHoneypot } from "@/lib/security";

export async function POST(req: Request) {
  if (!validateOrigin(req)) {
    return Response.json({ error: "Origen no válido" }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`contact:${ip}`, { limit: 3, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 });

  const text = await req.text();
  const params = new URLSearchParams(text);

  if (!checkHoneypot(params)) {
    return Response.json({ error: "Spam detectado" }, { status: 400 });
  }

  const name = params.get("name")?.trim() || "";
  const email = params.get("email")?.trim() || "";
  const subject = params.get("subject")?.trim() || "";
  const message = params.get("message")?.trim() || "";

  if (!name || !email || !message) {
    return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return Response.json({ error: "Campos exceden el límite permitido" }, { status: 400 });
  }

  await prisma.contactMessage.create({
    data: { name, email, subject, message },
  });

  notifyNewContact(name, email, subject, message);

  return Response.redirect(new URL("/contacto?sent=true", req.url));
}