import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const posts = await prisma.forumPost.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    return NextResponse.json({ success: true, posts });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, error: "Inicia sesión para participar" }, { status: 401 });

  const { text, tag } = await req.json();
  if (!text || text.trim().length < 2) return NextResponse.json({ success: false, error: "Escribe un mensaje" }, { status: 400 });

  try {
    const client = await (await import("@clerk/nextjs/server")).clerkClient();
    const user = userId ? await client.users.getUser(userId) : null;
    const author = user?.fullName || user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "Anónimo";

    const post = await prisma.forumPost.create({
      data: { author, clerkUserId: userId, text: text.trim(), tag: tag?.trim() || "" },
    });
    return NextResponse.json({ success: true, post });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}
