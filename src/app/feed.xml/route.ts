import { prisma } from "@/lib/db";

const BASE = "https://almaserenaoficial.com";

export async function GET() {
  let posts: { title: string; slug: string; excerpt: string; createdAt: Date; author: string }[] = [];

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      select: { title: true, slug: true, excerpt: true, createdAt: true, author: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
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
      <pubDate>${new Date(p.createdAt).toUTCString()}</pubDate>
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

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
