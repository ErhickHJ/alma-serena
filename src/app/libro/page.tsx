import type { Metadata } from "next";
import LibroContent from "./LibroContent";

export const metadata: Metadata = {
  title: "El Diario de 90 Días",
  description: "Un diario de gratitud de 90 días para reconectar con tu calma, crecimiento personal y bienestar diario.",
  alternates: { canonical: "https://almaserenaoficial.com/libro" },
  openGraph: {
    title: "El Diario de 90 Días — Alma Serena",
    description: "Un diario de gratitud de 90 días para reconectar con tu calma y crecimiento personal.",
  },
};

export default function BookPage() {
  return <LibroContent />;
}
