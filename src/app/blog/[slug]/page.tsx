import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import DecorativeDivider from "@/components/DecorativeDivider";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  return (
    <article className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm text-sage hover:text-sage-dark transition-colors mb-6 inline-block">← Volver al blog</Link>
        {post.imageUrl && (
          <div className="aspect-[16/9] bg-sage/10 rounded-xl overflow-hidden mb-8">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <p className="text-xs text-sage/60 mb-3">{new Date(post.createdAt).toLocaleDateString("es")} · {post.author}</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-6">{post.title}</h1>
        <DecorativeDivider className="mb-8" />
        <div className="prose prose-sm max-w-none text-charcoal/70 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </article>
  );
}
