import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { site } from "@/lib/site";

export default function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <CommunityFeatures />
      <CommunityFeed />
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

// ============ FEED COMUNIDAD ============
function CommunityFeed() {
  const posts = [
    {
      author: "Camila R.",
      avatar: "C",
      text: "Hoy cumplí 30 días con Alma Serena y siento que mi relación conmigo misma ha cambiado profundamente. La gratitud ya no es un ejercicio, es una forma de ver la vida.",
      tag: "30 días",
    },
    {
      author: "Sofía M.",
      avatar: "S",
      text: "El reto de desconectarme 30 minutos del mundo digital fue transformador. Descubrí que el silencio no es vacío, es espacio para escucharme.",
      tag: "Reto semanal",
    },
    {
      author: "Valentina P.",
      avatar: "V",
      text: "Escribir una carta a mi yo futuro fue el ejercicio más liberador que he hecho. Me prometí seguir eligiéndome, todos los días.",
      tag: "Reflexión",
    },
  ];

  return (
    <section className="py-20 bg-cream/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionTitle>Voces de la comunidad</SectionTitle>
          <DecorativeDivider className="my-6" />
        </div>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.author} className="p-6 rounded-xl bg-warm-white border border-sage/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage-dark font-medium text-sm">
                  {post.avatar}
                </div>
                <div>
                  <div className="font-medium text-sm text-charcoal">{post.author}</div>
                  <div className="text-xs text-gold">{post.tag}</div>
                </div>
              </div>
              <p className="text-charcoal/60 text-sm leading-relaxed">&ldquo;{post.text}&rdquo;</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="/login?mode=signup"
            className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm"
          >
            Quiero unirme
          </a>
        </div>
      </div>
    </section>
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
