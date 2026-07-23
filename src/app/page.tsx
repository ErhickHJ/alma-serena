import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import { prisma } from "@/lib/db";
import HomeContent from "./HomeContent";

const FALLBACK_FEATURED = [
  { id: "fb-1", name: "El Diario de 90 Días", price: 29.00, image: "/images/diario 4.png", emoji: "📖" },
  { id: "fb-2", name: "Cuaderno de Gratitud", price: 12.00, image: "/images/cuaderno.png", emoji: "📓" },
  { id: "fb-3", name: "Set de Plumas", price: 8.00, image: "/images/pluma.png", emoji: "🖊️" },
  { id: "fb-4", name: "Vela - Cedro & Salvia", price: 20.00, image: "/images/vela cedro y salvia.png", emoji: "🕯️" },
  { id: "fb-5", name: "Funda de Cuero para el Diario", price: 34.00, image: "/images/funda diario.png", emoji: "👜" },
  { id: "fb-6", name: "Vela - Sándalo & Incienso", price: 20.00, image: "/images/vela sandalo e incienso.png", emoji: "🕯️" },
  { id: "fb-7", name: "Difusor de Aceites Esenciales", price: 32.00, image: "/images/Difusor se aceite.png", emoji: "💨" },
  { id: "fb-8", name: "Palo Santo", price: 10.00, image: "/images/palo.png", emoji: "🪵" },
  { id: "fb-9", name: "Cojín de Meditación", price: 39.00, image: "/images/cogin.png", emoji: "🧘" },
  { id: "fb-10", name: "Manta de Meditación", price: 45.00, image: "/images/manta.png", emoji: "🧣" },
  { id: "fb-11", name: "Cristal de Amatista", price: 22.00, image: "/images/Cristal.png", emoji: "💜" },
  { id: "fb-12", name: "Set de Piedras de Enfoque", price: 30.00, image: "/images/Piedras.png", emoji: "🪨" },
  { id: "fb-13", name: "Kit de Té Relajante", price: 15.00, image: "/images/kit te.png", emoji: "🍵" },
  { id: "fb-14", name: "Incienso Natural - Sándalo", price: 8.00, image: "/images/incienso.png", emoji: "🪔" },
];

export default async function Home() {
  let featured = FALLBACK_FEATURED;
  try {
    const dbFeatured = await prisma.product.findMany({ where: { featured: true }, orderBy: { name: "asc" } });
    if (dbFeatured.length > 0) featured = dbFeatured;
  } catch {}

  return (
    <>
      <HomeContent products={featured} />
      <NewsletterForm />
    </>
  );
}
