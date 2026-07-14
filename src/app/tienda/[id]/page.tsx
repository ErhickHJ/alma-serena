import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import AddToCartButton from "@/components/AddToCartButton";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";

const FALLBACK_PRODUCTS = [
  { id: "fallback-1", name: "El Diario de 90 Días", price: 29.00, image: "/images/diario 4.png", emoji: "📖", category: "Diarios y Papelería", desc: "Tu guía diaria de gratitud y transformación personal." },
  { id: "fallback-2", name: "Cuaderno de Gratitud", price: 12.00, image: "/images/cuaderno.png", emoji: "📓", category: "Diarios y Papelería", desc: "Compañero compacto para tus notas diarias de agradecimiento." },
  { id: "fallback-3", name: "Set de Plumas", price: 8.00, image: "/images/pluma.png", emoji: "🖊️", category: "Diarios y Papelería", desc: "Tres plumas de tinta fluida para escribir con calma." },
  { id: "fallback-4", name: "Separadores Artesanales", price: 6.00, image: "/images/separadores.png", emoji: "🔖", category: "Diarios y Papelería", desc: "Set de 4 separadores con diseños inspirados en la naturaleza." },
  { id: "fallback-5", name: "Kit de Journaling", price: 28.00, image: "/images/kit.png", emoji: "📦", category: "Diarios y Papelería", desc: "Cuaderno, plumas, washi tape y stickers para tu práctica." },
  { id: "fallback-6", name: "Funda de Cuero para el Diario", price: 34.00, image: "/images/funda diario.png", emoji: "👜", category: "Diarios y Papelería", desc: "Protege tu diario con estilo — disponible en marrón y negro." },
  { id: "fallback-7", name: "Vela - Cedro & Salvia", price: 20.00, image: "/images/vela cedro y salvia.png", emoji: "🕯️", category: "Velas y Aromas", desc: "Aroma amaderado y herbal para espacios de claridad mental." },
  { id: "fallback-8", name: "Vela - Sándalo & Incienso", price: 20.00, image: "/images/vela sandalo e incienso.png", emoji: "🕯️", category: "Velas y Aromas", desc: "Notas cálidas que invitan a la introspección." },
  { id: "fallback-9", name: "Difusor de Aceites Esenciales", price: 32.00, image: "/images/Difusor se aceite.png", emoji: "💨", category: "Velas y Aromas", desc: "Difusor ultrasónico de cerámica artesanal." },
  { id: "fallback-10", name: "Palo Santo", price: 10.00, image: "/images/palo.png", emoji: "🪵", category: "Velas y Aromas", desc: "Para limpiar la energía del espacio antes de meditar." },
  { id: "fallback-11", name: "Cojín de Meditación", price: 39.00, image: "/images/cogin.png", emoji: "🧘", category: "Mindfulness y Meditación", desc: "Soporte firme y cómodo para tu práctica diaria." },
  { id: "fallback-12", name: "Manta de Meditación", price: 45.00, image: "/images/manta.png", emoji: "🧣", category: "Mindfulness y Meditación", desc: "Tejido suave en tonos neutros para acompañar tu quietud." },
  { id: "fallback-13", name: "Cristal de Amatista", price: 22.00, image: "/images/Cristal.png", emoji: "💜", category: "Mindfulness y Meditación", desc: "Piedra de calma y claridad mental." },
  { id: "fallback-14", name: "Set de Piedras de Enfoque", price: 30.00, image: "/images/Piedras.png", emoji: "🪨", category: "Mindfulness y Meditación", desc: "Selección de piedras para anclar la atención en el presente." },
  { id: "fallback-15", name: "Kit de Té Relajante", price: 15.00, image: "/images/kit te.png", emoji: "🍵", category: "Ritual y Bienestar", desc: "Mezcla de hierbas para pausas de calma durante el día." },
  { id: "fallback-16", name: "Incienso Natural - Sándalo", price: 8.00, image: "/images/incienso.png", emoji: "🪔", category: "Ritual y Bienestar", desc: "Varillas de incienso puro para rituales de atención plena." },
];

function findProduct(id: string, dbProducts: typeof FALLBACK_PRODUCTS) {
  return dbProducts.find((p) => p.id === id) || FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let dbProducts: typeof FALLBACK_PRODUCTS = [];
  try {
    const fromDb = await prisma.product.findMany({ orderBy: { name: "asc" } });
    if (fromDb.length > 0) {
      dbProducts = fromDb.map((p) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        image: p.image || "/images/portada.jpg",
        emoji: p.emoji || "📦",
        category: p.category || "General",
        desc: p.desc || "",
      }));
    }
  } catch {}

  const product = findProduct(id, dbProducts);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream/30 to-warm-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <a href="/tienda" className="text-sm text-sage-dark hover:text-sage transition-colors mb-6 inline-block">&larr; Volver a la tienda</a>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-sage/5 border border-sage/10">
            <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-4xl mb-2">{product.emoji}</div>
            <SectionTitle>{product.name}</SectionTitle>
            <DecorativeDivider className="my-4 justify-start" />
            <p className="text-sage-dark font-medium text-sm mb-2">{product.category}</p>
            <p className="text-charcoal/60 leading-relaxed mb-6">{product.desc}</p>
            <p className="text-3xl text-gold font-medium mb-8">${product.price.toFixed(2)}</p>
            <AddToCartButton item={{ id: product.id, name: `${product.emoji} ${product.name}`, price: product.price, emoji: product.emoji }} />
          </div>
        </div>
      </div>
    </div>
  );
}