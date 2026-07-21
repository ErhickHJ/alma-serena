import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { logAdminAction } from "@/lib/audit";

const posts = [
  {
    title: "El poder de la gratitud en tu vida diaria",
    slug: "poder-de-la-gratitud",
    excerpt: "Descubre cómo practicar la gratitud puede transformar tu perspectiva y traer más paz a tu día a día.",
    content: "La gratitud es una de las emociones más poderosas que podemos cultivar. Numerosos estudios han demostrado que las personas que practican la gratitud regularmente experimentan mayores niveles de felicidad, mejor salud física y relaciones más sólidas.\n\nLa gratitud nos ayuda a enfocarnos en lo que tenemos en lugar de en lo que nos falta. Este simple cambio de perspectiva puede tener un impacto profundo en nuestra salud mental y bienestar general.\n\n**Cómo practicar la gratitud**\n\n1. Lleva un diario de gratitud: Cada día, escribe tres cosas por las que estás agradecido.\n2. Expresa tu gratitud: No guardes tu agradecimiento para ti mismo. Dile a las personas que aprecias lo que hacen por ti.\n3. Encuentra gratitud en los desafíos: Incluso en las situaciones difíciles, hay lecciones que agradecer.\n\nLa gratitud no solo es una emoción, es una práctica. Como cualquier habilidad, se fortalece con el uso constante.",
    author: "Alma Serena",
    published: true,
    imageUrl: "/images/el porder de la gratitud.png",
  },
  {
    title: "5 rituales matutinos para empezar el día con calma",
    slug: "5-rituales-matutinos-calma",
    excerpt: "Pequeñas acciones que puedes incorporar cada mañana para cultivar serenidad y bienestar.",
    content: "La forma en que comenzamos nuestra mañana establece el tono para el resto del día. Incorporar pequeños rituales puede marcar una gran diferencia en cómo nos sentimos y enfrentamos los desafíos diarios.\n\n**1. Respiración consciente** — Antes de levantarte de la cama, toma cinco respiraciones profundas. Inhala contando hasta cuatro, sostén por cuatro, exhala por cuatro.\n\n**2. Agradecimiento matutino** — Antes de revisar tu teléfono, piensa en tres cosas por las que estás agradecido.\n\n**3. Movimiento suave** — Estira tu cuerpo con movimientos suaves. No necesita ser una rutina intensa; cinco minutos de estiramientos son suficientes.\n\n**4. Hidratación consciente** — Bebe un vaso de agua antes del café. Tu cuerpo ha estado horas sin hidratarse.\n\n**5. Intención del día** — Establece una intención para tu día. Puede ser tan simple como \"hoy elijo la calma\" o \"hoy seré amable conmigo mismo\".",
    author: "Alma Serena",
    published: true,
    imageUrl: "/images/5 rituales matutinos.png",
  },
  {
    title: "Cómo crear un espacio de paz en tu hogar",
    slug: "espacio-de-paz-en-casa",
    excerpt: "Consejos sencillos para transformar cualquier rincón de tu casa en un refugio de tranquilidad.",
    content: "Tu hogar debe ser tu santuario, un lugar donde puedas recargar energías y encontrar paz. No necesitas una habitación entera; incluso un pequeño rincón puede convertirse en tu espacio sagrado.\n\n**Elementos esenciales**\n\n- Un asiento cómodo: Un cojín, una silla o un puf donde puedas sentarte en silencio.\n- Iluminación suave: Velas, luces cálidas o la luz natural.\n- Elementos naturales: Plantas, piedras, conchas o madera.\n- Aromas: Incienso, aceites esenciales o flores frescas.\n- Objetos significativos: Fotos, cristales o cualquier objeto que te traiga paz.\n\n**Manténlo simple** — Un espacio de paz no necesita ser elaborado. De hecho, mientras más simple, mejor. El objetivo es crear un lugar que invite al descanso y la introspección.",
    author: "Alma Serena",
    published: true,
    imageUrl: "/images/espacio de paz.png",
  },
  {
    title: "La ciencia detrás de la meditación",
    slug: "ciencia-detras-meditacion",
    excerpt: "Qué dice la investigación sobre los beneficios de la meditación para tu mente y tu cuerpo.",
    content: "La meditación ha pasado de ser una práctica espiritual a ser objeto de rigurosos estudios científicos. Los resultados son impresionantes y respaldan lo que los practicantes han sabido por milenios.\n\n**Beneficios comprobados**\n\n- Reduce el estrés: La meditación disminuye los niveles de cortisol, la hormona del estrés.\n- Mejora la concentración: Aumenta la capacidad de atención y la memoria de trabajo.\n- Regula las emociones: Fortalece las áreas del cerebro asociadas con la regulación emocional.\n- Mejora el sueño: Ayuda a conciliar el sueño y mejora su calidad.\n\n**¿Cuánto tiempo necesitas?** — Estudios muestran que tan solo 10 minutos al día de meditación consciente pueden producir cambios positivos medibles en el cerebro.",
    author: "Alma Serena",
    published: true,
    imageUrl: "/images/ciencia tras la meditacion.png",
  },
  {
    title: "Aceptar lo que no podemos controlar",
    slug: "aceptar-lo-que-no-podemos-controlar",
    excerpt: "Una reflexión sobre el arte de soltar y encontrar paz en medio de la incertidumbre.",
    content: "Una de las mayores fuentes de sufrimiento humano es nuestra resistencia a aceptar la realidad tal como es. Queremos controlar el futuro, las acciones de los demás y las circunstancias de la vida, pero gran parte de esto está fuera de nuestro control.\n\n**El círculo de control** — El estoicismo nos enseñó a distinguir entre lo que podemos controlar y lo que no:\n\n- Enfócate en: tus pensamientos, tus acciones, tus reacciones\n- Deja ir: las opiniones de los demás, el pasado, el futuro incierto\n\nAceptar no significa resignarse. Significa reconocer la realidad para poder actuar desde la claridad en lugar de desde la resistencia.",
    author: "Alma Serena",
    published: true,
    imageUrl: "/images/aceptar lo que no podemos controlar.png",
  },
  {
    title: "Diario de gratitud: cómo empezar y mantener el hábito",
    slug: "diario-de-gratitud-como-empezar",
    excerpt: "Guía práctica para crear y mantener un diario de gratitud que transforme tu mirada.",
    content: "Llevar un diario de gratitud es una de las prácticas más transformadoras que puedes adoptar. Pero como cualquier hábito nuevo, puede ser difícil de mantener.\n\n**Cómo empezar**\n\n1. Elige un cuaderno especial — No necesita ser caro, pero que te guste.\n2. Establece un momento del día — La mañana o la noche son ideales.\n3. Empieza pequeño — Escribe solo tres cosas por las que estás agradecido.\n4. Sé específico — En lugar de \"mi familia\", prueba \"la sonrisa de mi hija esta mañana\".\n\n**Cómo mantener el hábito**\n\n- Vincúlalo a un hábito existente (después de cepillarte los dientes, antes de dormir)\n- No te castigues si olvidas un día\n- Varía tus entradas para mantenerlo fresco\n- Relee tus entradas anteriores para recordar momentos de gratitud\n\nEl diario de gratitud no se trata de ignorar lo difícil de la vida, sino de entrenar a tu mente para notar también lo bueno.",
    author: "Alma Serena",
    published: true,
    imageUrl: "/images/diario como empezar.png",
  },
];

export async function GET() {
  return POST();
}

export async function POST() {
  const session = await auth();
  if (!session.userId) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 403 });
  }

  try {
    let created = 0;
    let skipped = 0;
    for (const p of posts) {
      const existing = await prisma.post.findUnique({ where: { slug: p.slug } });
      if (!existing) {
        await prisma.post.create({ data: p });
        created++;
      } else {
        skipped++;
      }
    }
    await logAdminAction({ userId: session.userId, email: user.emailAddresses[0]?.emailAddress || "", action: "seed_posts", details: `${created} creados, ${skipped} omitidos` });
    return NextResponse.json({ success: true, created, skipped });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}
