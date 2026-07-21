import { prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { Pagination } from "@/components/Pagination";

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
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Blog</SectionTitle>
        <p className="text-center text-charcoal/50 text-sm mt-2 mb-6">Reflexiones, gratitud y bienestar</p>

        <form className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={q || ""}
              placeholder="Buscar artículos..."
              className="w-full px-4 py-2.5 pl-10 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>

        <div className="text-center max-w-lg mx-auto mb-8">
          <p className="text-sm text-sage-dark/60 italic leading-relaxed">"La gratitud no solo es la más grande de las virtudes, sino la madre de todas las demás."</p>
          <p className="text-xs text-charcoal/40 mt-2">— Cicerón</p>
        </div>

        <DecorativeDivider className="mb-12" />

        {offline && (
          <div className="text-center mb-8">
            <p className="text-xs text-sage/50 italic">✿ Artículos de muestra — inicia sesión como admin para escribir y publicar</p>
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm">{q ? "No se encontraron artículos." : "Próximamente artículos..."}</p>
        ) : (
          <div>
            {q && <p className="text-sm text-charcoal/40 mb-6 text-center">{total} resultado{total !== 1 ? "s" : ""} para &ldquo;{q}&rdquo;</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-warm-white rounded-xl border border-sage/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {post.imageUrl && <Image src={post.imageUrl} alt={post.title} width={640} height={360} className="w-full aspect-video object-cover" />}
                  <div className="p-5">
                    <p className="text-xs text-sage/60 mb-2">{new Date(post.createdAt).toLocaleDateString("es")}</p>
                    <h2 className="font-serif text-lg text-sage-dark group-hover:text-sage transition-colors mb-2">{post.title}</h2>
                    {post.excerpt && <p className="text-sm text-charcoal/50 leading-relaxed line-clamp-3">{post.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} basePath="/blog" query={q} />
          </div>
        )}

        <DecorativeDivider className="my-16" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <p className="text-2xl mb-2">✿</p>
            <p className="text-xs text-charcoal/50 italic">"La gratitud convierte lo que tenemos en suficiente."</p>
          </div>
          <div className="p-4">
            <p className="text-2xl mb-2">☽</p>
            <p className="text-xs text-charcoal/50 italic">"En medio del movimiento, encuentra tu calma."</p>
          </div>
          <div className="p-4">
            <p className="text-2xl mb-2">✦</p>
            <p className="text-xs text-charcoal/50 italic">"Pequeñas pausas, grandes transformaciones."</p>
          </div>
        </div>
      </div>
    </section>
  );
}
