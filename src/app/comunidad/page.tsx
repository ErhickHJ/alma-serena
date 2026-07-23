import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { site } from "@/lib/site";
import { prisma } from "@/lib/db";
import { ForumForm } from "./ForumForm";
import { LeadersSection } from "./LeadersSection";
import { AdminDeleteButton } from "@/components/AdminDeleteButton";

const FALLBACK_POSTS = [
  { id: "1", author: "Camila R.", text: "Hoy cumplí 30 días con Alma Serena y siento que mi relación conmigo misma ha cambiado profundamente. La gratitud ya no es un ejercicio, es una forma de ver la vida.", tag: "30 días", createdAt: new Date("2026-03-15") },
  { id: "2", author: "Sofía M.", text: "El reto de desconectarme 30 minutos del mundo digital fue transformador. Descubrí que el silencio no es vacío, es espacio para escucharme.", tag: "Reto semanal", createdAt: new Date("2026-03-28") },
  { id: "3", author: "Valentina P.", text: "Escribir una carta a mi yo futuro fue el ejercicio más liberador que he hecho. Me prometí seguir eligiéndome, todos los días.", tag: "Reflexión", createdAt: new Date("2026-04-05") },
  { id: "4", author: "Isabel G.", text: "Cada noche escribo tres cosas bonitas de mi día. Es curioso cómo empiezas a buscar activamente lo bueno. Mi mente ya no se enfoca en lo que falta, sino en lo que abunda.", tag: "Diario de gratitud", createdAt: new Date("2026-04-12") },
  { id: "5", author: "Mariana L.", text: "Hoy medité 10 minutos sin distracciones. Al principio sentí inquietud, pero luego llegó una paz profunda. Mi mente está aprendiendo a descansar.", tag: "Meditación", createdAt: new Date("2026-04-18") },
];

async function getForumPosts() {
  try {
    const dbPosts = await prisma.forumPost.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    if (dbPosts && (dbPosts as any[]).length > 0) return dbPosts as any[];
  } catch { /* offline */ }
  return null;
}

export default async function CommunityPage() {
  const dbPosts = await getForumPosts();
  const posts = dbPosts || FALLBACK_POSTS;
  const offline = !dbPosts;

  return (
    <>
      <CommunityHero />
      <CommunityFeatures />
      <MonthlyChallenges />
      <ForumSection posts={posts} offline={offline} />
      <LeadersSection />
      <CommunityCTA />
    </>
  );
}

// ============ HERO COMUNIDAD ============
function CommunityHero() {
  return (
    <section className="py-20 bg-gradient-to-b from-sage/5 to-warm-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Comunidad</div>
        <h1 className="font-serif text-4xl sm:text-5xl text-sage-dark leading-tight mb-4">
          Juntos en este camino
        </h1>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed">
          Alma Serena es más que un diario: es una comunidad de almas que eligen
          vivir con más conciencia, gratitud y serenidad. Aquí compartimos, crecemos
          y nos recordamos que no estamos solos.
        </p>
      </div>
    </section>
  );
}

