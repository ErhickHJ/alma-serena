import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/lib/db";

const CATEGORIES = [
  { key: "artesanias", label: "Artesanías", desc: "Piezas únicas hechas a mano por artesanos locales." },
  { key: "alimentos", label: "Alimentos", desc: "Productos naturales y artesanales para nutrir cuerpo y alma." },
  { key: "bienestar", label: "Bienestar", desc: "Productos para tu cuidado personal y bienestar." },
  { key: "servicios", label: "Servicios", desc: "Servicios profesionales de nuestros partners." },
  { key: "otros", label: "Otros", desc: "Más productos de nuestros asociados." },
];

export default async function VentasDiversasPage() {
  let products: any[] = [];
  try {
    products = await prisma.partnerProduct.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });
  } catch {
    // DB offline
  }

  return (
    <>
      <VentasDiversasHero />
      {products.length === 0 ? (
        <section className="py-16 text-center">
          <p className="text-charcoal/40 text-sm">Próximamente encontrarás productos de nuestros partners aquí.</p>
        </section>
      ) : (
        CATEGORIES.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat.key);
          if (catProducts.length === 0) return null;
          return (
            <section key={cat.key} className="py-16 even:bg-cream/50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-serif text-2xl text-sage-dark mb-2">{cat.label}</h2>
                  <p className="text-sm text-charcoal/50">{cat.desc}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {catProducts.map((item) => (
                    <div key={item.id} className="group p-5 rounded-xl bg-warm-white border border-sage/10 hover:border-sage/30 transition-all hover:shadow-sm flex flex-col">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 bg-sage/5 shrink-0">
                        <Image src={item.image || "/images/portada.jpg"} alt={item.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h3 className="font-serif text-lg text-sage-dark mb-1 shrink-0">{item.name}</h3>
                      <p className="text-xs text-charcoal/50 mb-1 leading-relaxed">Por {item.partnerName}</p>
                      <p className="text-xs text-charcoal/50 mb-3 leading-relaxed flex-1">{item.description}</p>
                      <div className="flex items-center justify-between shrink-0">
                        <span className="text-sm text-gold font-medium">${(item.price / 100).toFixed(2)}</span>
                        {item.stock > 0 ? (
                          <span className="text-xs text-green-600">En stock</span>
                        ) : (
                          <span className="text-xs text-red-500">Agotado</span>
                        )}
                      </div>
                      <div className="mt-3 shrink-0">
                        <AddToCartButton item={{ id: item.id, name: item.name, price: item.price / 100, emoji: "", type: "partner", partnerName: item.partnerName, partnerContact: item.partnerContact, commission: item.commission / 100 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}
      <section className="py-20 bg-gradient-to-b from-sage/5 to-warm-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-4xl mb-4 text-sage/40">☽</div>
          <SectionTitle>¿Quieres vender con nosotros?</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 leading-relaxed mb-8">
            Si tienes un producto o servicio alineado con el bienestar y la serenidad,
            nos encantaría conocerte. Trabajemos juntos para llevar calm a más personas.
          </p>
          <a href="/partners" className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm">Ser partner</a>
        </div>
      </section>
    </>
  );
}

function VentasDiversasHero() {
  return (
    <section className="py-16 bg-gradient-to-b from-lavender/10 to-warm-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Ventas Diversas</div>
        <SectionTitle>Productos de nuestros partners</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed">
          Explora productos únicos de marcas y artesanos que comparten nuestra esencia.
          Cada compra apoya directamente a pequeños negocios comprometidos con el bienestar.
        </p>
      </div>
    </section>
  );
}
