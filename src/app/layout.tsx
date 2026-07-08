import {ClerkProvider, Show, SignInButton, UserButton} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import CartButton from "@/components/CartButton";
import { AdminLink } from "@/components/AdminLink";
import SubscribeForm from "@/components/SubscribeForm";
import { UserIcon, SocialIcon } from "@/components/Icons";
import Link from "next/link";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Alma Serena — Diario de 90 días de gratitud y transformación",
    template: "%s | Alma Serena",
  },
  description: "Un diario de 90 días para reconectar con tu calma, gratitud y crecimiento personal. Encuentra serenidad en cada página.",
  keywords: ["alma serena", "diario", "gratitud", "crecimiento personal", "bienestar", "meditación", "autocuidado"],
  openGraph: {
    title: "Alma Serena — Diario de 90 días de gratitud y transformación",
    description: "Un diario de 90 días para reconectar con tu calma, gratitud y crecimiento personal.",
    siteName: "Alma Serena",
    locale: "es_ES",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        <ClerkProvider>
          <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

// ============ HEADER ============
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-sage-light/30">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="font-serif text-2xl text-sage-dark hover:text-sage transition-colors">
          ✿ Alma Serena
        </a>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-charcoal/70">
          <a href="/" className="hover:text-sage-dark transition-colors">Inicio</a>
          <a href="/libro" className="hover:text-sage-dark transition-colors">El Libro</a>
          <a href="/tienda" className="hover:text-sage-dark transition-colors">Tienda</a>
          <a href="/blog" className="hover:text-sage-dark transition-colors">Blog</a>
          <a href="/comunidad" className="hover:text-sage-dark transition-colors">Comunidad</a>
          <a href="/partners" className="hover:text-sage-dark transition-colors">Partners</a>
          <a href="/contacto" className="hover:text-sage-dark transition-colors">Contacto</a>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="hover:text-sage-dark transition-colors" title="Iniciar sesión">
                <UserIcon />
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <CartButton />
          <AdminLink className="text-xs text-gold/60 hover:text-gold transition-colors font-medium" />
        </div>
        <div className="sm:hidden flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-charcoal/70 hover:text-sage-dark transition-colors" title="Iniciar sesión">
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

// ============ MENÚ MÓVIL ============
function MobileMenu() {
  return (
    <details className="group">
      <summary className="list-none cursor-pointer p-2 -mr-2">
        <svg className="w-6 h-6 text-charcoal/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute top-full left-0 right-0 bg-warm-white border-b border-sage-light/30 p-4 flex flex-col gap-3 text-sm font-medium text-charcoal/70 shadow-lg">
        <a href="/" className="hover:text-sage-dark transition-colors">Inicio</a>
        <a href="/libro" className="hover:text-sage-dark transition-colors">El Libro</a>
        <a href="/tienda" className="hover:text-sage-dark transition-colors">Tienda</a>
        <a href="/blog" className="hover:text-sage-dark transition-colors">Blog</a>
        <a href="/comunidad" className="hover:text-sage-dark transition-colors">Comunidad</a>
        <a href="/partners" className="hover:text-sage-dark transition-colors">Partners</a>
        <a href="/contacto" className="hover:text-sage-dark transition-colors">Contacto</a>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="hover:text-sage-dark transition-colors text-sm">Iniciar sesión</button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <a href="/perfil" className="hover:text-sage-dark transition-colors">Mi perfil</a>
              </Show>
              <AdminLink className="text-xs text-gold/60 hover:text-gold transition-colors font-medium" />
            </div>
    </details>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-sage/10 border-t border-sage-light/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl text-sage-dark mb-3">✿ Alma Serena</h3>
            <p className="text-sm text-charcoal/60 leading-relaxed">
              Un espacio para reconectar con tu calma, cultivar la gratitud y transformar tu bienestar interior.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-3 text-sm">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm text-charcoal/60">
              <a href="/libro" className="hover:text-sage-dark transition-colors">El Libro</a>
              <a href="/tienda" className="hover:text-sage-dark transition-colors">Tienda</a>
              <a href="/blog" className="hover:text-sage-dark transition-colors">Blog</a>
              <a href="/comunidad" className="hover:text-sage-dark transition-colors">Comunidad</a>
              <a href="/partners" className="hover:text-sage-dark transition-colors">Partners</a>
              <a href="/contacto" className="hover:text-sage-dark transition-colors">Contacto</a>
              <Link href="/carrito" className="hover:text-sage-dark transition-colors">Carrito</Link>
              <AdminLink className="hover:text-sage-dark transition-colors text-xs text-gold/60" />
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="text-charcoal/70 hover:text-sage-dark transition-colors text-sm font-medium">Iniciar sesión</button>
          </SignInButton>
        </Show>
          <Show when="signed-in">
            <UserButton />
            <a href="/perfil" className="text-xs text-charcoal/40 hover:text-sage-dark transition-colors">Perfil</a>
          </Show>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-3 text-sm">Newsletter</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed mb-3">
              Recibe contenido exclusivo, retos y reflexiones cada semana.
            </p>
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
          <span>&copy; {new Date().getFullYear()} Alma Serena. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <a href="/aviso-privacidad" className="hover:text-sage-dark transition-colors">Aviso de privacidad</a>
            <a href="/terminos" className="hover:text-sage-dark transition-colors">Términos</a>
            <a href="/faq" className="hover:text-sage-dark transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}