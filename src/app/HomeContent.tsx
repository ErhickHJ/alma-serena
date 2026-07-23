"use client";

import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { images } from "@/lib/images";
import AddToCartButton from "@/components/AddToCartButton";
import Carousel from "@/components/Carousel";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function HomeContent({ products }: { products: { id: string; name: string; price: number; image: string; emoji: string }[] }) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image src={images.hero} alt="Peaceful landscape" fill className="object-cover brightness-[0.3]" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          <div className="text-gold-light/80 text-sm tracking-widest uppercase mb-6 font-medium">{t.hero.label}</div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-warm-white leading-tight mb-6">
            Alma <br className="sm:hidden" /><span className="italic">Serena</span>
          </h1>
          <DecorativeDivider className="my-6 text-gold-light/40" />
          <p className="text-lg sm:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed mb-10">{t.hero.body}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/libro" className="inline-flex items-center px-8 py-3.5 bg-sage text-white rounded-full font-medium text-sm tracking-wide hover:bg-sage-dark transition-colors shadow-sm">{t.hero.ctaDiary}</a>
            <a href="/login?mode=signup" className="inline-flex items-center px-8 py-3.5 border border-cream/40 text-cream rounded-full font-medium text-sm tracking-wide hover:bg-white/10 transition-colors">{t.hero.ctaJoin}</a>
          </div>
        </div>
      </section>

      {/* ABOUT BOOK */}
      <section className="py-24 bg-cream/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">{t.aboutBook.label}</div>
              <SectionTitle>{t.aboutBook.title}</SectionTitle>
              <DecorativeDivider className="my-6 justify-start" />
              <p className="text-charcoal/60 leading-relaxed mb-4">{t.aboutBook.p1}</p>
              <p className="text-charcoal/60 leading-relaxed mb-6">{t.aboutBook.p2}</p>
              <a href="/libro" className="inline-flex items-center text-sage-dark font-medium text-sm hover:text-sage transition-colors">{t.aboutBook.cta} &rarr;</a>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-[28rem] rounded-2xl overflow-hidden shadow-md">
                <Image src={images.diario2} alt="Alma Serena" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY PREVIEW */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">{t.homeCommunity.label}</div>
          <SectionTitle>{t.homeCommunity.title}</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed mb-10">{t.homeCommunity.desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: "☽", title: t.homeCommunity.weeklyChallenges, desc: t.homeCommunity.weeklyChallengesDesc },
              { icon: "✦", title: t.homeCommunity.forum, desc: t.homeCommunity.forumDesc },
              { icon: "✿", title: t.homeCommunity.exclusive, desc: t.homeCommunity.exclusiveDesc },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-cream/50 border border-sage/10 hover:border-sage/30 transition-colors flex flex-col">
                <div className="text-3xl mb-3 shrink-0">{item.icon}</div>
                <h3 className="font-serif text-lg text-sage-dark mb-2 shrink-0">{item.title}</h3>
                <p className="text-sm text-charcoal/50 flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/login?mode=signup" className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm">{t.homeCommunity.joinBtn}</a>
          </div>
        </div>
      </section>

      {/* SHOP PREVIEW */}
      <section className="py-24 bg-lavender/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">{t.homeShop.label}</div>
            <SectionTitle>{t.homeShop.title}</SectionTitle>
            <DecorativeDivider className="my-6" />
            <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed">{t.homeShop.desc}</p>
          </div>
          <div className="max-w-sm mx-auto sm:max-w-none"><Carousel items={products} /></div>
          <div className="text-center mt-10">
            <a href="/tienda" className="inline-flex items-center text-sage-dark font-medium text-sm hover:text-sage transition-colors">{t.homeShop.viewAll} &rarr;</a>
          </div>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="py-16 bg-gradient-to-b from-sage/5 to-warm-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-4xl mb-4 text-sage/40">☽</div>
          <h2 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-4">{t.homeCta.title}</h2>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 leading-relaxed mb-8">{t.homeCta.desc}</p>
          <a href="/login?mode=signup" className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm">{t.homeCta.btn}</a>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">{t.homePartners.label}</div>
          <SectionTitle>{t.homePartners.title}</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed mb-10">{t.homePartners.desc}</p>
          <div className="flex flex-wrap justify-center gap-8">
            {["Yoga & Meditation", "Centro de Bienestar", "Terapias Holísticas", "Nutrición Consciente"].map((name) => (
              <div key={name} className="px-6 py-3 rounded-full border border-sage/20 text-sage-dark text-sm font-medium">{name}</div>
            ))}
          </div>
          <div className="mt-10">
            <a href="/partners" className="inline-flex items-center text-sage-dark font-medium text-sm hover:text-sage transition-colors">{t.homePartners.cta} &rarr;</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials t={t} lang={lang} />
    </>
  );
}

function Testimonials({ t, lang }: { t: any; lang: string }) {
  const testimonials = [
    { text: lang === "es" ? "Alma Serena llegó en un momento de mucho ruido mental. Me ha ayudado a reconectar conmigo y a encontrar paz en los pequeños momentos." : "Alma Serena arrived at a time of a lot of mental noise. It helped me reconnect with myself and find peace in small moments.", author: "María G.", location: "México" },
    { text: lang === "es" ? "Nunca pensé que un diario pudiera transformar tanto mi forma de ver la vida. La gratitud se ha vuelto mi práctica favorita." : "I never thought a diary could transform my way of seeing life so much. Gratitude has become my favorite practice.", author: "Ana L.", location: "España" },
    { text: lang === "es" ? "Cada página es un abrazo al alma. Lo recomiento a todas mis amigas que buscan equilibrio emocional." : "Each page is a hug to the soul. I recommend it to all my friends seeking emotional balance.", author: "Carla M.", location: "Argentina" },
    { text: lang === "es" ? "Desde que uso Alma Serena, empiezo cada día con una sonrisa. Ha cambiado mi rutina matutina por completo." : "Since using Alma Serena, I start each day with a smile. It has completely changed my morning routine.", author: "Valentina R.", location: "Colombia" },
  ];

  return (
    <section className="py-24 bg-cream/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle>{t.testimonials.title}</SectionTitle>
        <DecorativeDivider className="my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <blockquote key={item.author} className="p-6 rounded-xl bg-warm-white border border-sage/10 shadow-sm">
              <p className="text-charcoal/60 leading-relaxed mb-4 italic">&ldquo;{item.text}&rdquo;</p>
              <footer className="text-sm">
                <span className="text-sage-dark font-medium">{item.author}</span>
                <span className="text-charcoal/40 text-xs ml-2">— {item.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
