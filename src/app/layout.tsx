import {ClerkProvider} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { LangProvider } from "@/context/LangContext";
import { Header } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
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
        <a href="#main-content" className="skip-to-content">Ir al contenido principal</a>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <LangProvider>
          <CartProvider>
            <ToastProvider>
            <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <AccessibilityToolbar />
            </ToastProvider>
          </CartProvider>
          </LangProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

