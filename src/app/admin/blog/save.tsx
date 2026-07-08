"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PostForm({ post }: { post?: { id: string; title: string; slug: string; excerpt: string; content: string; author: string; published: boolean; imageUrl: string } }) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [author, setAuthor] = useState(post?.author || "Alma Serena");
  const [published, setPublished] = useState(post?.published || false);
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || "");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/posts", {
      method: post ? "PUT" : "POST",
      body: JSON.stringify({ id: post?.id, title, slug, excerpt, content, author, published, imageUrl }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) router.push("/admin/blog");
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div>
        <label className="block text-sm text-charcoal/60 mb-1">Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label className="block text-sm text-charcoal/60 mb-1">Slug</label>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="mi-articulo" className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label className="block text-sm text-charcoal/60 mb-1">Extracto</label>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label className="block text-sm text-charcoal/60 mb-1">Contenido</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={12} className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors font-mono" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-charcoal/60 mb-1">Autor</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
        <div>
          <label className="block text-sm text-charcoal/60 mb-1">URL de imagen</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-charcoal/60">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="accent-sage" />
        Publicado
      </label>
      <button type="submit" disabled={saving} className="px-6 py-3 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50">
        {saving ? "Guardando..." : post ? "Actualizar artículo" : "Crear artículo"}
      </button>
    </form>
  );
}
