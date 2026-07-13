import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

const IMG = "/images/portada.jpg";
const products = [
  { name: "El Diario de 90 Días", price: 29.00, image: IMG, emoji: "📖", category: "Diarios y Papelería", desc: "Tu guía diaria de gratitud y transformación personal.", featured: true },
  { name: "Cuaderno de Gratitud", price: 12.00, image: IMG, emoji: "📓", category: "Diarios y Papelería", desc: "Compañero compacto para tus notas diarias de agradecimiento.", featured: true },
  { name: "Set de Plumas", price: 8.00, image: IMG, emoji: "🖊️", category: "Diarios y Papelería", desc: "Tres plumas de tinta fluida para escribir con calma.", featured: false },
  { name: "Separadores Artesanales", price: 6.00, image: IMG, emoji: "🔖", category: "Diarios y Papelería", desc: "Set de 4 separadores con diseños inspirados en la naturaleza.", featured: false },
  { name: "Kit de Journaling", price: 28.00, image: IMG, emoji: "📦", category: "Diarios y Papelería", desc: "Cuaderno, plumas, washi tape y stickers para tu práctica.", featured: true },
  { name: "Funda de Cuero para el Diario", price: 34.00, image: IMG, emoji: "👜", category: "Diarios y Papelería", desc: "Protege tu diario con estilo — disponible en marrón y negro.", featured: false },
  { name: "Vela - Cedro & Salvia", price: 20.00, image: IMG, emoji: "🕯️", category: "Velas y Aromas", desc: "Aroma amaderado y herbal para espacios de claridad mental.", featured: false },
  { name: "Vela - Sándalo & Incienso", price: 20.00, image: IMG, emoji: "🕯️", category: "Velas y Aromas", desc: "Notas cálidas que invitan a la introspección.", featured: false },
  { name: "Difusor de Aceites Esenciales", price: 32.00, image: IMG, emoji: "💨", category: "Velas y Aromas", desc: "Difusor ultrasónico de cerámica artesanal.", featured: false },
  { name: "Palo Santo", price: 10.00, image: IMG, emoji: "🪵", category: "Velas y Aromas", desc: "Para limpiar la energía del espacio antes de meditar.", featured: false },
  { name: "Cojín de Meditación", price: 39.00, image: IMG, emoji: "🧘", category: "Mindfulness y Meditación", desc: "Soporte firme y cómodo para tu práctica diaria.", featured: false },
  { name: "Manta de Meditación", price: 45.00, image: IMG, emoji: "🧣", category: "Mindfulness y Meditación", desc: "Tejido suave en tonos neutros para acompañar tu quietud.", featured: false },
  { name: "Cristal de Amatista", price: 22.00, image: IMG, emoji: "💜", category: "Mindfulness y Meditación", desc: "Piedra de calma y claridad mental.", featured: false },
  { name: "Set de Piedras de Enfoque", price: 30.00, image: IMG, emoji: "🪨", category: "Mindfulness y Meditación", desc: "Selección de piedras para anclar la atención en el presente.", featured: false },
  { name: "Kit de Té Relajante", price: 15.00, image: IMG, emoji: "🍵", category: "Ritual y Bienestar", desc: "Mezcla de hierbas para pausas de calma durante el día.", featured: true },
  { name: "Incienso Natural - Sándalo", price: 8.00, image: IMG, emoji: "🪔", category: "Ritual y Bienestar", desc: "Varillas de incienso puro para rituales de atención plena.", featured: false },
];

const OLD_NAMES = ["Mist de Almohada", "Aceite Corporal", "Bálsamo de Templos", "Set de 7 Chakras", "Cuarzo Rosa", "Selenita", "Vela Aromática - Lavanda", "Difusor de Aceites"];

async function seed() {
  await prisma.product.deleteMany({ where: { name: { in: OLD_NAMES } } });
  let created = 0;
  for (const p of products) {
    const existing = await prisma.product.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.product.create({ data: p });
      created++;
    }
  }
  return created;
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  try {
    const created = await seed();
    return NextResponse.json({ success: true, created });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  try {
    const created = await seed();
    return NextResponse.json({ success: true, created });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}