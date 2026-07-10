import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import DecorativeDivider from "@/components/DecorativeDivider";

const FALLBACK: Record<string, { title: string; content: string; date: Date }> = {
  "poder-de-la-gratitud": {
    title: "El poder de la gratitud en tu vida diaria",
    date: new Date("2026-01-15"),
    content: `La gratitud es una de las herramientas más poderosas que tenemos para transformar nuestra experiencia de vida. No se trata solo de decir "gracias", sino de cultivar una mirada que reconoce el valor de lo que ya tenemos.

¿Por qué funciona la gratitud?

Cuando practicamos la gratitud de manera consciente, entrenamos a nuestro cerebro para enfocarse en lo positivo. Estudios en neurociencia han demostrado que llevar un diario de gratitud durante 21 días puede reconfigurar patrones neuronales, aumentando nuestros niveles de serotonina y dopamina.

Cómo empezar

1. Cada mañana, escribe tres cosas por las que estás agradecido
2. No necesitan ser grandes cosas — un café caliente, el sol entrando por la ventana, la sonrisa de un ser querido
3. Si un día es difícil, busca algo pequeño: respirar, estar vivo, tener un techo

El viaje de la gratitud no es ignorar el dolor o la dificultad. Es recordarnos que, incluso en medio de la tormenta, hay destellos de luz que merecen ser vistos.

Comienza hoy. Toma un cuaderno, respira hondo y escribe. Tu corazón lo agradecerá.`,
  },
  "5-rituales-matutinos-calma": {
    title: "5 rituales matutinos para empezar el día con calma",
    date: new Date("2026-02-01"),
    content: `La manera en que comenzamos el día marca el tono de todo lo que sigue. Aquí tienes cinco rituales simples para cultivar serenidad desde el amanecer.

1. Respirar antes de levantarte
Antes de saltar de la cama, quédate un minuto. Inhala profundamente contando hasta cuatro, retén cuatro, exhala cuatro. Repite tres veces.

2. Un vaso de agua con gratitud
Mientras bebes tu primer vaso de agua, piensa en algo que agradeces. El agua misma, el nuevo día, la oportunidad de empezar de nuevo.

3. Escribir una intención
Antes de revisar el teléfono, escribe en tu diario: "Hoy quiero sentir..." y completa la frase con una emoción: paz, conexión, alegría.

4. Movimiento suave
No necesitas una hora de yoga. Cinco minutos de estiramientos suaves mientras pones música tranquila son suficientes para despertar el cuerpo con amor.

5. Desayuno consciente
Come sin prisa. Observa los colores, texturas y sabores. Deja el teléfono en otra habitación.

Pequeños cambios, cuando se repiten cada día, crean una vida más serena.`,
  },
  "espacio-de-paz-en-casa": {
    title: "Cómo crear un espacio de paz en tu hogar",
    date: new Date("2026-02-20"),
    content: `Nuestro entorno físico afecta directamente nuestro estado mental. Crear un rincón de paz en casa no requiere una reforma ni mucho dinero.

Elige un lugar
Puede ser una esquina de tu sala, un asiento junto a la ventana o incluso un pequeño balcón. Lo importante es que sea un espacio que puedas asociar con calma.

Elementos clave
- Una superficie cómoda para sentarte (cojín, sillón o tapete)
- Iluminación suave (velas, luz cálida o una lámpara de sal)
- Un elemento natural (planta, piedras, conchas o una pequeña fuente)
- Algo que inspire (un libro, una vela aromática, una imagen que te traiga paz)

Mantén el orden
Un espacio despejado invita a una mente despejada. Dedica cinco minutos cada noche a dejar ese rincón ordenado para la mañana siguiente.

Hazlo sagrado
Asocia este espacio con un momento de Quietud. Siéntate ahí aunque sea tres minutos al día. Con el tiempo, tu mente aprenderá a aquietarse apenas entrar en ese lugar.

Tu hogar es tu santuario. Cada rincón puede recordarte que mereces paz.`,
  },
  "ciencia-detras-meditacion": {
    title: "La ciencia detrás de la meditación",
    date: new Date("2026-03-10"),
    content: `Durante siglos, la meditación fue considerada una práctica espiritual. Hoy, la ciencia confirma lo que los sabios antiguos ya sabían: meditar transforma el cerebro.

Qué pasa en tu cerebro cuando meditas

La neuroplasticidad permite que nuestro cerebro cambie con la experiencia. La meditación regular fortalece la corteza prefrontal (responsable de la atención y la toma de decisiones) y reduce el tamaño de la amígdala (centro del miedo y la ansiedad).

Beneficios respaldados por estudios

- Reduce los niveles de cortisol (la hormona del estrés)
- Mejora la concentración y la memoria
- Disminuye la presión arterial
- Fortalece el sistema inmunológico
- Aumenta la sensación de bienestar general

No necesitas ser un monje

Cinco minutos al día son suficientes para empezar a notar cambios. La clave no es la duración, sino la consistencia.

Si nunca has meditado, prueba esto: siéntate cómodamente, cierra los ojos y presta atención a tu respiración. Cuando tu mente se distraiga (y lo hará), simplemente regresa a la respiración. Sin juicio. Sin frustración.

Eso es todo. Bienvenido a la práctica.`,
  },
  "aceptar-lo-que-no-podemos-controlar": {
    title: "Aceptar lo que no podemos controlar",
    date: new Date("2026-03-28"),
    content: `Una de las mayores fuentes de sufrimiento humano es la lucha contra lo que no podemos cambiar. Aceptar no es rendirse. Es elegir dónde poner nuestra energía.

El círculo de control

Todo lo que enfrentamos puede clasificarse en tres categorías:
- Lo que controlamos: nuestros pensamientos, acciones y actitudes
- Lo que influimos: nuestras relaciones, nuestro entorno cercano
- Lo que no controlamos: el clima, las decisiones de otros, el pasado

La paz viene de enfocar nuestra energía en lo primero, sin agotarnos en lo tercero.

El arte de soltar

Soltar no significa no importarnos. Significa reconocer que aferrarnos al resultado solo nos causa dolor. Es abrir las manos para recibir lo que la vida trae, confiando en que tenemos la fortaleza para enfrentarlo.

Práctica para hoy

Identifica una situación que te preocupa. Pregúntate: ¿esto está en mi control? Si la respuesta es no, respira hondo y repite: "Confío en que puedo manejar lo que venga. Suelto lo que no depende de mí."

La serenidad no es la ausencia de problemas, sino la capacidad de estar en paz con lo que es.`,
  },
  "diario-de-gratitud-como-empezar": {
    title: "Diario de gratitud: cómo empezar y mantener el hábito",
    date: new Date("2026-04-15"),
    content: `Llevar un diario de gratitud es una de las prácticas más transformadoras que puedes adoptar. Aquí te guío paso a paso para que se convierta en un hábito sostenible.

Elige tu cuaderno

No necesita ser caro. Un cuaderno simple que te invite a escribir es suficiente. Si prefieres lo digital, una aplicación de notas también funciona.

El momento ideal

Asocia la escritura con un hábito existente: después de cepillarte los dientes, con tu café matutino o justo antes de dormir. La consistencia es más importante que el momento del día.

Qué escribir

Tres cosas concretas cada día. Evita generalidades. En lugar de "estoy agradecido por mi familia", prueba: "Hoy agradezco la llamada inesperada de mi hermana que me hizo reír."

Cuando sea difícil

Habrá días donde no encuentres nada que agradecer. En esos días, escribe lo más básico: "Respirar. Estar vivo. Este momento pasará." La práctica en los días difíciles es donde ocurre la verdadera transformación.

Relee tu diario

Una vez al mes, lee las últimas páginas. Verás patrones, recordarás momentos que habías olvidado y notarás cómo tu mirada se ha ido transformando sin que te dieras cuenta.

Empieza hoy. No esperes al lunes. No esperes al momento perfecto. Tres líneas. Ahora.`,
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: { title: string; content: string; createdAt: Date; author?: string } | null = null;
  let relatedPosts: { title: string; slug: string; excerpt: string }[] = [];

  try {
    const dbPost = await prisma.post.findUnique({ where: { slug } });
    if (dbPost?.published) {
      post = dbPost;
      const related = await prisma.post.findMany({ where: { published: true, id: { not: dbPost.id } }, take: 3, orderBy: { createdAt: "desc" } });
      relatedPosts = related.map(r => ({ title: r.title, slug: r.slug, excerpt: r.excerpt }));
    }
  } catch {
    // offline mode
  }

  if (!post) {
    const fallback = FALLBACK[slug];
    if (!fallback) notFound();
    post = { ...fallback, author: "Alma Serena" };
    relatedPosts = Object.entries(FALLBACK)
      .filter(([s]) => s !== slug)
      .slice(0, 3)
      .map(([s, p]) => ({ title: p.title, slug: s, excerpt: p.content.split("\n\n")[0].slice(0, 120) }));
  }

  return (
    <article className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm text-sage hover:text-sage-dark transition-colors mb-6 inline-block">← Volver al blog</Link>
        <p className="text-xs text-sage/60 mb-3">{new Date(post.createdAt).toLocaleDateString("es")} · {post.author || "Alma Serena"}</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-6">{post.title}</h1>
        <DecorativeDivider className="mb-8" />
        <div className="prose prose-sm max-w-none text-charcoal/70 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {relatedPosts.length > 0 && (
          <>
            <DecorativeDivider className="my-12" />
            <div>
              <h2 className="font-serif text-xl text-sage-dark mb-6 text-center">Artículos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="block p-4 bg-warm-white rounded-xl border border-sage/10 hover:shadow-sm transition-shadow">
                    <h3 className="font-serif text-sm text-sage-dark mb-1">{r.title}</h3>
                    <p className="text-xs text-charcoal/40 line-clamp-2">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
