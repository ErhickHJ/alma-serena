import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { logAdminAction } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

async function checkAdmin(session: { userId: string | null }) {
  if (!session.userId) return { error: "No autorizado", status: 401 };
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return { error: "No autorizado", status: 403 };
  }
  return { user, error: null };
}

export async function GET(req: Request) {
  const session = await auth();
  const check = await checkAdmin(session);
  if (check.error) return Response.json({ error: check.error }, { status: check.status! });

  const products = await prisma.product.findMany({ orderBy: { category: "asc" } });
  return Response.json(products);
}

export async function POST(req: Request) {
  const session = await auth();
  const check = await checkAdmin(session);
  if (check.error) return Response.json({ error: check.error }, { status: check.status! });

  const rl = rateLimit(`admin:${session.userId}`, { limit: 30, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const data = await req.json();
  const product = await prisma.product.create({ data });
  await logAdminAction({ userId: session.userId!, email: check.user!.emailAddresses[0]?.emailAddress || "", action: "product_create", details: product.name });
  return Response.json(product);
}

export async function PUT(req: Request) {
  const session = await auth();
  const check = await checkAdmin(session);
  if (check.error) return Response.json({ error: check.error }, { status: check.status! });

  const rl = rateLimit(`admin:${session.userId}`, { limit: 30, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const data = await req.json();
  const { id, ...rest } = data;
  const product = await prisma.product.update({ where: { id }, data: rest });
  await logAdminAction({ userId: session.userId!, email: check.user!.emailAddresses[0]?.emailAddress || "", action: "product_update", details: product.name });
  return Response.json(product);
}
