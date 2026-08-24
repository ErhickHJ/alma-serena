import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return NextResponse.json({ success: false, error: "Inicia sesión para reportar" }, { status: 401 });

  const rl = rateLimit(`forum-report:${session.userId}`, { limit: 5, windowMs: 60000 });
  if (!rl.allowed) return NextResponse.json({ success: false, error: "Demasiadas solicitudes" }, { status: 429 });

  const { postId } = await req.json();
  if (!postId) return NextResponse.json({ success: false, error: "Falta el ID del mensaje" }, { status: 400 });
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.adminLog.create({
      data: { userId: session.userId, action: "forum_report", details: `Post reportado: ${postId}`, ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "" },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
