"use client";

import Link from "next/link";
import Image from "next/image";
import DecorativeDivider from "@/components/DecorativeDivider";
import MarkdownContent from "@/components/MarkdownContent";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

type Post = {
  title: string;
  content: string;
  createdAt: Date;
  author?: string;
  imageUrl?: string;
};

type RelatedPost = {
  title: string;
  slug: string;
  excerpt: string;
};

export default function BlogPostContent({ post, relatedPosts }: { post: Post; relatedPosts: RelatedPost[] }) {
  const { lang } = useLang();
  const t = translations[lang].blog;

  return (
    <article className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm text-sage hover:text-sage-dark transition-colors mb-6 inline-block">← {t.backToBlog || "Volver al blog"}</Link>
        <p className="text-xs text-sage/60 mb-3">{new Date(post.createdAt).toLocaleDateString(lang === "es" ? "es" : "en")} · {post.author || "Alma Serena"}</p>
        {"imageUrl" in post && post.imageUrl && (
          <Image src={post.imageUrl} alt={post.title} width={960} height={540} className="w-full aspect-video object-cover rounded-xl mb-8" />
        )}
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-6">{post.title}</h1>
        <DecorativeDivider className="mb-8" />
        <MarkdownContent content={post.content} />

        {relatedPosts.length > 0 && (
          <>
            <DecorativeDivider className="my-12" />
            <div>
              <h2 className="font-serif text-xl text-sage-dark mb-6 text-center">{t.relatedPosts || "Artículos relacionados"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="block p-4 bg-warm-white rounded-xl border border-sage/10 hover:shadow-sm transition-shadow">
                    <h3 className="font-serif text-sm text-sage-dark mb-1">{r.title}</h3>
                    <p className="text-xs text-charcoal/40 line-clamp-2">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
