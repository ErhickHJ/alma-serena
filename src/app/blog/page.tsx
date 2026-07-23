import { prisma } from "@/lib/db";
import BlogContent from "./BlogContent";

export const metadata = {
  title: "Blog",
  alternates: { canonical: "https://almaserenaoficial.com/blog" },
  other: { "atom:link": "https://almaserenaoficial.com/feed.xml" },
};

const PER_PAGE = 9;

const FALLBACK_POSTS = [
  { id: "1", title: "El poder de la gratitud en tu vida diaria", slug: "poder-de-la-gratitud", excerpt: "Descubre cómo practicar la gratitud puede transformar tu perspectiva y traer más paz a tu día a día.", imageUrl: "/images/el porder de la gratitud.png", createdAt: new Date("2026-01-15") },
  { id: "2", title: "5 rituales matutinos para empezar el día con calma", slug: "5-rituales-matutinos-calma", excerpt: "Pequeñas acciones que puedes incorporar cada mañana para cultivar serenidad y bienestar.", imageUrl: "/images/5 rituales matutinos.png", createdAt: new Date("2026-02-01") },
  { id: "3", title: "Cómo crear un espacio de paz en tu hogar", slug: "espacio-de-paz-en-casa", excerpt: "Consejos sencillos para transformar cualquier rincón de tu casa en un refugio de tranquilidad.", imageUrl: "/images/espacio de paz.png", createdAt: new Date("2026-02-20") },
  { id: "4", title: "La ciencia detrás de la meditación", slug: "ciencia-detras-meditacion", excerpt: "Qué dice la investigación sobre los beneficios de la meditación para tu mente y tu cuerpo.", imageUrl: "/images/ciencia tras la meditacion.png", createdAt: new Date("2026-03-10") },
  { id: "5", title: "Aceptar lo que no podemos controlar", slug: "aceptar-lo-que-no-podemos-controlar", excerpt: "Una reflexión sobre el arte de soltar y encontrar paz en medio de la incertidumbre.", imageUrl: "/images/aceptar lo que no podemos controlar.png", createdAt: new Date("2026-03-28") },
  { id: "6", title: "Diario de gratitud: cómo empezar y mantener el hábito", slug: "diario-de-gratitud-como-empezar", excerpt: "Guía práctica para crear y mantener un diario de gratitud que transforme tu mirada.", imageUrl: "/images/diario como empezar.png", createdAt: new Date("2026-04-15") },
];

export default async function BlogPage(props: { searchParams?: Promise<{ q?: string; page?: string }> }) {
  const { q = "", page: pageStr } = await (props.searchParams ?? Promise.resolve({ q: "", page: "1" }));
  const page = Math.max(1, Number(pageStr) || 1);
  let posts: typeof FALLBACK_POSTS = [];
  let total = 0;
  let offline = false;

  const where: Record<string, unknown> = { published: true };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" as const } },
      { excerpt: { contains: q, mode: "insensitive" as const } },
    ];
  }

  try {
    const [dbPosts, dbTotal] = await Promise.all([
      prisma.post.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
      prisma.post.count({ where }),
    ]);
    posts = (dbPosts as typeof FALLBACK_POSTS).length > 0 ? (dbPosts as typeof FALLBACK_POSTS) : FALLBACK_POSTS;
    total = dbPosts.length > 0 ? dbTotal : FALLBACK_POSTS.length;
    if (dbPosts.length === 0 && dbTotal === 0) offline = true;
  } catch {
    offline = true;
    posts = q
      ? FALLBACK_POSTS.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase()))
      : FALLBACK_POSTS;
    total = posts.length;
  }

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <BlogContent
      posts={posts}
      total={total}
      totalPages={totalPages}
      page={page}
      q={q}
      offline={offline}
    />
  );
}
