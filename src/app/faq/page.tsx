import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";

export const metadata = { title: "Preguntas frecuentes" };

const faqs = [
  { q: "¿Qué es Alma Serena?", a: "Es un diario de gratitud de 90 días diseñado para ayudarte a reconectar con tu calma interior, cultivar la gratitud y transformar tu bienestar emocional a través de ejercicios diarios de escritura reflexiva." },
  { q: "¿En qué formato está disponible el diario?", a: "El diario está disponible en formato físico (impreso) y digital (PDF descargable)." },
  { q: "¿Hacen envíos internacionales?", a: "Sí, realizamos envíos a Estados Unidos, México, España, Argentina, Colombia, Chile y Perú." },
  { q: "¿Cuánto tarda el envío?", a: "Los pedidos se procesan en 1-2 días hábiles. El tiempo de entrega varía entre 5-10 días hábiles según el destino." },
  { q: "¿Cuál es su política de devoluciones?", a: "Aceptamos devoluciones dentro de los 14 días posteriores a la recepción. El producto debe estar en perfectas condiciones." },
  { q: "¿Cómo puedo contactarlos?", a: "Puedes escribirnos a comunidad@almaserenaoficial.com o a través del formulario de contacto en nuestra web." },
  { q: "¿Ofrecen descuentos por volumen?", a: "Sí, para pedidos al por mayor o proyectos educativos, por favor contáctanos para recibir una cotización personalizada." },
  { q: "¿Cómo puedo ser partner o afiliado?", a: "Visita nuestra sección de Partners y completa el formulario. Evaluaremos tu solicitud y te contactaremos." },
];

export default function FAQPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Preguntas frecuentes</SectionTitle>
        <DecorativeDivider className="my-8" />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
              <summary className="list-none cursor-pointer p-5 flex items-center justify-between gap-4 hover:bg-sage/5 transition-colors">
                <span className="text-sm font-medium text-charcoal">{faq.q}</span>
                <svg className="w-4 h-4 text-sage shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm text-charcoal/60 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
