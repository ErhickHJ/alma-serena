import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

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

  const rl = await rateLimit(`referral:${userId}`, { limit: 10, windowMs: 60000 });
  if (!rl.allowed) return NextResponse.json({ success: false, error: "Demasiadas solicitudes" }, { status: 429 });

  const { ref } = await req.json();
  if (!ref || typeof ref !== "string" || ref.length < 4) {
    return NextResponse.json({ success: false, error: "Código de referido inválido" }, { status: 400 });
  }

  const ownCode = userId.slice(0, 8);
  if (ref === ownCode || ref === userId) {
    return NextResponse.json({ success: false, error: "No puedes referirte a ti mismo" }, { status: 400 });
  }

  try {
    const existing = await prisma.referral.findUnique({ where: { referredUserId: userId } });
    if (existing) return NextResponse.json({ success: false, error: "Ya tienes un referido registrado" }, { status: 400 });

    const { clerkClient } = await import("@clerk/nextjs/server");
    const client = await clerkClient();
    const referrerUsers = await client.users.getUserList({ query: ref, limit: 10 });
    const referrer = referrerUsers.data.find(u => u.id.startsWith(ref) || u.id === ref);
    if (!referrer) {
      return NextResponse.json({ success: false, error: "Código de referido no válido" }, { status: 400 });
    }
    const referrerUserId = referrer.id;

    await prisma.referral.create({ data: { referrerUserId, referredUserId: userId } });
    const count = await prisma.referral.count({ where: { referrerUserId } });
    const level = getLevel(count);

    await prisma.communityLeader.upsert({
      where: { clerkUserId: referrerUserId },
      update: { referralCount: count, level: level.level },
      create: { clerkUserId: referrerUserId, name: referrer.fullName || referrer.firstName || "", email: referrer.emailAddresses?.[0]?.emailAddress || "", referralCount: count, level: level.level },
    });

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, error: (e as Error)?.message || "Error al registrar referido" }, { status: 500 });
  }
}
