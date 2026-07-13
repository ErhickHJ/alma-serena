import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/lib/db";

const CATEGORIES = [
  { key: "Diarios y Papelería", desc: "Herramientas para plasmar tus pensamientos y cultivar la gratitud." },
  { key: "Velas y Aromas", desc: "Aromas que inspiran calma, claridad y enfoque." },
  { key: "Mindfulness y Meditación", desc: "Objetos que acompañan tu práctica de presencia y serenidad." },
  { key: "Ritual y Bienestar", desc: "Pequeños rituales para nutrir cuerpo y mente." },
];

const FALLBACK_PRODUCTS = [
  { id: "fallback-1", name: "El Diario de 90 Días", price: 29.00, image: "/images/diario 4.png", emoji: "📖", category: "Diarios y Papelería", desc: "Tu guía diaria de gratitud y transformación personal." },
  { id: "fallback-2", name: "Cuaderno de Gratitud", price: 12.00, image: "/images/portada.jpg", emoji: "📓", category: "Diarios y Papelería", desc: "Compañero compacto para tus notas diarias de agradecimiento." },
  { id: "fallback-3", name: "Set de Plumas", price: 8.00, image: "/images/pluma.png", emoji: "🖊️", category: "Diarios y Papelería", desc: "Tres plumas de tinta fluida para escribir con calma." },
  { id: "fallback-4", name: "Separadores Artesanales", price: 6.00, image: "/images/separadores.png", emoji: "🔖", category: "Diarios y Papelería", desc: "Set de 4 separadores con diseños inspirados en la naturaleza." },
  { id: "fallback-5", name: "Kit de Journaling", price: 28.00, image: "/images/kit.png", emoji: "📦", category: "Diarios y Papelería", desc: "Cuaderno, plumas, washi tape y stickers para tu práctica." },
  { id: "fallback-6", name: "Funda de Cuero para el Diario", price: 34.00, image: "/images/funda diario.png", emoji: "👜", category: "Diarios y Papelería", desc: "Protege tu diario con estilo — disponible en marrón y negro." },
  { id: "fallback-7", name: "Vela - Cedro & Salvia", price: 20.00, image: "/images/vela cedro y salvia.png", emoji: "🕯️", category: "Velas y Aromas", desc: "Aroma amaderado y herbal para espacios de claridad mental." },
  { id: "fallback-8", name: "Vela - Sándalo & Incienso", price: 20.00, image: "/images/portada.jpg", emoji: "🕯️", category: "Velas y Aromas", desc: "Notas cálidas que invitan a la introspección." },
  { id: "fallback-9", name: "Difusor de Aceites Esenciales", price: 32.00, image: "/images/portada.jpg", emoji: "💨", category: "Velas y Aromas", desc: "Difusor ultrasónico de cerámica artesanal." },
  { id: "fallback-10", name: "Palo Santo", price: 10.00, image: "/images/portada.jpg", emoji: "🪵", category: "Velas y Aromas", desc: "Para limpiar la energía del espacio antes de meditar." },
  { id: "fallback-11", name: "Cojín de Meditación", price: 39.00, image: "/images/portada.jpg", emoji: "🧘", category: "Mindfulness y Meditación", desc: "Soporte firme y cómodo para tu práctica diaria." },
  { id: "fallback-12", name: "Manta de Meditación", price: 45.00, image: "/images/portada.jpg", emoji: "🧣", category: "Mindfulness y Meditación", desc: "Tejido suave en tonos neutros para acompañar tu quietud." },
  { id: "fallback-13", name: "Cristal de Amatista", price: 22.00, image: "/images/portada.jpg", emoji: "💜", category: "Mindfulness y Meditación", desc: "Piedra de calma y claridad mental." },
  { id: "fallback-14", name: "Set de Piedras de Enfoque", price: 30.00, image: "/images/portada.jpg", emoji: "🪨", category: "Mindfulness y Meditación", desc: "Selección de piedras para anclar la atención en el presente." },
  { id: "fallback-15", name: "Kit de Té Relajante", price: 15.00, image: "/images/portada.jpg", emoji: "🍵", category: "Ritual y Bienestar", desc: "Mezcla de hierbas para pausas de calma durante el día." },
  { id: "fallback-16", name: "Incienso Natural - Sándalo", price: 8.00, image: "/images/portada.jpg", emoji: "🪔", category: "Ritual y Bienestar", desc: "Varillas de incienso puro para rituales de atención plena." },
];

export default async function ShopPage() {
  let products = FALLBACK_PRODUCTS;
  try {
    const dbProducts = await prisma.product.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });
    if (dbProducts.length > 0) products = dbProducts;
  } catch {
    // DB offline — usando fallback local
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
                      <Image src={item.image || "/images/portada.jpg"} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
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
