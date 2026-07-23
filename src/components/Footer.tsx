"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";
import { site } from "@/lib/site";
import { AdminLink } from "./AdminLink";
import SubscribeForm from "./SubscribeForm";
import { SocialIcon } from "./Icons";

export function Footer() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <footer className="bg-sage/10 border-t border-sage-light/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl text-sage-dark mb-3">✿ Alma Serena</h3>
            <p className="text-sm text-charcoal/60 leading-relaxed">{t.footer.descripcion}</p>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-3 text-sm">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm text-charcoal/60">
              <a href="/libro" className="hover:text-sage-dark transition-colors">{t.nav.libro}</a>
              <a href="/tienda" className="hover:text-sage-dark transition-colors">{t.nav.tienda}</a>
              <a href="/blog" className="hover:text-sage-dark transition-colors">{t.nav.blog}</a>
              <a href="/comunidad" className="hover:text-sage-dark transition-colors">{t.nav.comunidad}</a>
              <a href="/partners" className="hover:text-sage-dark transition-colors">{t.nav.partners}</a>
              <a href="/contacto" className="hover:text-sage-dark transition-colors">{t.nav.contacto}</a>
              <Link href="/carrito" className="hover:text-sage-dark transition-colors">{t.nav.carrito}</Link>
              <AdminLink className="hover:text-sage-dark transition-colors text-xs text-gold/60" />
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="text-charcoal/70 hover:text-sage-dark transition-colors cursor-pointer text-sm font-medium">{t.nav.iniciarSesion}</button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
                <a href="/perfil" className="text-xs text-charcoal/40 hover:text-sage-dark transition-colors">{t.nav.perfil}</a>
              </Show>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-3 text-sm">Newsletter</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed mb-3">{t.footer.newsletter}</p>
            <SubscribeForm />
            <div className="flex gap-3 mt-4">
              {Object.values(site.social).filter(s => s.url).map(s => (
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
        </div>
        <div className="border-t border-sage-light/30 mt-8 pt-8 text-center text-xs text-charcoal/40 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span>&copy; {new Date().getFullYear()} Alma Serena. {t.footer.derechos}</span>
          <div className="flex gap-4">
            <a href="/aviso-privacidad" className="hover:text-sage-dark transition-colors">{t.legal.aviso}</a>
            <a href="/terminos" className="hover:text-sage-dark transition-colors">{t.legal.terminos}</a>
            <a href="/politica-envio" className="hover:text-sage-dark transition-colors">Envíos</a>
            <a href="/politica-devoluciones" className="hover:text-sage-dark transition-colors">Devoluciones</a>
            <a href="/disclaimer" className="hover:text-sage-dark transition-colors">{t.legal.legal}</a>
            <a href="/faq" className="hover:text-sage-dark transition-colors">{t.legal.faq}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}