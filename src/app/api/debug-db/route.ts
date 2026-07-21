import { auth, clerkClient } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "No autorizado" }, { status: 401 });
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return Response.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const count = await prisma.post.count();
    const posts = await prisma.post.findMany({ take: 10 });
    return Response.json({
      count,
      posts: posts.map(p => ({ id: p.id, title: p.title, slug: p.slug, published: p.published })),
      dbAvailable: true,
    });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Error", dbAvailable: false });
  }
}
