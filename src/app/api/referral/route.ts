import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

const LEADER_THRESHOLDS = [
  { level: 1, min: 1, title: "Líder Bronce", badge: "🥉" },
  { level: 2, min: 5, title: "Líder Plata", badge: "🥈" },
  { level: 3, min: 15, title: "Líder Oro", badge: "🥇" },
  { level: 4, min: 30, title: "Líder Especial", badge: "✨" },
];

function getLevel(count: number) {
  for (let i = LEADER_THRESHOLDS.length - 1; i >= 0; i--) {
    if (count >= LEADER_THRESHOLDS[i].min) return LEADER_THRESHOLDS[i];
  }
  return { level: 0, min: 0, title: "Miembro", badge: "" };
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });

  const code = userId.slice(0, 8);

  try {
    const count = await prisma.referral.count({ where: { referrerUserId: userId } });
    const level = getLevel(count);
    return NextResponse.json({ success: true, code, referralUrl: `https://almaserenaoficial.com/sign-up?ref=${code}`, count, level });
  } catch {
    return NextResponse.json({ success: true, code, referralUrl: `https://almaserenaoficial.com/sign-up?ref=${code}`, count: 0, level: getLevel(0) });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });

  const { ref } = await req.json();
  if (!ref || ref.length < 4) return NextResponse.json({ success: false, error: "Código de referido inválido" }, { status: 400 });

  try {
    const existing = await prisma.referral.findUnique({ where: { referredUserId: userId } });
    if (existing) return NextResponse.json({ success: false, error: "Ya tienes un referido registrado" }, { status: 400 });

    const leaderRef = await prisma.referral.create({ data: { referrerUserId: ref, referredUserId: userId } });
    const count = await prisma.referral.count({ where: { referrerUserId: ref } });
    const level = getLevel(count);

    await prisma.communityLeader.upsert({
      where: { clerkUserId: ref },
      update: { referralCount: count, level: level.level },
      create: { clerkUserId: ref, name: "", email: "", referralCount: count, level: level.level },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Error al registrar referido" }, { status: 500 });
  }
}
