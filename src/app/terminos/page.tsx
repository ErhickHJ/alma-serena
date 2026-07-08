import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";

export const metadata = { title: "Términos y condiciones" };

export default function TerminosPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Términos y condiciones</SectionTitle>
        <DecorativeDivider className="my-8" />
        <div className="text-sm text-charcoal/60 leading-relaxed space-y-4">
          <p>Al acceder y utilizar este sitio web, aceptas los siguientes términos y condiciones.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Uso del sitio</h2>
          <p>Este sitio web ofrece un diario de gratitud digital y físico. El contenido es solo para fines informativos y personales.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Productos y precios</h2>
          <p>Los precios están expresados en USD. Nos reservamos el derecho de modificar precios en cualquier momento. Los pedidos están sujetos a disponibilidad.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Envíos y devoluciones</h2>
          <p>Los envíos se realizan dentro de los 5-10 días hábiles posteriores a la compra. Para devoluciones, contáctanos dentro de los 14 días posteriores a la recepción.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Propiedad intelectual</h2>
          <p>Todo el contenido del sitio, incluyendo texto, gráficos y logotipos, es propiedad de Alma Serena y está protegido por leyes de derechos de autor.</p>
          <h2 className="font-serif text-lg text-sage-dark pt-4">Contacto</h2>
          <p>Para preguntas sobre estos términos, escribe a <strong>comunidad@almaserenaoficial.com</strong>.</p>
        </div>
      </div>
    </section>
  );
}
