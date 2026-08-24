import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { rateLimit } from "@/lib/rate-limit";
import { logAdminAction } from "@/lib/audit";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return NextResponse.json({ success: false, error: "Inicia sesión para reportar" }, { status: 401 });

  const rl = await rateLimit(`forum-report:${session.userId}`, { limit: 5, windowMs: 60000 });
  if (!rl.allowed) return NextResponse.json({ success: false, error: "Demasiadas solicitudes" }, { status: 429 });

  const { postId } = await req.json();
  if (!postId || typeof postId !== "string") return NextResponse.json({ success: false, error: "Falta el ID del mensaje" }, { status: 400 });

  const post = await prisma.forumPost.findUnique({ where: { id: postId }, select: { id: true, author: true, text: true } });
  if (!post) return NextResponse.json({ success: false, error: "Mensaje no encontrado" }, { status: 404 });

  await logAdminAction({ userId: session.userId, action: "forum_report", details: `Post by ${post.author}: "${post.text.slice(0, 80)}"`, ip: req.headers.get("x-forwarded-for") || "" });
  return NextResponse.json({ success: true });
}
