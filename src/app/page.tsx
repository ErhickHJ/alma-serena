// Página principal — Landing page de Alma Serena
// Carga productos destacados desde la DB (campo featured: true) para la sección Tienda

import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { images } from "@/lib/images";
import AddToCartButton from "@/components/AddToCartButton";
import Carousel from "@/components/Carousel";
import NewsletterForm from "@/components/NewsletterForm";
import { prisma } from "@/lib/db";

const FALLBACK_FEATURED = [
  { id: "fb-1", name: "El Diario de 90 Días", price: 29.00, image: "/images/diario 4.png", emoji: "📖" },
  { id: "fb-2", name: "Cuaderno de Gratitud", price: 12.00, image: "/images/portada.jpg", emoji: "📓" },
  { id: "fb-3", name: "Set de Plumas", price: 8.00, image: "/images/pluma.png", emoji: "🖊️" },
  { id: "fb-4", name: "Vela - Cedro & Salvia", price: 20.00, image: "/images/vela cedro y salvia.png", emoji: "🕯️" },
  { id: "fb-5", name: "Funda de Cuero para el Diario", price: 34.00, image: "/images/funda diario.png", emoji: "👜" },
  { id: "fb-6", name: "Vela - Sándalo & Incienso", price: 20.00, image: "/images/vela sandalo e incienso.png", emoji: "🕯️" },
  { id: "fb-7", name: "Difusor de Aceites Esenciales", price: 32.00, image: "/images/Difusor se aceite.png", emoji: "💨" },
];

export default async function Home() {
  let featured = FALLBACK_FEATURED;
  try {
    const dbFeatured = await prisma.product.findMany({ where: { featured: true }, orderBy: { name: "asc" } });
    if (dbFeatured.length > 0) featured = dbFeatured;
  } catch {
    // DB offline — usando fallback local
  }

  return (
    <>
      <Hero />
      <AboutBook />
      <CommunityPreview />
      <AccessoriesPreview products={featured} />
      <HomeCommunityCTA />
      <PartnersPreview />
      <Testimonials />
      <NewsletterForm />
    </>
  );
}

