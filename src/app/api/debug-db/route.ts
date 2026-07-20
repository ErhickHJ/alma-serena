import { prisma } from "@/lib/db";

export async function GET() {
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
