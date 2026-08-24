// Admin API — CRUD de posts del blog (GET listar, POST crear, PUT actualizar)
// Rate-limited, solo admin, audita cada operación

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { logAdminAction } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

// Helper compartido para verificar admin
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

  const rl = await rateLimit(`admin:${session.userId}`, { limit: 30, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(posts);
}

export async function POST(req: Request) {
  const session = await auth();
  const check = await checkAdmin(session);
  if (check.error) return Response.json({ error: check.error }, { status: check.status! });

  const rl = await rateLimit(`admin:${session.userId}`, { limit: 30, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const raw = await req.json();
  const { title, slug, excerpt, content, author, published, imageUrl } = raw;
  if (!title || !slug || !content) return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });

  const post = await prisma.post.create({ data: { title, slug, excerpt: excerpt || "", content, author: author || "Alma Serena", published: !!published, imageUrl: imageUrl || "" } });
  await logAdminAction({ userId: session.userId!, email: check.user!.emailAddresses[0]?.emailAddress || "", action: "post_create", details: post.title });
  return Response.json(post);
}

export async function PUT(req: Request) {
  const session = await auth();
  const check = await checkAdmin(session);
  if (check.error) return Response.json({ error: check.error }, { status: check.status! });

  const rl = await rateLimit(`admin:${session.userId}`, { limit: 30, windowMs: 60000 });
  if (!rl.allowed) return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 });

  const raw = await req.json();
  const { id, title, slug, excerpt, content, author, published, imageUrl } = raw;
  if (!id) return Response.json({ error: "id required" }, { status: 400 });

  const post = await prisma.post.update({ where: { id }, data: { title, slug, excerpt, content, author, published, imageUrl } });
  await logAdminAction({ userId: session.userId!, email: check.user!.emailAddresses[0]?.emailAddress || "", action: "post_update", details: post.title });
  return Response.json(post);
}
