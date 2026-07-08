import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import PartnerForm from "@/components/PartnerForm";

const partners = [
  {
    name: "Centro de Bienestar Integral",
    desc: "Espacio dedicado a la sanación holística con terapias de sonido, masajes y meditación guiada.",
    category: "Terapias Holísticas",
  },
  {
    name: "Yoga & Meditación Studio",
    desc: "Clases de yoga para todos los niveles, enfocadas en la conexión mente-cuerpo y la respiración consciente.",
    category: "Yoga",
  },
  {
    name: "Nutrición Consciente",
    desc: "Asesoría nutricional basada en alimentación intuitiva y recetas que nutren el cuerpo y el alma.",
    category: "Nutrición",
  },
  {
    name: "Aromas del Alma",
    desc: "Aceites esenciales, velas artesanales y productos de aromaterapia para crear espacios de paz.",
    category: "Aromaterapia",
  },
  {
    name: "Terapias de Sonido",
    desc: "Baños de cuencos tibetanos, gongs y sound healing para armonizar tu energía.",
    category: "Sonido",
  },
  {
    name: "Caminos de Mindfulness",
    desc: "Cursos y talleres de mindfulness y reducción de estrés basados en evidencia científica.",
    category: "Mindfulness",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <PartnersList />
      <BecomePartner />
      <PartnersCommunityCTA />
    </>
  );
}

// ============ HERO PARTNERS ============
function PartnersHero() {
  return (
    <section className="py-20 bg-gradient-to-b from-lavender/10 to-warm-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Partners</div>
        <h1 className="font-serif text-4xl sm:text-5xl text-sage-dark leading-tight mb-4">
          Marcas que suman bienestar
        </h1>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed">
          Nos rodeamos de empresas y profesionales que comparten nuestra visión:
          un mundo donde el cuidado personal, la calma y el bienestar son prioritarios.
        </p>
      </div>
    </section>
  );
}

// ============ LISTA PARTNERS ============
function PartnersList() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div key={p.name} className="p-6 rounded-xl bg-cream/40 border border-sage/10 hover:border-sage/30 transition-colors flex flex-col">
              <div className="text-xs text-gold font-medium tracking-widest uppercase mb-2 shrink-0">{p.category}</div>
              <h3 className="font-serif text-xl text-sage-dark mb-2 shrink-0">{p.name}</h3>
              <p className="text-sm text-charcoal/50 leading-relaxed flex-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CONVÉRTETE EN PARTNER ============
function BecomePartner() {
  return (
    <section className="py-20 bg-cream/50 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-4xl mb-4 text-sage/40">✿</div>
        <SectionTitle>¿Compartes nuestra visión?</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          Si tu empresa o servicio está alineado con el bienestar, la relajación y el
          cuidado personal, queremos conocerte. Trabajemos juntos para llevar serenidad
          a más personas.
        </p>
        <PartnerForm />
      </div>
    </section>
  );
}

// ============ CTA COMUNIDAD (PARTNERS) ============
function PartnersCommunityCTA() {
  return (
    <section className="py-20 bg-lavender/10 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-4xl mb-4 text-sage/40">✿</div>
        <SectionTitle>Únete a nuestra comunidad</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          Conoce a otras personas que buscan vivir con más calma y propósito.
          Comparte, aprende y crece junto a la comunidad Alma Serena.
        </p>
        <a
          href="/comunidad"
          className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm"
        >
          Quiero unirme
        </a>
      </div>
    </section>
  );
}
