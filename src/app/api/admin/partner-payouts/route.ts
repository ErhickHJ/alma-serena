// Admin API — Reporte de comisiones de partners
// Retorna resumen de cuánto se le debe a cada partner por ventas completadas

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

async function checkAdmin(session: { userId: string | null }) {
  if (!session.userId) return { error: "No autorizado", status: 401 };
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return { error: "No autorizado", status: 403 };
  }
  return { user, error: null };
}

export async function GET() {
  const session = await auth();
  const check = await checkAdmin(session);
  if (check.error) return Response.json({ error: check.error }, { status: check.status! });

  const orders = await prisma.order.findMany({
    where: {
      type: "partner",
      status: "completed",
    },
    select: {
      partnerName: true,
      partnerContact: true,
      amount: true,
      commission: true,
      product: true,
      createdAt: true,
    },
  });

  const summary: Record<string, { name: string; contact: string; totalSales: number; totalCommission: number; owedToPartner: number; orders: number }> = {};

  for (const o of orders) {
    const key = o.partnerName;
    if (!summary[key]) {
      summary[key] = { name: o.partnerName, contact: o.partnerContact, totalSales: 0, totalCommission: 0, owedToPartner: 0, orders: 0 };
    }
    summary[key].totalSales += o.amount;
    summary[key].totalCommission += o.commission;
    summary[key].owedToPartner += o.amount - o.commission;
    summary[key].orders += 1;
  }

  return Response.json(Object.values(summary));
}