// ============ HERO ============
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <Image
        src={images.hero}
        alt="Paisaje sereno de montañas y lago al atardecer"
        fill
        className="object-cover brightness-[0.3]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        <div className="text-gold-light/80 text-sm tracking-widest uppercase mb-6 font-medium">
          Diario de 90 días
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-warm-white leading-tight mb-6">
          Alma <br className="sm:hidden" />
          <span className="italic">Serena</span>
        </h1>
        <DecorativeDivider className="my-6 text-gold-light/40" />
        <p className="text-lg sm:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed mb-10">
          Un espacio para reconectar contigo, cultivar la gratitud
          y despertar una mirada más amorosa hacia ti y hacia la vida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/libro"
            className="inline-flex items-center px-8 py-3.5 bg-sage text-white rounded-full font-medium text-sm tracking-wide hover:bg-sage-dark transition-colors shadow-sm"
          >
            Descubrir el diario
          </a>
          <a
            href="/login?mode=signup"
            className="inline-flex items-center px-8 py-3.5 border border-cream/40 text-cream rounded-full font-medium text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            Unirme a la comunidad
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ SOBRE EL LIBRO ============
function AboutBook() {
  return (
    <section className="py-24 bg-cream/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Sobre el libro</div>
            <SectionTitle>Un viaje de 90 días hacia tu interior</SectionTitle>
            <DecorativeDivider className="my-6 justify-start" />
            <p className="text-charcoal/60 leading-relaxed mb-4">
              Alma Serena es una invitación a detenerte. A escucharte sin prisa.
              A recordar que también mereces cuidado. Durante 90 días, este diario
              te guía a través de un proceso de reconexión consciente.
            </p>
            <p className="text-charcoal/60 leading-relaxed mb-6">
              Cada página está diseñada para acompañarte en un proceso de autocuidado,
              reflexión emocional y crecimiento personal. No se trata de perfección,
              sino de presencia.
            </p>
            <a
              href="/libro"
              className="inline-flex items-center text-sage-dark font-medium text-sm hover:text-sage transition-colors"
            >
              Conocer más &rarr;
            </a>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-[28rem] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={images.diario2}
                alt="Alma Serena — Diario de 90 días"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ VISTA PREVIA COMUNIDAD ============
function CommunityPreview() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Comunidad</div>
        <SectionTitle>Un espacio para crecer juntos</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed mb-10">
          Forma parte de una comunidad de personas que, como tú, buscan vivir con
          más calma, gratitud y conexión.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: "☽", title: "Retos Semanales", desc: "Desafíos de bienestar para crecer día a día" },
            { icon: "✦", title: "Foro de Conexión", desc: "Comparte y aprende de otras almas serenas" },
            { icon: "✿", title: "Contenido Exclusivo", desc: "Meditaciones guiadas y recursos de paz" },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-xl bg-cream/50 border border-sage/10 hover:border-sage/30 transition-colors flex flex-col">
              <div className="text-3xl mb-3 shrink-0">{item.icon}</div>
              <h3 className="font-serif text-lg text-sage-dark mb-2 shrink-0">{item.title}</h3>
              <p className="text-sm text-charcoal/50 flex-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="/login?mode=signup"
            className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm"
          >
            Quiero unirme a la comunidad
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ TIENDA / ACCESORIOS ============
function AccessoriesPreview({ products }: { products: { id: string; name: string; price: number; image: string; emoji: string }[] }) {
  return (
    <section className="py-24 bg-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Tienda</div>
          <SectionTitle>Accesorios para tu paz interior</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
            Objetos diseñados para recordarte la importancia de la calma y el autocuidado.
          </p>
        </div>
        <div className="max-w-sm mx-auto sm:max-w-none">
          <Carousel items={products} />
        </div>
        <div className="text-center mt-10">
          <a href="/tienda" className="inline-flex items-center text-sage-dark font-medium text-sm hover:text-sage transition-colors">
            Ver todos los productos &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ CTA COMUNIDAD ============
function HomeCommunityCTA() {
  return (
    <section className="py-16 bg-gradient-to-b from-sage/5 to-warm-white text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-4xl mb-4 text-sage/40">☽</div>
        <h2 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-4">¿Ya formas parte de Alma Serena?</h2>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          Únete a una comunidad que elige la calma, la gratitud y el crecimiento personal.
          Comparte tu viaje, participa en retos y recibe contenido exclusivo.
        </p>
        <a
          href="/login?mode=signup"
          className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm"
        >
          Quiero unirme gratis
        </a>
      </div>
    </section>
  );
}

// ============ PARTNERS ============
function PartnersPreview() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Partners</div>
        <SectionTitle>Marcas que comparten nuestra esencia</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed mb-10">
          Trabajamos con empresas comprometidas con el bienestar, la relajación
          y el cuidado personal.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {["Yoga & Meditation", "Centro de Bienestar", "Terapias Holísticas", "Nutrición Consciente"].map((name) => (
            <div key={name} className="px-6 py-3 rounded-full border border-sage/20 text-sage-dark text-sm font-medium">
              {name}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a href="/partners" className="inline-flex items-center text-sage-dark font-medium text-sm hover:text-sage transition-colors">
            Conocer nuestros partners &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIOS ============
function Testimonials() {
  const testimonials = [
    { text: "Alma Serena llegó en un momento de mucho ruido mental. Me ha ayudado a reconectar conmigo y a encontrar paz en los pequeños momentos.", author: "María G.", location: "México" },
    { text: "Nunca pensé que un diario pudiera transformar tanto mi forma de ver la vida. La gratitud se ha vuelto mi práctica favorita.", author: "Ana L.", location: "España" },
    { text: "Cada página es un abrazo al alma. Lo recomiendo a todas mis amigas que buscan equilibrio emocional.", author: "Carla M.", location: "Argentina" },
    { text: "Desde que uso Alma Serena, empiezo cada día con una sonrisa. Ha cambiado mi rutina matutina por completo.", author: "Valentina R.", location: "Colombia" },
  ];

  return (
    <section className="py-24 bg-cream/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle>Lo que dicen nuestras lectoras</SectionTitle>
        <DecorativeDivider className="my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <blockquote key={t.author} className="p-6 rounded-xl bg-warm-white border border-sage/10 shadow-sm">
              <p className="text-charcoal/60 leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <footer className="text-sm">
                <span className="text-sage-dark font-medium">{t.author}</span>
                <span className="text-charcoal/40 text-xs ml-2">— {t.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}


