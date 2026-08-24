import type { Metadata } from "next";
import ContactoContent from "./ContactoContent";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponte en contacto con Alma Serena. Estamos aquí para ayudarte con pedidos, preguntas o sugerencias.",
  alternates: { canonical: "https://almaserenaoficial.com/contacto" },
};

export default function ContactPage() {
  return <ContactoContent />;
}
