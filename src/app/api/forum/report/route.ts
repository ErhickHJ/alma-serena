import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId } = await req.json();
  if (!postId) return NextResponse.json({ success: false, error: "Falta el ID del mensaje" }, { status: 400 });
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.adminLog.create({
      data: { userId: "anonymous", action: "forum_report", details: `Post reportado: ${postId}`, ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "" },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
