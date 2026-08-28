"use client";

import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { useLang } from "@/context/LangContext";

export default function DevolucionesContent() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream/30 to-warm-white">
      <section className="py-16 bg-gradient-to-b from-lavender/10 to-warm-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle>Política de devoluciones</SectionTitle>
          <DecorativeDivider className="my-6" />
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {lang === "en" && (
          <p className="text-xs text-sage/60 mb-6 italic text-center">This page is available only in Spanish as it contains legally binding return policy information.</p>
        )}
        <div className="prose prose-sage max-w-none space-y-8">
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">1. Garantía de satisfacción</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Queremos que estés completamente satisfecho con tu compra. Si no es así, puedes devolver el producto dentro de los primeros 30 días posteriores a la recepción del pedido.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">2. Condiciones para devoluciones</h2>
            <ul className="text-charcoal/70 leading-relaxed space-y-2 list-disc pl-6">
              <li>El producto debe estar sin usar, sin daños y en su empaque original.</li>
              <li>Debes incluir el recibo o prueba de compra y tu número de pedido.</li>
              <li>La devolución debe realizarse dentro de los 30 días posteriores a la recepción.</li>
              <li>Los productos personalizados no son elegibles para devolución.</li>
              <li>Los productos en liquidación tienen devoluciones limitadas o pueden no ser elegibles; consulta antes de comprar.</li>
              <li>No aceptamos devoluciones de productos digitales (PDF, contenido descargable) una vez que hayan sido descargados o accedidos.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">3. Proceso de devolución</h2>
            <ol className="text-charcoal/70 leading-relaxed space-y-2 list-decimal pl-6">
              <li>Contáctanos a comunidad@almaserenaoficial.com con tu número de pedido y el motivo de la devolución.</li>
              <li>Te enviaremos las instrucciones y, en caso de que aplique, una etiqueta de devolución.</li>
              <li>Envía el producto en su empaque original dentro del plazo de 30 días.</li>
              <li>Una vez recibido e inspeccionado el producto, procesaremos el reembolso en un plazo de 5-7 días hábiles.</li>
            </ol>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">4. Costos de devolución</h2>
            <p className="text-charcoal/70 leading-relaxed">
              En caso de cambio de opinión, el costo del envío de retorno corre por cuenta del cliente. En caso de que el producto haya llegado dañado, defectuoso o por un error nuestro, cubriremos el costo del envío de devolución y el del reemplazo. No se reembolsará el costo del envío original de la compra a menos que la devolución sea por error nuestro o por un producto defectuoso.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">5. Reembolsos</h2>
            <p className="text-charcoal/70 leading-relaxed">
              El reembolso se realizará al método de pago original. El tiempo de procesamiento puede variar según tu banco o institución financiera (normalmente entre 5 y 10 días hábiles adicionales después de nuestra confirmación). Si tienes algún problema con tu reembolso después de este plazo, contáctanos.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">6. Productos dañados o defectuosos</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Si recibes un producto dañado o que no corresponde a tu pedido, contáctanos dentro de las 48 horas posteriores a la recepción con el número de pedido y fotografías del daño o del producto recibido.
              Enviaremos un reemplazo sin costo adicional o, si lo prefieres, te reembolsaremos el importe completo.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">7. Productos digitales</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Los productos digitales (como el diario en PDF o contenido descargable) se consideran entregados en el momento del acceso o descarga y, por lo tanto, no son elegibles para reembolso, excepto en caso de un error técnico comprobable que nos impida entregar el producto de forma correcta.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">8. Contacto</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Para solicitudes de devolución o reembolso, escríbenos a <a href="mailto:comunidad@almaserenaoficial.com" className="text-sage-dark hover:text-sage">comunidad@almaserenaoficial.com</a> o
              contáctanos por WhatsApp al +1 (347) 510-9619.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
