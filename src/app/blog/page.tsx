import { prisma } from "@/lib/db";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { Pagination } from "@/components/Pagination";

export const metadata = { title: "Blog" };

const PER_PAGE = 9;

export default async function BlogPage(props: { searchParams?: Promise<{ q?: string; page?: string }> }) {
  const { q = "", page: pageStr } = await (props.searchParams ?? Promise.resolve({ q: "", page: "1" }));
  const page = Math.max(1, Number(pageStr) || 1);
  let posts: { id: string; title: string; slug: string; excerpt: string; imageUrl: string; createdAt: Date }[] = [];
  let total = 0;
  let error: string | null = null;

  const where: Record<string, unknown> = { published: true };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" as const } },
      { excerpt: { contains: q, mode: "insensitive" as const } },
    ];
  }

  try {
    [posts, total] = await Promise.all([
      prisma.post.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
      prisma.post.count({ where }),
    ]);
  } catch (e: any) {
    error = e?.message || "Error al cargar los artículos";
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

        <DecorativeDivider className="mb-12" />

        {error ? (
          <div className="text-center">
            <p className="text-charcoal/40 text-sm">{error}</p>
          </div>
        ) : posts.length === 0 ? (
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
                  {post.imageUrl && (
                    <div className="aspect-[16/9] bg-sage/10 overflow-hidden">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
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
      </div>
    </section>
  );
}
