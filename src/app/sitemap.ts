import { NextResponse } from "next/server";

const BASE = "https://almaserenaoficial.com";

export default async function sitemap() {
  let blogPages: { url: string; lastModified: Date; changeFrequency: string; priority: number }[] = [];

  try {
    const { Pool } = await import("pg");
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 8000,
    });
    const client = await pool.connect();
    const res = await client.query(
      'SELECT slug, "updatedAt" FROM "Post" WHERE "published" = true'
    );
    blogPages = res.rows.map((r) => ({
      url: `${BASE}/blog/${r.slug}`,
      lastModified: new Date(r.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    client.release();
    await pool.end();
  } catch {
    // DB not reachable — return only static pages
  }

  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${BASE}/libro`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE}/tienda`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/comunidad`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/ventas-diversas`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/partners`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/contacto`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/carrito`, lastModified: new Date(), changeFrequency: "never" as const, priority: 0.3 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE}/terminos`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE}/aviso-privacidad`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  return [...staticPages, ...blogPages];
}
