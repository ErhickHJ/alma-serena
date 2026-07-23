"use client";

import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function PrivacidadContent() {
  const { lang } = useLang();
  const t = translations[lang].legal;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {lang === "en" && (
          <p className="text-xs text-sage/60 mb-4 italic">This page is available only in Spanish as it contains legally binding privacy information.</p>
        )}
        <SectionTitle>{t.aviso}</SectionTitle>
        <DecorativeDivider className="my-8" />
        <div className="text-sm text-charcoal/60 leading-relaxed space-y-4">
          <p><strong>Alma Serena</strong> (en adelante, "el responsable") se compromete a proteger la privacidad de los datos personales de sus usuarios.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Datos que recopilamos</h2>
          <p>Recopilamos nombre, correo electrónico y otra información que el usuario proporciona voluntariamente a través de formularios de contacto, suscripción al boletín y proceso de compra.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Uso de la información</h2>
          <p>Los datos se utilizan para procesar pedidos, enviar comunicaciones relacionadas con el servicio, mejorar nuestra plataforma y enviar contenido promocional solo con consentimiento previo.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Protección de datos</h2>
          <p>Implementamos medidas de seguridad técnicas y organizativas para proteger los datos contra acceso no autorizado, pérdida o destrucción.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Derechos del usuario</h2>
          <p>Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos escribiéndonos a <strong>comunidad@almaserenaoficial.com</strong>.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Cookies</h2>
          <p>Este sitio utiliza cookies esenciales para el funcionamiento. No utilizamos cookies de rastreo de terceros sin consentimiento.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Contacto</h2>
          <p>Para cualquier duda sobre esta política, contáctanos en <strong>comunidad@almaserenaoficial.com</strong>.</p>
        </div>
      </div>
    </section>
  );
}
