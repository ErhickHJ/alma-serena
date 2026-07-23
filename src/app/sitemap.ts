import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";
import { prisma } from "@/lib/db";

const FALLBACK_SLUGS = [
  "el-diario-de-90-dias",
  "kit-de-journaling",
  "el-poder-de-lo-simple",
  "comunidad-alma-serena",
  "tiktok-alma-serena",
  "primer-encuentro-comunidad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []);
  const products = await prisma.product.findMany({ select: { id: true } }).catch(() => []);

  const blogPages = (posts.length > 0 ? posts : FALLBACK_SLUGS.map((s) => ({ slug: s, updatedAt: new Date() }))).map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productPages = products.map((p) => ({
    url: `${BASE_URL}/tienda/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/tienda`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...blogPages,
    ...productPages,
    { url: `${BASE_URL}/comunidad`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/recursos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/sobre-mi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/checkout`, lastModified: new Date(), changeFrequency: "never", priority: 0.1 },
  ];
}
