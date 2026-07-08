import { prisma } from "@/lib/db";

const BASE = "https://alma-serena-iota.vercel.app";

export default async function sitemap() {
  let blogPages: { url: string; lastModified: Date; changeFrequency: string; priority: number }[] = [];

  try {
    const posts = await prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
    blogPages = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB not reachable during build — return only static pages
  }

  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${BASE}/libro`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE}/tienda`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/comunidad`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/partners`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/contacto`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/carrito`, lastModified: new Date(), changeFrequency: "never" as const, priority: 0.3 },
  ];

  return [...staticPages, ...blogPages];
}
