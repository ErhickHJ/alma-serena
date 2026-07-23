"use client";

import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { Pagination } from "@/components/Pagination";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  createdAt: Date | string;
};

export default function BlogContent({ posts, total, totalPages, page, q, offline }: {
  posts: Post[];
  total: number;
  totalPages: number;
  page: number;
  q: string;
  offline: boolean;
}) {
  const { lang } = useLang();
  const t = translations[lang].blog;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Blog</SectionTitle>
        <p className="text-center text-charcoal/50 text-sm mt-2 mb-6">{t.heroTitle}</p>

        <form className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={q || ""}
              placeholder={t.searchPlaceholder}
              className="w-full px-4 py-2.5 pl-10 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>

        <div className="text-center max-w-lg mx-auto mb-8">
          <p className="text-sm text-sage-dark/60 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
          <p className="text-xs text-charcoal/40 mt-2">— Cicerón</p>
        </div>

        <DecorativeDivider className="mb-12" />

        {offline && (
          <div className="text-center mb-8">
            <p className="text-xs text-sage/50 italic">✿ {t.samplePosts}</p>
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm">{q ? t.noResults : t.comingSoon}</p>
        ) : (
          <div>
            {q && <p className="text-sm text-charcoal/40 mb-6 text-center">{total} {t.resultsFor} &ldquo;{q}&rdquo;</p>}
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
