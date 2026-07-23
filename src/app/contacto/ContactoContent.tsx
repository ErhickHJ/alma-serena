"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { SocialIcon } from "@/components/Icons";
import { site } from "@/lib/site";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function ContactoContent() {
  const { lang } = useLang();
  const t = translations[lang].contacto;

  return (
    <>
      <ContactHero t={t} />
      <ContactFormSection t={t} />
      <ContactCommunityCTA t={t} />
    </>
  );
}

// ============ HERO CONTACTO ============
function ContactHero({ t }: { t: any }) {
  return (
    <section className="py-20 bg-gradient-to-b from-sage/5 to-warm-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">{t.heroTitle}</div>
        <h1 className="font-serif text-4xl sm:text-5xl text-sage-dark leading-tight mb-4">
          {t.heroDesc}
        </h1>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed">
          {t.heroBody}
        </p>
      </div>
    </section>
  );
}

// ============ FORMULARIO CONTACTO ============
function ContactFormSection({ t }: { t: any }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (sent) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center py-8">
            <div className="text-4xl mb-4 text-sage">✓</div>
            <h2 className="font-serif text-2xl text-sage-dark mb-2">{t.successTitle}</h2>
            <p className="text-charcoal/60">{t.successDesc}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-2xl text-sage-dark mb-4">{t.formTitle}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError("");
              try {
                const form = e.currentTarget;
                const data = new URLSearchParams(new FormData(form) as any);
                const res = await fetch("/api/contact", { method: "POST", body: data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
                if (!res.ok) throw new Error("Error al enviar");
                setSent(true);
              } catch {
                setError(t.error);
              } finally {
                setLoading(false);
              }
            }} className="space-y-4">
              <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ position: "absolute", left: "-9999px" }}>
                <label htmlFor="_hp">No llenar</label>
                <input id="_hp" name="_hp" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm text-charcoal/60 mb-1">{t.name} *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-charcoal/60 mb-1">{t.email} *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-charcoal/60 mb-1">{t.subject} *</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
                >
                  <option value="">{t.selectSubject}</option>
                  <option value="libro">{t.subjects.book}</option>
                  <option value="tienda">{t.subjects.shop}</option>
                  <option value="comunidad">{t.subjects.community}</option>
                  <option value="partner">{t.subjects.partner}</option>
                  <option value="otro">{t.subjects.other}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-charcoal/60 mb-1">{t.message} *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors resize-none"
                />
              </div>
              {error && <p className="text-rose text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? t.sending : t.sendBtn}
              </button>
            </form>
          </div>
          <div className="lg:pt-12">
            <div className="p-8 rounded-xl bg-cream/40 border border-sage/10">
              <h3 className="font-serif text-xl text-sage-dark mb-6">{t.infoTitle}</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-charcoal mb-1">{t.infoEmail}</div>
                  <a href={`mailto:${site.email}`} className="text-charcoal/60 hover:text-sage-dark transition-colors">{site.email}</a>
                </div>
                <div>
                  <div className="font-medium text-charcoal mb-1">{t.infoWhatsApp}</div>
                  <a href={site.social.whatsapp.url!} target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-sage-dark transition-colors">{site.phone}</a>
                </div>
                <div>
                  <div className="font-medium text-charcoal mb-1">{t.infoSocial}</div>
                  <div className="flex gap-3 mt-1">
                    {Object.values(site.social).filter(s => s.url && s.label !== "WhatsApp").map(s => (
                      <a key={s.label} href={s.url!} target="_blank" rel="noopener noreferrer" className="text-charcoal/40 hover:text-sage-dark transition-colors" title={s.label}>
                        <SocialIcon platform={s.key} />
                      </a>
                    ))}
                    {Object.values(site.social).filter(s => !s.url).map(s => (
                      <span key={s.label} className="text-charcoal/20 cursor-not-allowed" title={`${s.label} ${t.comingSoon}`}>
                        <SocialIcon platform={s.key} />
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-charcoal mb-1">{t.infoHours}</div>
                  <p className="text-charcoal/60">{t.infoHoursVal}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/login?mode=signup"
                  className="inline-flex items-center px-5 py-2.5 bg-sage text-white rounded-full text-xs font-medium hover:bg-sage-dark transition-colors shadow-sm"
                >
                  {t.communityTitle}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CTA COMUNIDAD (CONTACTO) ============
function ContactCommunityCTA({ t }: { t: any }) {
  return (
    <section className="py-20 bg-lavender/10 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-4xl mb-4 text-sage/40">✿</div>
        <SectionTitle>{t.communityDesc}</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          {t.communityBody}
        </p>
        <a
          href="/login?mode=signup"
          className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm"
        >
          {t.communityBtn}
        </a>
      </div>
    </section>
  );
}
