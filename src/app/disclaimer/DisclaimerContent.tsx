"use client";

import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function DisclaimerContent() {
  const { lang } = useLang();
  const t = translations[lang].legal;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {lang === "en" && (
          <p className="text-xs text-sage/60 mb-4 italic">This page is available only in Spanish as it contains legally binding information.</p>
        )}
        <SectionTitle>{t.legal} y disclaimer</SectionTitle>
        <DecorativeDivider className="my-8" />
        <div className="text-sm text-charcoal/60 leading-relaxed space-y-4">
          <h2 className="font-serif text-lg text-sage-dark pt-4">Naturaleza del servicio</h2>
          <p>
            Alma Serena es un diario de gratitud y bienestar personal. Los productos, contenidos y
            servicios ofrecidos en este sitio web tienen un propósito exclusivamente informativo,
            educativo y de desarrollo personal. No constituyen asesoramiento médico, psicológico,
            terapéutico ni profesional de ninguna índole.
          </p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">No es un sustituto profesional</h2>
          <p>
            El uso del diario, las afirmaciones, las meditaciones guiadas y cualquier otro contenido
            de Alma Serena no reemplaza la consulta con profesionales de la salud mental, médicos,
            terapeutas u otros especialistas. Si estás experimentando problemas emocionales,
            psicológicos o de salud, te recomendamos buscar la ayuda de un profesional calificado.
          </p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">Resultados individuales</h2>
          <p>
            Los testimonios, reseñas y experiencias compartidas por otros usuarios no garantizan
            resultados similares. Cada persona tiene un proceso único y los beneficios del diario
            pueden variar según el compromiso, la constancia y las circunstancias individuales.
          </p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">Suscripciones y renovación</h2>
          <p>
            Al adquirir una suscripción o membresía, autorizas el cargo recurrente según el plan
            seleccionado (mensual, trimestral o anual). Las suscripciones se renuevan automáticamente
            a menos que sean canceladas antes de la fecha de facturación. Puedes cancelar en cualquier
            momento desde tu perfil o contactándonos a <strong>comunidad@almaserenaoficial.com</strong>.
          </p>
          <p>
            Los reembolsos por suscripciones se manejan caso por caso dentro de los primeros 14 días
            posteriores al cargo. Los productos físicos tienen una política de devolución de 14 días
            a partir de la recepción, siempre que estén en su estado original.
          </p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">Propiedad intelectual</h2>
          <p>
            Todo el contenido de Alma Serena —incluyendo textos, diseños, ilustraciones, logotipos
            y materiales descargables— está protegido por derechos de autor. No está permitida su
            reproducción, distribución o modificación sin autorización expresa por escrito.
          </p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">Enlaces externos</h2>
          <p>
            Este sitio puede contener enlaces a sitios web de terceros. Alma Serena no se hace
            responsable por el contenido, precisión o prácticas de privacidad de dichos sitios.
          </p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">Limitación de responsabilidad</h2>
          <p>
            Alma Serena no será responsable por daños directos, indirectos, incidentales o
            consecuentes derivados del uso o la imposibilidad de uso de nuestros productos o
            servicios. El usuario asume toda responsabilidad por el uso que dé al contenido y
            productos adquiridos.
          </p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">Contacto</h2>
          <p>
            Si tienes preguntas sobre este aviso legal, escríbenos a{' '}
            <strong>comunidad@almaserenaoficial.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