// ============ RETOS MENSUALES ============
function MonthlyChallenges() {
  const challenges = [
    { icon: "🌅", title: "Reto del amanecer", desc: "Despierta 15 minutos antes y dedica ese tiempo a la gratitud o la meditación.", duration: "7 días", tag: "Mindfulness" },
    { icon: "📝", title: "Diario de 3 cosas", desc: "Escribe cada noche 3 cosas por las que estés agradecida/o. Nota cómo cambia tu perspectiva.", duration: "21 días", tag: "Gratitud" },
    { icon: "🧘", title: "Pausa consciente", desc: "Tómate 5 minutos al mediodía para respirar profundamente y volver al centro.", duration: "30 días", tag: "Meditación" },
  ];

  return (
    <section className="py-20 bg-sage/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionTitle>Retos del mes</SectionTitle>
          <p className="text-xs text-charcoal/50 mt-2">Elige un reto, comparte tu progreso y crece junto a la comunidad</p>
          <DecorativeDivider className="my-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((c) => (
            <div key={c.title} className="p-6 rounded-xl bg-warm-white border border-sage/10 hover:border-sage/30 transition-all flex flex-col">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <span className="text-3xl">{c.icon}</span>
                <span className="text-[10px] uppercase tracking-wider text-sage bg-sage/10 px-2 py-1 rounded-full">{c.tag}</span>
              </div>
              <h3 className="font-serif text-lg text-sage-dark mb-2 shrink-0">{c.title}</h3>
              <p className="text-xs text-charcoal/50 leading-relaxed flex-1">{c.desc}</p>
              <div className="flex items-center justify-between mt-4 shrink-0">
                <span className="text-[10px] text-gold font-medium">{c.duration}</span>
                <span className="text-[10px] text-sage/50">Tag: #AlmaSerena</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CARACTERÍSTICAS COMUNIDAD ============
function CommunityFeatures() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "☽",
              title: "Foro de Conexión",
              desc: "Un espacio seguro para compartir tus experiencias, reflexiones y aprendizajes con otras personas que están en su propio viaje de transformación.",
            },
            {
              icon: "✦",
              title: "Retos Mensuales",
              desc: "Cada mes proponemos un reto colectivo de bienestar. Participa, comparte tu progreso y celebra los logros de la comunidad.",
            },
            {
              icon: "✿",
              title: "Contenido Exclusivo",
              desc: "Meditaciones guiadas, afirmaciones semanales, consejos de autocuidado y recursos gratuitos solo para miembros.",
            },
          ].map((f) => (
            <div key={f.title} className="p-8 rounded-xl bg-cream/40 border border-sage/10 text-center hover:border-sage/30 transition-colors flex flex-col">
              <div className="text-4xl mb-4 shrink-0">{f.icon}</div>
              <h3 className="font-serif text-xl text-sage-dark mb-3 shrink-0">{f.title}</h3>
              <p className="text-sm text-charcoal/50 leading-relaxed flex-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FORO COMUNIDAD ============
function ForumSection({ posts, offline }: { posts: any[]; offline: boolean }) {
  return (
    <section className="py-20 bg-cream/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionTitle>Voces de la comunidad</SectionTitle>
          <DecorativeDivider className="my-6" />
        </div>

        {offline && (
          <p className="text-center text-xs text-sage/50 italic mb-8">✿ Mensajes de muestra — inicia sesión para compartir tu voz</p>
        )}

        <div className="space-y-6 mb-10">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-xl bg-warm-white border border-sage/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage-dark font-medium text-sm">
                  {post.author?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <div className="font-medium text-sm text-charcoal">{post.author}</div>
                  <div className="text-xs text-gold">{post.tag || "Comunidad"}</div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-charcoal/30">{new Date(post.createdAt).toLocaleDateString("es")}</span>
                  {!offline && <ReportButton postId={post.id} />}
                  {!offline && <AdminDeleteButton postId={post.id} />}
                </div>
              </div>
              <p className="text-charcoal/60 text-sm leading-relaxed">&ldquo;{post.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <ForumForm />
      </div>
    </section>
  );
}

function ReportButton({ postId }: { postId: string }) {
  return (
    <button
      onClick={async () => {
        await fetch("/api/forum/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId }) });
        alert("Gracias por tu reporte. Lo revisaremos a la brevedad.");
      }}
      className="text-xs text-charcoal/20 hover:text-red-400 transition-colors"
      title="Reportar este mensaje"
    >
      ⚑
    </button>
  );
}

// ============ CTA COMUNIDAD ============
function CommunityCTA() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-4xl mb-4 text-sage/40">☽</div>
        <SectionTitle>¿Tienes Alma Serena?</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          Comparte tu experiencia usando el hashtag <strong className="text-sage-dark">#AlmaSerena</strong> en tus redes sociales.
          Tu historia puede inspirar a alguien más a comenzar su propio viaje.
        </p>
        <div className="flex items-center justify-center gap-3 text-sm text-charcoal/50">
          <span>Síguenos en:</span>
          {Object.values(site.social).filter(s => s.url && s.label !== "WhatsApp").map(s => (
            <a key={s.label} href={s.url!} target="_blank" rel="noopener noreferrer" className="text-sage-dark hover:text-sage transition-colors font-medium">
              {s.label}
            </a>
          ))}
          {Object.values(site.social).filter(s => !s.url).map(s => (
            <span key={s.label} className="text-charcoal/20">{s.label} (pronto)</span>
          ))}
        </div>
      </div>
    </section>
  );
}
