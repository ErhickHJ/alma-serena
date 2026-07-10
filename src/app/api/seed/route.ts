import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

const IMG = "/images/portada.jpg";
const products = [
  { name: "Vela Aromática - Lavanda", price: 18.00, image: IMG, emoji: "🕯️", category: "Velas y Aromaterapia", desc: "Aroma calmante para tus momentos de meditación.", featured: true },
  { name: "Vela Aromática - Sándalo", price: 18.00, image: IMG, emoji: "🕯️", category: "Velas y Aromaterapia", desc: "Notas amaderadas que invitan a la paz interior.", featured: false },
  { name: "Mist de Almohada", price: 14.00, image: IMG, emoji: "🌙", category: "Velas y Aromaterapia", desc: "Rocío suave con esencia de manzanilla y lavanda.", featured: false },
  { name: "Difusor de Aceites", price: 32.00, image: IMG, emoji: "💨", category: "Velas y Aromaterapia", desc: "Difusor ultrasónico de cerámica artesanal.", featured: false },
  { name: "Cuaderno de Gratitud", price: 12.00, image: IMG, emoji: "📓", category: "Diarios y Papelería", desc: "Pequeño compañero para tus notas de agradecimiento.", featured: true },
  { name: "Set de Plumas", price: 8.00, image: IMG, emoji: "🖊️", category: "Diarios y Papelería", desc: "Tres plumas de tinta suave para escribir con calma.", featured: false },
  { name: "Separadores Artesanales", price: 6.00, image: IMG, emoji: "🔖", category: "Diarios y Papelería", desc: "Set de 4 separadores con diseños de la naturaleza.", featured: false },
  { name: "Kit de Journaling", price: 28.00, image: IMG, emoji: "📦", category: "Diarios y Papelería", desc: "Cuaderno, plumas, washi tape y stickers.", featured: false },
  { name: "Cristal de Amatista", price: 22.00, image: IMG, emoji: "💜", category: "Cristales y Energía", desc: "Piedra de calma y equilibrio espiritual.", featured: true },
  { name: "Cuarzo Rosa", price: 18.00, image: IMG, emoji: "🩷", category: "Cristales y Energía", desc: "Para abrir el corazón al amor propio.", featured: false },
  { name: "Selenita", price: 16.00, image: IMG, emoji: "🤍", category: "Cristales y Energía", desc: "Limpia y purifica la energía del espacio.", featured: false },
  { name: "Set de 7 Chakras", price: 35.00, image: IMG, emoji: "🌈", category: "Cristales y Energía", desc: "Piedras para alinear y equilibrar tu energía.", featured: false },
  { name: "Kit de Té Relajante", price: 15.00, image: IMG, emoji: "🍵", category: "Ritual y Bienestar", desc: "Mezcla de hierbas para momentos de calma.", featured: true },
  { name: "Aceite Corporal", price: 24.00, image: IMG, emoji: "🧴", category: "Ritual y Bienestar", desc: "Hidratante con esencia de ylang-ylang.", featured: false },
  { name: "Manta de Meditación", price: 45.00, image: IMG, emoji: "🧘", category: "Ritual y Bienestar", desc: "Suave y ligera, ideal para tu práctica diaria.", featured: false },
  { name: "Bálsamo de Templos", price: 12.00, image: IMG, emoji: "🌿", category: "Ritual y Bienestar", desc: "Alivia la tensión con aceites esenciales puros.", featured: false },
];

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    let created = 0;
    for (const p of products) {
      const existing = await prisma.product.findFirst({ where: { name: p.name } });
      if (!existing) {
        await prisma.product.create({ data: p });
        created++;
      }
    }
    return NextResponse.json({ success: true, created });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}