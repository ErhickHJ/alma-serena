// Admin API — Eliminación genérica (DELETE)
// Soporta: order, contact, subscriber, post, product
// Rate-limited, solo admin, audita cada eliminación

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { logAdminAction } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "No autorizado" }, { status: 401 });

  const rl = await rateLimit(`admin:${session.userId}`, { limit: 30, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return Response.json({ error: "No autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) return Response.json({ error: "Faltan parámetros" }, { status: 400 });

  try {
    let deleted = false;
    switch (type) {
      case "order":
        deleted = (await prisma.order.delete({ where: { id } })).id !== undefined;
        break;
      case "contact":
        deleted = (await prisma.contactMessage.delete({ where: { id } })).id !== undefined;
        break;
      case "subscriber":
        deleted = (await prisma.subscriber.delete({ where: { id } })).id !== undefined;
        break;
      case "post":
        deleted = (await prisma.post.delete({ where: { id } })).id !== undefined;
        break;
      case "product":
        deleted = (await prisma.product.delete({ where: { id } })).id !== undefined;
        break;
      case "partnerProduct":
        deleted = (await prisma.partnerProduct.delete({ where: { id } })).id !== undefined;
        break;
      default:
        return Response.json({ error: "Tipo inválido" }, { status: 400 });
    }
    if (!deleted) return Response.json({ error: "Registro no encontrado" }, { status: 404 });
    await logAdminAction({ userId: session.userId, email: user.emailAddresses[0]?.emailAddress || "", action: `delete_${type}`, details: id, ip: req.headers.get("x-forwarded-for") || "" });
    return Response.json({ success: true });
  } catch (e: any) {
    if (e?.code === "P2025") return Response.json({ error: "Registro no encontrado" }, { status: 404 });
    return Response.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
