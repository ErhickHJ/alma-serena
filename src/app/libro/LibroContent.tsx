"use client";

import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { images } from "@/lib/images";
import { bookProduct } from "@/lib/products";
import BuyNowButton from "@/components/BuyNowButton";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function LibroContent() {
  const { lang } = useLang();
  const t = translations[lang].libro;

  return (
    <>
      <BookHero t={t} />
      <BookContent t={t} />
      <BookFeatures t={t} />
      <BookCTA t={t} />
      <BookCommunityCTA t={t} />
    </>
  );
}

// ============ HERO LIBRO ============
function BookHero({ t }: { t: any }) {
  return (
    <section className="py-20 bg-gradient-to-b from-sage/5 to-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">{t.label}</div>
            <h1 className="font-serif text-4xl sm:text-5xl text-sage-dark leading-tight mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-charcoal/50 mb-2 font-serif italic">{t.heroSubtitle}</p>
            <DecorativeDivider className="my-6 justify-start" />
            <p className="text-charcoal/60 leading-relaxed mb-6">
              {t.heroDesc}
            </p>
            <div className="flex items-center gap-3 text-sm text-charcoal/50 mb-6">
              <span>✿ {t.features.days90}</span>
              <span className="text-sage-light">|</span>
              <span>✿ {t.features.weeks13}</span>
              <span className="text-sage-light">|</span>
              <span>✿ {t.features.weeklyChallenges}</span>
            </div>
            <BuyNowButton item={bookProduct} label={t.buyNow} />
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-80 sm:w-80 sm:h-[32rem] rounded-2xl overflow-hidden shadow-md">
              <Image
              src={images.bookCover}
                alt="Alma Serena — Diario de 90 días"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CONTENIDO DEL DIARIO ============
function BookContent({ t }: { t: any }) {
  const weeks = [
    { title: "Semana 1", subtitle: "Presencia y Reconexión", desc: "Establece las bases de tu práctica diaria de gratitud y presencia." },
    { title: "Semana 2", subtitle: "El Arte de Soltar", desc: "Libera suavemente aquello que ya no te sirve." },
    { title: "Semana 3", subtitle: "La Intención Diaria", desc: "Aprende a elegir conscientemente cómo quieres vivir cada día." },
    { title: "Semana 4", subtitle: "Amor Propio Consciente", desc: "Cultiva una relación amable y respetuosa contigo misma." },
    { title: "Semana 5", subtitle: "Fortaleza Mental Suave", desc: "Desarrolla firmeza sin perder la ternura." },
    { title: "Semana 6", subtitle: "Escuchar tus Emociones", desc: "Permítete sentir sin juzgar." },
    { title: "Semana 7", subtitle: "Hábitos que Sanan", desc: "Pequeñas acciones diarias que transforman." },
    { title: "Semana 8", subtitle: "Reprogramación de Pensamientos", desc: "Transforma patrones mentales limitantes." },
    { title: "Semana 9", subtitle: "Autocompasión Activa", desc: "Trátate con la amabilidad que mereces." },
    { title: "Semana 10", subtitle: "Crear tu Identidad Nueva", desc: "Decide quién quieres ser a partir de hoy." },
    { title: "Semana 11", subtitle: "Claridad y Propósito", desc: "Vive con intención y dirección." },
    { title: "Semana 12", subtitle: "Gratitud Profunda", desc: "Reconoce con conciencia todo lo que sostiene tu vida." },
    { title: "Semana 13", subtitle: "Renacer Interior", desc: "Permítete empezar de nuevo desde tu verdad." },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionTitle>{t.contentTitle}</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
            {t.weeksDesc}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {weeks.map((week) => (
            <div key={week.title} className="p-5 rounded-lg bg-cream/40 border border-sage/10 hover:border-sage/30 transition-colors flex flex-col">
              <div className="text-xs text-gold font-medium tracking-widest uppercase mb-1 shrink-0">{week.title}</div>
              <h3 className="font-serif text-lg text-sage-dark mb-2 shrink-0">{week.subtitle}</h3>
              <p className="text-sm text-charcoal/50 flex-1">{week.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ QUÉ INCLUYE ============
function BookFeatures({ t }: { t: any }) {
  return (
    <section className="py-20 bg-cream/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionTitle>{t.includesTitle}</SectionTitle>
          <DecorativeDivider className="my-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: "☽", title: t.feature1, desc: "Cada día con una afirmación y espacio para emociones, gratitud y reflexiones." },
            { icon: "✦", title: t.feature2, desc: "Prácticas de desconexión digital, gratitud interpersonal y silencio consciente." },
            { icon: "✿", title: t.feature3, desc: "Al completar los 90 días, recibe un certificado que honra tu transformación." },
            { icon: "🌙", title: t.feature4, desc: "Un espacio especial para escribirle a la persona en la que te convertirás." },
          ].map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-lg bg-warm-white border border-sage/10">
              <div className="text-2xl shrink-0 mt-1">{f.icon}</div>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-sage-dark mb-1">{f.title}</h3>
                <p className="text-sm text-charcoal/50">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CTA COMPRAR ============
function BookCTA({ t }: { t: any }) {
  return (
    <section id="comprar" className="py-20 bg-gradient-to-b from-sage/5 to-warm-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-4xl mb-4 text-sage/40">✿</div>
        <SectionTitle>{t.ctaTitle}</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          Lleva Alma Serena a tu vida y empieza hoy mismo tu viaje de 90 días
          hacia una mente más tranquila, un corazón más agradecido y un alma serena.
        </p>
          <div className="bg-warm-white rounded-xl p-8 border border-sage/10 max-w-sm mx-auto">
          <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
            <Image
              src={images.diario3}
              alt="Alma Serena — Diario de 90 días"
              fill
              className="object-contain"
            />
          </div>
          <div className="font-serif text-2xl text-sage-dark mb-2">Alma Serena</div>
          <div className="text-gold text-2xl font-medium mb-4">$24.99</div>
          <ul className="text-xs text-charcoal/50 space-y-2 mb-6">
            <li>✦ {t.freeShipping}</li>
            <li>✦ {t.format}</li>
            <li>✦ {t.size}</li>
          </ul>
          <BuyNowButton item={bookProduct} label={t.buyNow} />
        </div>
      </div>
    </section>
  );
}

// ============ CTA COMUNIDAD (LIBRO) ============
function BookCommunityCTA({ t }: { t: any }) {
  return (
    <section className="py-20 bg-lavender/10 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-4xl mb-4 text-sage/40">☽</div>
        <SectionTitle>{t.communityTitle}</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          {t.communityDesc}
        </p>
        <a
          href="/comunidad"
          className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm"
        >
          {t.joinBtn}
        </a>
      </div>
    </section>
  );
}
