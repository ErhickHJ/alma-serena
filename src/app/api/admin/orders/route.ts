import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { logAdminAction } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

const VALID_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "No autorizado" }, { status: 401 });

  const rl = rateLimit(`admin:${session.userId}`, { limit: 30, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return Response.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id, status } = await req.json();

  if (!id || !status) {
    return Response.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ error: "Estado inválido" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  await logAdminAction({
    userId: session.userId,
    email: user.emailAddresses[0]?.emailAddress || "",
    action: `order_status_${status}`,
    details: `${order.name} — ${order.email} — $${(order.amount / 100).toFixed(2)}`,
    ip: req.headers.get("x-forwarded-for") || "",
  });

  return Response.json(order);
}
