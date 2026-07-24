"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import ImageUpload from "@/components/ImageUpload";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  emoji: string;
  category: string;
  desc: string;
  featured: boolean;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  imageUrl: string;
};

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(product?.image || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {
      name: form.get("name"),
      price: parseFloat(form.get("price") as string),
      image: imageUrl,
      emoji: form.get("emoji"),
      category: form.get("category"),
      desc: form.get("desc"),
      featured: form.get("featured") === "on",
    };
    if (product) data.id = product.id;

    const res = await fetch("/api/admin/products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      showToast("Error al guardar", "error");
      setLoading(false);
      return;
    }
    showToast(product ? "Producto actualizado" : "Producto creado", "success");
    router.push("/admin/productos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Nombre</label>
        <input name="name" defaultValue={product?.name || ""} required maxLength={200} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Precio</label>
          <input name="price" type="number" step="0.01" defaultValue={product?.price || ""} required className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Emoji</label>
          <input name="emoji" defaultValue={product?.emoji || ""} maxLength={10} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
      </div>
      <ImageUpload value={imageUrl} onChange={setImageUrl} label="Imagen del producto" />
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Categoría</label>
        <select name="category" defaultValue={product?.category || ""} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors">
          <option value="">Seleccionar</option>
          <option value="Diarios y Papelería">Diarios y Papelería</option>
          <option value="Velas y Aromas">Velas y Aromas</option>
          <option value="Mindfulness y Meditación">Mindfulness y Meditación</option>
          <option value="Ritual y Bienestar">Ritual y Bienestar</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Descripción</label>
        <textarea name="desc" rows={4} defaultValue={product?.desc || ""} maxLength={5000} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <label className="flex items-center gap-2 text-sm text-charcoal/70">
        <input name="featured" type="checkbox" defaultChecked={product?.featured || false} className="rounded border-sage/20" />
        Producto destacado
      </label>
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50">
          {loading ? "Guardando..." : product ? "Actualizar" : "Crear"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-sage/20 text-charcoal/50 rounded-lg text-sm hover:bg-sage/5 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}

type PartnerProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  partnerName: string;
  partnerContact: string;
  commission: number;
  stock: number;
  active: boolean;
};

export function PartnerProductForm({ product }: { product?: PartnerProduct }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(product?.image || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {
      name: form.get("name"),
      price: Math.round(parseFloat(form.get("price") as string) * 100),
      image: imageUrl,
      description: form.get("description"),
      category: form.get("category"),
      partnerName: form.get("partnerName"),
      partnerContact: form.get("partnerContact"),
      commission: Math.round(parseFloat(form.get("commission") as string) * 100),
      stock: parseInt(form.get("stock") as string || "0"),
      active: form.get("active") === "on",
    };
    if (product) data.id = product.id;

    const res = await fetch("/api/admin/partner-products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      showToast("Error al guardar", "error");
      setLoading(false);
      return;
    }
    showToast(product ? "Producto actualizado" : "Producto creado", "success");
    router.push("/admin/ventas-diversas");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Nombre del producto</label>
        <input name="name" defaultValue={product?.name || ""} required maxLength={200} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Precio ($)</label>
          <input name="price" type="number" step="0.01" defaultValue={product ? (product.price / 100).toFixed(2) : ""} required className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Stock</label>
          <input name="stock" type="number" defaultValue={product?.stock || 0} required className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
      </div>
      <ImageUpload value={imageUrl} onChange={setImageUrl} label="Imagen del producto" />
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Categoría</label>
        <select name="category" defaultValue={product?.category || ""} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors">
          <option value="">Seleccionar</option>
          <option value="artesanias">Artesanías</option>
          <option value="alimentos">Alimentos</option>
          <option value="bienestar">Bienestar</option>
          <option value="servicios">Servicios</option>
          <option value="otros">Otros</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Descripción</label>
        <textarea name="description" rows={4} defaultValue={product?.description || ""} maxLength={5000} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Nombre del partner</label>
          <input name="partnerName" defaultValue={product?.partnerName || ""} required maxLength={200} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Contacto (WhatsApp/teléfono)</label>
          <input name="partnerContact" defaultValue={product?.partnerContact || ""} maxLength={100} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Comisión fija ($)</label>
        <input name="commission" type="number" step="0.01" defaultValue={product ? (product.commission / 100).toFixed(2) : "5.00"} required className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <label className="flex items-center gap-2 text-sm text-charcoal/70">
        <input name="active" type="checkbox" defaultChecked={product?.active !== false} className="rounded border-sage/20" />
        Activo
      </label>
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50">
          {loading ? "Guardando..." : product ? "Actualizar" : "Crear"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-sage/20 text-charcoal/50 rounded-lg text-sm hover:bg-sage/5 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {
      title: form.get("title"),
      slug: form.get("slug"),
      excerpt: form.get("excerpt"),
      content: form.get("content"),
      author: form.get("author"),
      imageUrl: imageUrl,
      published: form.get("published") === "on",
    };
    if (post) data.id = post.id;

    const res = await fetch("/api/admin/posts", {
      method: post ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      showToast("Error al guardar", "error");
      setLoading(false);
      return;
    }
    showToast(post ? "Artículo actualizado" : "Artículo creado", "success");
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Título</label>
        <input name="title" defaultValue={post?.title || ""} required maxLength={200} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Slug</label>
          <input name="slug" defaultValue={post?.slug || ""} required maxLength={200} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Autor</label>
          <input name="author" defaultValue={post?.author || "Alma Serena"} maxLength={100} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Extracto</label>
        <textarea name="excerpt" rows={2} defaultValue={post?.excerpt || ""} maxLength={500} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/70 mb-1">Contenido (Markdown)</label>
        <textarea name="content" rows={12} defaultValue={post?.content || ""} required maxLength={50000} className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors font-mono" />
      </div>
      <ImageUpload value={imageUrl} onChange={setImageUrl} label="Imagen del artículo" />
      <label className="flex items-center gap-2 text-sm text-charcoal/70">
        <input name="published" type="checkbox" defaultChecked={post?.published || false} className="rounded border-sage/20" />
        Publicado
      </label>
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50">
          {loading ? "Guardando..." : post ? "Actualizar" : "Crear"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-sage/20 text-charcoal/50 rounded-lg text-sm hover:bg-sage/5 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}
