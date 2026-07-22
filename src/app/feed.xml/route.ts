import { NextResponse } from "next/server";

const BASE = "https://almaserenaoficial.com";

export async function GET() {
  let posts: { title: string; slug: string; excerpt: string; createdat: string; author: string }[] = [];

  try {
    const { Pool } = await import("pg");
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 8000,
    });
    const client = await pool.connect();
    const res = await client.query(
      'SELECT title, slug, excerpt, "createdAt", author FROM "Post" WHERE "published" = true ORDER BY "createdAt" DESC LIMIT 20'
    );
    posts = res.rows.map((r) => ({
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt || "",
      createdat: new Date(r.createdAt).toUTCString(),
      author: r.author || "Alma Serena",
    }));
    client.release();
    await pool.end();
  } catch {
    // offline
  }

  const items = posts
    .map(
      (p) => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid>${BASE}/blog/${p.slug}</guid>
      <description><![CDATA[${p.excerpt}]]></description>
      <author>${p.author}</author>
      <pubDate>${p.createdat}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alma Serena — Blog</title>
    <link>${BASE}/blog</link>
    <description>Reflexiones, gratitud y bienestar — El blog de Alma Serena</description>
    <language>es</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
