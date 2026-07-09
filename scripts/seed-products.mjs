// Seed script — Puebla la tabla Product con 16 productos iniciales
// Ejecutar: npm run db:seed (o node scripts/seed-products.mjs)
// Solo crea productos que no existan (por nombre)

import { PrismaClient } from "../src/generated/prisma/client/index.js";

const prisma = new PrismaClient();

const products = [
  { name: "Vela Aromática - Lavanda", price: 18.00, image: "/images/placeholder.jpg", emoji: "🕯️", category: "Velas y Aromaterapia", desc: "Aroma calmante para tus momentos de meditación.", featured: true },
  { name: "Vela Aromática - Sándalo", price: 18.00, image: "/images/placeholder.jpg", emoji: "🕯️", category: "Velas y Aromaterapia", desc: "Notas amaderadas que invitan a la paz interior.", featured: false },
  { name: "Mist de Almohada", price: 14.00, image: "/images/placeholder.jpg", emoji: "🌙", category: "Velas y Aromaterapia", desc: "Rocío suave con esencia de manzanilla y lavanda.", featured: false },
  { name: "Difusor de Aceites", price: 32.00, image: "/images/placeholder.jpg", emoji: "💨", category: "Velas y Aromaterapia", desc: "Difusor ultrasónico de cerámica artesanal.", featured: false },
  { name: "Cuaderno de Gratitud", price: 12.00, image: "/images/placeholder.jpg", emoji: "📓", category: "Diarios y Papelería", desc: "Pequeño compañero para tus notas de agradecimiento.", featured: true },
  { name: "Set de Plumas", price: 8.00, image: "/images/placeholder.jpg", emoji: "🖊️", category: "Diarios y Papelería", desc: "Tres plumas de tinta suave para escribir con calma.", featured: false },
  { name: "Separadores Artesanales", price: 6.00, image: "/images/placeholder.jpg", emoji: "🔖", category: "Diarios y Papelería", desc: "Set de 4 separadores con diseños de la naturaleza.", featured: false },
  { name: "Kit de Journaling", price: 28.00, image: "/images/placeholder.jpg", emoji: "📦", category: "Diarios y Papelería", desc: "Cuaderno, plumas, washi tape y stickers.", featured: false },
  { name: "Cristal de Amatista", price: 22.00, image: "/images/placeholder.jpg", emoji: "💜", category: "Cristales y Energía", desc: "Piedra de calma y equilibrio espiritual.", featured: true },
  { name: "Cuarzo Rosa", price: 18.00, image: "/images/placeholder.jpg", emoji: "🩷", category: "Cristales y Energía", desc: "Para abrir el corazón al amor propio.", featured: false },
  { name: "Selenita", price: 16.00, image: "/images/placeholder.jpg", emoji: "🤍", category: "Cristales y Energía", desc: "Limpia y purifica la energía del espacio.", featured: false },
  { name: "Set de 7 Chakras", price: 35.00, image: "/images/placeholder.jpg", emoji: "🌈", category: "Cristales y Energía", desc: "Piedras para alinear y equilibrar tu energía.", featured: false },
  { name: "Kit de Té Relajante", price: 15.00, image: "/images/placeholder.jpg", emoji: "🍵", category: "Ritual y Bienestar", desc: "Mezcla de hierbas para momentos de calma.", featured: true },
  { name: "Aceite Corporal", price: 24.00, image: "/images/placeholder.jpg", emoji: "🧴", category: "Ritual y Bienestar", desc: "Hidratante con esencia de ylang-ylang.", featured: false },
  { name: "Manta de Meditación", price: 45.00, image: "/images/placeholder.jpg", emoji: "🧘", category: "Ritual y Bienestar", desc: "Suave y ligera, ideal para tu práctica diaria.", featured: false },
  { name: "Bálsamo de Templos", price: 12.00, image: "/images/placeholder.jpg", emoji: "🌿", category: "Ritual y Bienestar", desc: "Alivia la tensión con aceites esenciales puros.", featured: false },
];

async function main() {
  console.log("Seeding products...");
  let count = 0;
  for (const p of products) {
    const existing = await prisma.product.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.product.create({ data: p });
      count++;
    }
  }
  console.log(`Created ${count} new products.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
