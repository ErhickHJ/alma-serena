import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const rl = await rateLimit(`metrics:${session.userId}`, { limit: 30, windowMs: 60000 });
  if (!rl.allowed) return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const { clerkClient } = await import("@clerk/nextjs/server");
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const [totalOrders, pendingOrders, completedOrders, totalRevenue, totalSubscribers, totalContacts, totalProducts, totalPosts, recentOrders, ordersByStatus, partnerProductCount, partnerOrderCount, partnerRevenue, dailyOrders] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.order.count({ where: { status: "completed" } }),
      prisma.order.aggregate({ where: { status: { in: ["completed", "shipped", "delivered"] } }, _sum: { amount: true } }),
      prisma.subscriber.count(),
      prisma.contactMessage.count(),
      prisma.product.count(),
      prisma.post.count(),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 10, select: { id: true, name: true, email: true, product: true, amount: true, status: true, createdAt: true, type: true } }),
      prisma.order.groupBy({ by: ["status"], _count: true }),
      prisma.partnerProduct.count(),
      prisma.order.count({ where: { type: "partner" } }),
      prisma.order.aggregate({ _sum: { amount: true }, where: { type: "partner" } }),
      prisma.$queryRaw<{ date: string; count: number; revenue: number }[]>`
        SELECT 
          TO_CHAR("createdAt", 'YYYY-MM-DD') as date,
          COUNT(*)::int as count,
          COALESCE(SUM(CASE WHEN "status" IN ('completed','shipped','delivered') THEN "amount" ELSE 0 END), 0)::int as revenue
        FROM "Order"
        WHERE "createdAt" >= NOW() - INTERVAL '30 days'
        GROUP BY TO_CHAR("createdAt", 'YYYY-MM-DD')
        ORDER BY date ASC
      `,
    ]);

    return NextResponse.json({
      success: true,
      metrics: {
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue: totalRevenue._sum.amount || 0,
        totalSubscribers,
        totalContacts,
        totalProducts,
        totalPosts,
        partnerProductCount,
        partnerOrderCount,
        partnerRevenue: partnerRevenue._sum.amount || 0,
        recentOrders,
        ordersByStatus: ordersByStatus.map(s => ({ status: s.status, count: s._count })),
        dailyOrders,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : "Error" }, { status: 500 });
  }
}
