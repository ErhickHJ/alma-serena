"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";
import CartButton from "./CartButton";
import { AdminLink } from "./AdminLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserIcon } from "./Icons";

const NAV_LINKS: { href: string; key: keyof typeof translations.es.nav }[] = [
  { href: "/", key: "inicio" },
  { href: "/libro", key: "libro" },
  { href: "/tienda", key: "tienda" },
  { href: "/blog", key: "blog" },
  { href: "/comunidad", key: "comunidad" },
  { href: "/partners", key: "partners" },
  { href: "/contacto", key: "contacto" },
];

export function Header() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-sage-light/30">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="font-serif text-2xl text-sage-dark hover:text-sage transition-colors">
          ✿ Alma Serena
        </a>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-charcoal/70">
          {NAV_LINKS.map(({ href, key }) => (
            <a key={href} href={href} className="hover:text-sage-dark transition-colors">{t.nav[key]}</a>
          ))}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="hover:text-sage-dark transition-colors cursor-pointer" title={t.nav.iniciarSesion}>
                <UserIcon />
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <CartButton />
          <LanguageSwitcher />
          <AdminLink className="text-xs text-gold/60 hover:text-gold transition-colors font-medium" />
        </div>
        <div className="sm:hidden flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-charcoal/70 hover:text-sage-dark transition-colors cursor-pointer" title={t.nav.iniciarSesion}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <CartButton />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

function MobileMenu() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <details className="group">
      <summary className="list-none cursor-pointer p-2 -mr-2" aria-label={t.accesibilidad.menu}>
        <svg className="w-6 h-6 text-charcoal/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute top-full left-0 right-0 bg-warm-white border-b border-sage-light/30 p-4 flex flex-col gap-3 text-sm font-medium text-charcoal/70 shadow-lg">
        {NAV_LINKS.map(({ href, key }) => (
          <a key={href} href={href} className="hover:text-sage-dark transition-colors">{t.nav[key]}</a>
        ))}
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="hover:text-sage-dark transition-colors cursor-pointer text-sm">{t.nav.iniciarSesion}</button>
          </SignInButton>
        </Show>
      </div>
    </details>
  );
}