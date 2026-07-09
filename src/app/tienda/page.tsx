// Página de tienda — Catálogo de productos desde la DB
// Migrada de productos hardcodeados a Prisma (model Product)

import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/lib/db";

// Categorías de productos (agrupación visual en la tienda)
const CATEGORIES = [
  { key: "Velas y Aromaterapia", desc: "Crea espacios de paz con aromas que calman el alma." },
  { key: "Diarios y Papelería", desc: "Herramientas para plasmar tus pensamientos y gratitud." },
  { key: "Cristales y Energía", desc: "Piedras que te acompañan en tu camino de serenidad." },
  { key: "Ritual y Bienestar", desc: "Todo lo necesario para tus momentos de autocuidado." },
];

export default async function ShopPage() {
  let products: { id: string; name: string; price: number; image: string; emoji: string; category: string; desc: string }[] = [];
  try {
    products = await prisma.product.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });
  } catch {
    // DB no disponible — tienda vacía
  }

  return (
    <>
      <ShopHero />
      {CATEGORIES.map((cat) => {
        const catProducts = products.filter((p) => p.category === cat.key);
        if (catProducts.length === 0) return null;
        return (
          <section key={cat.key} className="py-16 even:bg-cream/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl text-sage-dark mb-2">{cat.key}</h2>
                <p className="text-sm text-charcoal/50">{cat.desc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {catProducts.map((item) => (
                  <div key={item.id} className="group p-5 rounded-xl bg-warm-white border border-sage/10 hover:border-sage/30 transition-all hover:shadow-sm flex flex-col">
                    <div className="relative w-full h-36 rounded-lg overflow-hidden mb-4 bg-sage/5 shrink-0">
                      <Image src={item.image || "/images/placeholder.jpg"} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="font-serif text-lg text-sage-dark mb-1 shrink-0">{item.emoji} {item.name}</h3>
                    <p className="text-xs text-charcoal/50 mb-3 leading-relaxed flex-1">{item.desc}</p>
                    <div className="flex items-center justify-between shrink-0">
                      <span className="text-sm text-gold font-medium">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="mt-3 shrink-0">
                      <AddToCartButton item={{ id: item.id, name: `${item.emoji} ${item.name}`, price: item.price, emoji: item.emoji }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <section className="py-20 bg-gradient-to-b from-sage/5 to-warm-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-4xl mb-4 text-sage/40">☽</div>
          <SectionTitle>Únete a la comunidad Alma Serena</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 leading-relaxed mb-8">
            Lleva tu bienestar al siguiente nivel. Conéctate con otras personas
            que también eligen la calma, comparte tus experiencias y recibe
            contenido exclusivo.
          </p>
          <a href="/comunidad" className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm">Explorar la comunidad</a>
        </div>
      </section>
    </>
  );
}

function ShopHero() {
  return (
    <section className="py-16 bg-gradient-to-b from-lavender/10 to-warm-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Tienda Alma Serena</div>
        <SectionTitle>Objetos que inspiran calma</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed">
          Cada producto ha sido seleccionado para acompañarte en tu camino de bienestar
          y recordarte la importancia de la serenidad en tu vida diaria.
        </p>
      </div>
    </section>
  );
}
