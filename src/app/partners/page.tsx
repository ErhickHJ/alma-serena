import type { Metadata } from "next";
import PartnersContent from "./PartnersContent";

export const metadata: Metadata = {
  title: "Partners",
  description: "Conviértete en partner de Alma Serena. Vende productos de bienestar y crecimiento personal en tu comunidad.",
  alternates: { canonical: "https://almaserenaoficial.com/partners" },
};

export default function PartnersPage() {
  return <PartnersContent />;
}
