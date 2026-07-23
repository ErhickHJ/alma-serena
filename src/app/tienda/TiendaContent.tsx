"use client";

import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import AddToCartButton from "@/components/AddToCartButton";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

const CATEGORY_KEYS = ["Diarios y Papelería", "Velas y Aromas", "Mindfulness y Meditación", "Ritual y Bienestar"] as const;

type Product = { id: string; name: string; price: number; image?: string; emoji?: string; category?: string; desc?: string };

export default function TiendaContent({ products, q, cat, sort }: { products: Product[]; q: string; cat: string; sort: string }) {
  const { lang } = useLang();
  const t = translations[lang].tienda;
  const cats = t.categories;

  if (q) products = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || (p.desc && p.desc.toLowerCase().includes(q.toLowerCase())));
  if (cat) products = products.filter(p => p.category === cat);
  if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
  if (sort === "name") products = [...products].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-lavender/10 to-warm-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Tienda Alma Serena</div>
          <SectionTitle>{t.heroTitle}</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 leading-relaxed">{t.heroDesc}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <input type="text" name="q" defaultValue={q} placeholder={t.searchPlaceholder} className="w-full px-4 py-2.5 pl-10 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <select name="cat" defaultValue={cat} className="px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors">
            <option value="">{t.allCategories}</option>
            {CATEGORY_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <select name="sort" defaultValue={sort} className="px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors">
            <option value="">{t.sortBy}</option>
            <option value="price-asc">{t.priceAsc}</option>
            <option value="price-desc">{t.priceDesc}</option>
            <option value="name">{t.nameAZ}</option>
          </select>
          <button type="submit" className="px-6 py-2.5 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors">{t.searchBtn}</button>
          {(q || cat || sort) && <a href="/tienda" className="px-4 py-2.5 text-sm text-charcoal/50 hover:text-sage-dark transition-colors">{t.clear}</a>}
        </form>
      </div>

      {cat ? (
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl text-sage-dark mb-2 text-center">{cat}</h2>
            <p className="text-sm text-charcoal/50 text-center mb-8">{products.length} {products.length !== 1 ? t.productsPlural : t.products}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((item) => <ProductCard key={item.id} item={item} />)}
            </div>
            {products.length === 0 && <p className="text-center text-charcoal/40 text-sm">{t.noResults}</p>}
          </div>
        </section>
      ) : (
        CATEGORY_KEYS.map((key) => {
          const catProducts = products.filter((p) => p.category === key);
          if (catProducts.length === 0) return null;
          return (
            <section key={key} className="py-16 even:bg-cream/50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-serif text-2xl text-sage-dark mb-2">{key}</h2>
                  <p className="text-sm text-charcoal/50">{cats?.[key]?.desc || ""}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {catProducts.map((item) => <ProductCard key={item.id} item={item} />)}
                </div>
              </div>
            </section>
          );
        })
      )}

      <section className="py-20 bg-gradient-to-b from-sage/5 to-warm-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-4xl mb-4 text-sage/40">☽</div>
          <SectionTitle>{t.communityTitle}</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 leading-relaxed mb-8">{t.communityDesc}</p>
          <a href="/comunidad" className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm">{t.communityBtn}</a>
        </div>
      </section>
    </>
  );
}

function ProductCard({ item }: { item: Product }) {
  return (
    <div className="group p-5 rounded-xl bg-warm-white border border-sage/10 hover:border-sage/30 transition-all hover:shadow-sm flex flex-col">
      <a href={`/tienda/${encodeURIComponent(item.id)}`} className="block">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 bg-sage/5 shrink-0">
          <Image src={item.image || "/images/portada.jpg"} alt={item.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
        </div>
        <h3 className="font-serif text-lg text-sage-dark mb-1 shrink-0">{item.emoji || ""} {item.name}</h3>
        <p className="text-xs text-charcoal/50 mb-3 leading-relaxed flex-1">{item.desc}</p>
      </a>
      <div className="flex items-center justify-between shrink-0">
        <span className="text-sm text-gold font-medium">${item.price.toFixed(2)}</span>
      </div>
      <div className="mt-3 shrink-0">
        <AddToCartButton item={{ id: item.id, name: `${item.emoji || ""} ${item.name}`, price: item.price, emoji: item.emoji || "" }} />
      </div>
    </div>
  );
}
