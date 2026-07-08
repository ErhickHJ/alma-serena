import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`partner:${ip}`, { limit: 3, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const ct = req.headers.get("content-type") || "";

  let name = "", email = "", phone = "", website = "", message = "";

  if (ct.includes("application/json")) {
    const body = await req.json();
    name = (body.name || body.business || "").trim();
    email = (body.email || "").trim();
    phone = (body.phone || "").trim();
    website = (body.website || "").trim();
    message = (body.message || "").trim();
  } else {
    const text = await req.text();
    const params = new URLSearchParams(text);
    name = (params.get("business") || params.get("name") || "").trim();
    email = (params.get("email") || "").trim();
    phone = (params.get("phone") || "").trim();
    message = (params.get("message") || "").trim();
  }

  if (!name || !email) {
    return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return Response.json({ error: "Campos exceden el límite permitido" }, { status: 400 });
  }

  await prisma.partnerRequest.create({
    data: { name, email, phone, website, message },
  });

  return Response.json({ success: true });
}
