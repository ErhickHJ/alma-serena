import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { logAdminAction } from "@/lib/audit";

async function checkAdmin(session: { userId: string | null }, req: Request) {
  if (!session.userId) return { error: "No autorizado", status: 401 };
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return { error: "No autorizado", status: 403 };
  }
  return { user, error: null };
}

export async function POST(req: Request) {
  const session = await auth();
  const check = await checkAdmin(session, req);
  if (check.error) return Response.json({ error: check.error }, { status: check.status! });

  const data = await req.json();
  const post = await prisma.post.create({ data });
  await logAdminAction({ userId: session.userId!, email: check.user!.emailAddresses[0]?.emailAddress || "", action: "post_create", details: post.title });
  return Response.json(post);
}

export async function PUT(req: Request) {
  const session = await auth();
  const check = await checkAdmin(session, req);
  if (check.error) return Response.json({ error: check.error }, { status: check.status! });

  const data = await req.json();
  const { id, ...rest } = data;
  const post = await prisma.post.update({ where: { id }, data: rest });
  await logAdminAction({ userId: session.userId!, email: check.user!.emailAddresses[0]?.emailAddress || "", action: "post_update", details: post.title });
  return Response.json(post);
}
