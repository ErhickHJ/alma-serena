import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { rateLimit } from "@/lib/rate-limit";
import { logAdminAction } from "@/lib/audit";

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return NextResponse.json({ success: false, error: "Inicia sesión para reportar" }, { status: 401 });

  const rl = await rateLimit(`forum-report:${session.userId}`, { limit: 5, windowMs: 60000 });
  if (!rl.allowed) return NextResponse.json({ success: false, error: "Demasiadas solicitudes" }, { status: 429 });

  const { postId } = await req.json();
  if (!postId || typeof postId !== "string") return NextResponse.json({ success: false, error: "Falta el ID del mensaje" }, { status: 400 });

  await logAdminAction({ userId: session.userId, action: "forum_report", details: `Post reportado: ${postId}`, ip: req.headers.get("x-forwarded-for") || "" });
  return NextResponse.json({ success: true });
}
