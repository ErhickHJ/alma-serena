import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (!productId) return NextResponse.json({ success: false, error: "Missing productId" }, { status: 400 });

  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, reviews });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, error: "Inicia sesión para reseñar" }, { status: 401 });

  const { productId, rating, text } = await req.json();
  if (!productId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ success: false, error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const client = await (await import("@clerk/nextjs/server")).clerkClient();
    const user = await client.users.getUser(userId);
    const author = user?.fullName || user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "Anónimo";

    const existing = await prisma.review.findFirst({ where: { productId, clerkUserId: userId } });
    if (existing) {
      const updated = await prisma.review.update({
        where: { id: existing.id },
        data: { rating, text: text?.trim() || "" },
      });
      return NextResponse.json({ success: true, review: updated });
    }

    const review = await prisma.review.create({
      data: { productId, clerkUserId: userId, author, rating, text: text?.trim() || "" },
    });
    return NextResponse.json({ success: true, review });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}
