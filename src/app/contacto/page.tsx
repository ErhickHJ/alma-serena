"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { SocialIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactCommunityCTA />
    </>
  );
}

// ============ HERO CONTACTO ============
function ContactHero() {
  return (
    <section className="py-20 bg-gradient-to-b from-sage/5 to-warm-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Contacto</div>
        <h1 className="font-serif text-4xl sm:text-5xl text-sage-dark leading-tight mb-4">
          Queremos escucharte
        </h1>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed">
          ¿Tienes preguntas sobre el diario, los productos, o quieres formar parte
          de nuestra comunidad? Estamos aquí para ti.
        </p>
      </div>
    </section>
  );
}

// ============ FORMULARIO CONTACTO ============
function ContactFormSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (sent) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center py-8">
            <div className="text-4xl mb-4 text-sage">✓</div>
            <h2 className="font-serif text-2xl text-sage-dark mb-2">Mensaje enviado</h2>
            <p className="text-charcoal/60">Gracias por escribirnos. Te responderemos pronto.</p>
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
            <h2 className="font-serif text-2xl text-sage-dark mb-4">Envíanos un mensaje</h2>
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
                setError("No se pudo enviar el mensaje. Intenta de nuevo.");
              } finally {
                setLoading(false);
              }
            }} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-charcoal/60 mb-1">Nombre *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-charcoal/60 mb-1">Correo electrónico *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-charcoal/60 mb-1">Asunto *</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="libro">Consulta sobre el libro</option>
                  <option value="tienda">Consulta sobre la tienda</option>
                  <option value="comunidad">Quiero unirme a la comunidad</option>
                  <option value="partner">Quiero ser partner</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-charcoal/60 mb-1">Mensaje *</label>
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
                {loading ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>
          <div className="lg:pt-12">
            <div className="p-8 rounded-xl bg-cream/40 border border-sage/10">
              <h3 className="font-serif text-xl text-sage-dark mb-6">Información de contacto</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-charcoal mb-1">Correo</div>
                  <a href={`mailto:${site.email}`} className="text-charcoal/60 hover:text-sage-dark transition-colors">{site.email}</a>
                </div>
                <div>
                  <div className="font-medium text-charcoal mb-1">WhatsApp</div>
                  <a href={site.social.whatsapp.url!} target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-sage-dark transition-colors">{site.phone}</a>
                </div>
                <div>
                  <div className="font-medium text-charcoal mb-1">Redes sociales</div>
                  <div className="flex gap-3 mt-1">
                    {Object.values(site.social).filter(s => s.url && s.label !== "WhatsApp").map(s => (
                      <a key={s.label} href={s.url!} target="_blank" rel="noopener noreferrer" className="text-charcoal/40 hover:text-sage-dark transition-colors" title={s.label}>
                        <SocialIcon platform={s.key} />
                      </a>
                    ))}
                    {Object.values(site.social).filter(s => !s.url).map(s => (
                      <span key={s.label} className="text-charcoal/20 cursor-not-allowed" title={`${s.label} (próximamente)`}>
                        <SocialIcon platform={s.key} />
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-charcoal mb-1">Horario de atención</div>
                  <p className="text-charcoal/60">{site.hours}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/login?mode=signup"
                  className="inline-flex items-center px-5 py-2.5 bg-sage text-white rounded-full text-xs font-medium hover:bg-sage-dark transition-colors shadow-sm"
                >
                  Únete a la comunidad
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
function ContactCommunityCTA() {
  return (
    <section className="py-20 bg-lavender/10 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-4xl mb-4 text-sage/40">✿</div>
        <SectionTitle>Forma parte de Alma Serena</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          Mientras esperas nuestra respuesta, no te pierdas el contenido exclusivo,
          los retos semanales y las reflexiones que compartimos en nuestra comunidad.
        </p>
        <a
          href="/login?mode=signup"
          className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm"
        >
          Explorar comunidad
        </a>
      </div>
    </section>
  );
}

