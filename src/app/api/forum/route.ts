import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  try {
    const posts = await prisma.forumPost.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    return NextResponse.json({ success: true, posts });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, error: (e as Error)?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, error: "Inicia sesión para participar" }, { status: 401 });

  const rl = await rateLimit(`forum-post:${userId}`, { limit: 10, windowMs: 600000 });
  if (!rl.allowed) return NextResponse.json({ success: false, error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." }, { status: 429 });

  let body: { text?: string; tag?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "JSON inválido" }, { status: 400 });
  }
  const { text, tag } = body;
  if (!text || text.trim().length < 2) return NextResponse.json({ success: false, error: "Escribe un mensaje" }, { status: 400 });
  if (text.trim().length > 2000) return NextResponse.json({ success: false, error: "El mensaje es demasiado largo (máximo 2000 caracteres)" }, { status: 400 });

  try {
    const client = await (await import("@clerk/nextjs/server")).clerkClient();
    const user = userId ? await client.users.getUser(userId) : null;
    const author = user?.fullName || user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "Anónimo";

    const post = await prisma.forumPost.create({
      data: { author, clerkUserId: userId, text: text.trim().slice(0, 2000), tag: tag?.trim().slice(0, 50) || "" },
    });
    return NextResponse.json({ success: true, post });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, error: (e as Error)?.message }, { status: 500 });
  }
}
