import { prisma } from "@/lib/db";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  let posts: { id: string; title: string; slug: string; excerpt: string; imageUrl: string; createdAt: Date }[] = [];
  let error: string | null = null;

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (e: any) {
    error = e?.message || "Error al cargar los artículos";
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Blog</SectionTitle>
        <p className="text-center text-charcoal/50 text-sm mt-2 mb-10">Reflexiones, gratitud y bienestar</p>
        <DecorativeDivider className="mb-12" />

        {error ? (
          <div className="text-center">
            <p className="text-charcoal/40 text-sm">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm">Próximamente artículos...</p>
        ) : (
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
        )}
      </div>
    </section>
  );
}
