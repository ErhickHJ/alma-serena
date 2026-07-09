"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductData = {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  emoji?: string;
  category?: string;
  desc?: string;
  featured?: boolean;
};

export function ProductForm({ product }: { product?: ProductData }) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [image, setImage] = useState(product?.image || "");
  const [emoji, setEmoji] = useState(product?.emoji || "");
  const [category, setCategory] = useState(product?.category || "");
  const [desc, setDesc] = useState(product?.desc || "");
  const [featured, setFeatured] = useState(product?.featured || false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const body = { id: product?.id, name, price: parseFloat(price), image, emoji, category, desc, featured };
    const res = await fetch("/api/admin/products", {
      method: product?.id ? "PUT" : "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) router.push("/admin/productos");
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div>
        <label className="block text-sm text-charcoal/60 mb-1">Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-charcoal/60 mb-1">Precio ($)</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
        <div>
          <label className="block text-sm text-charcoal/60 mb-1">Emoji</label>
          <input value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="✿" className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-charcoal/60 mb-1">Categoría</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Velas y Aromaterapia" className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label className="block text-sm text-charcoal/60 mb-1">URL de imagen</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label className="block text-sm text-charcoal/60 mb-1">Descripción</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <label className="flex items-center gap-2 text-sm text-charcoal/60">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-sage" />
        Destacado (aparece en la página principal)
      </label>
      <button type="submit" disabled={saving} className="px-6 py-3 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50">
        {saving ? "Guardando..." : product?.id ? "Actualizar producto" : "Crear producto"}
      </button>
    </form>
  );
}
