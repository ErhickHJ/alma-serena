import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const IMAGE_MAP = {
  "5 rituales matutinos para empezar el día con calma": "/images/5 rituales matutinos.png",
  "Aceptar lo que no podemos controlar: el arte de soltar": "/images/aceptar lo que no podemos controlar.png",
  "La ciencia detrás de la meditación": "/images/ciencia tras la meditacion.png",
  "Cómo empezar un diario de gratitud (y no rendirte en el intento)": "/images/diario como empezar.png",
  "El poder de la gratitud": "/images/el porder de la gratitud.png",
  "Cómo crear un espacio de paz en tu hogar": "/images/espacio de paz.png",
  "Diario de gratitud vs. journaling tradicional": "/images/funda diario.png",
};

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const p = new PrismaClient({ adapter });

  const posts = await p.post.findMany({ select: { id: true, title: true, imageUrl: true } });
  console.log("Posts found:", posts.length);
  console.log(JSON.stringify(posts, null, 2));

  let updated = 0;
  for (const post of posts) {
    const lower = post.title.toLowerCase();
    let match = null;
    for (const [key, img] of Object.entries(IMAGE_MAP)) {
      if (lower.includes(key) || lower.includes(key.replace(/[¿?¡!:,]/g, "").trim())) {
        match = img;
        break;
      }
    }
    if (match && post.imageUrl !== match) {
      await p.post.update({ where: { id: post.id }, data: { imageUrl: match } });
      console.log(`✅ "${post.title}" → ${match}`);
      updated++;
    } else if (!match) {
      console.log(`❌ No match for: "${post.title}"`);
    } else {
      console.log(`⏭️ Already correct: "${post.title}"`);
    }
  }
  console.log(`\nUpdated ${updated} posts.`);
  await p.$disconnect();
}

main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
