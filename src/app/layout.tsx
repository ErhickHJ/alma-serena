import {ClerkProvider} from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { LangProvider } from "@/context/LangContext";
import { Header } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
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
  metadataBase: new URL("https://almaserenaoficial.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Alma Serena — Diario de 90 días de gratitud y transformación",
    description: "Un diario de 90 días para reconectar con tu calma, gratitud y crecimiento personal.",
    siteName: "Alma Serena",
    locale: "es_ES",
    type: "website",
    url: "https://almaserenaoficial.com",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://almaserenaoficial.com",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#8ba888",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Alma Serena",
            url: "https://almaserenaoficial.com",
            description: "Un diario de 90 días para reconectar con tu calma, gratitud y crecimiento personal.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://almaserenaoficial.com/blog?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Alma Serena",
            url: "https://almaserenaoficial.com",
            logo: "https://almaserenaoficial.com/images/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-347-510-9619",
              contactType: "customer service",
              email: site.email,
            },
            sameAs: Object.values(site.social).filter(s => s.url).map(s => s.url),
          }),
        }} />
        <a href="#main-content" className="skip-to-content">Ir al contenido principal</a>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <LangProvider>
          <CartProvider>
            <ToastProvider>
            <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <AccessibilityToolbar />
          <CookieConsent />
          <Analytics />
            </ToastProvider>
          </CartProvider>
          </LangProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

