"use client";

import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { useLang } from "@/context/LangContext";

export default function EnvioContent() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream/30 to-warm-white">
      <section className="py-16 bg-gradient-to-b from-lavender/10 to-warm-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle>Política de envío</SectionTitle>
          <DecorativeDivider className="my-6" />
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {lang === "en" && (
          <p className="text-xs text-sage/60 mb-6 italic text-center">This page is available only in Spanish as it contains legally binding shipping information.</p>
        )}
        <div className="prose prose-sage max-w-none space-y-8">
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">1. Áreas de envío</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Realizamos envíos a todo Estados Unidos. Los pedidos se procesan desde nuestro centro de distribución en Nueva York.
              También realizamos envíos internacionales a México, España, Argentina, Colombia, Chile y Perú. Para destinos fuera de Estados Unidos, los tiempos y costos pueden variar, y pueden aplicarse impuestos o aranceles aduaneros que corren por cuenta del destinatario.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">2. Procesamiento de pedidos</h2>
            <ul className="text-charcoal/70 leading-relaxed space-y-2 list-disc pl-6">
              <li>Los pedidos se procesan en un plazo de 1 a 2 días hábiles después de la confirmación del pago.</li>
              <li>Los pedidos realizados en fines de semana o días festivos se procesan el siguiente día hábil.</li>
              <li>Recibirás un correo de confirmación al momento de realizar tu pedido y otro con el número de rastreo cuando sea enviado.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">3. Tiempos de entrega</h2>
            <ul className="text-charcoal/70 leading-relaxed space-y-2 list-disc pl-6">
              <li><strong>Envío estándar (USPS):</strong> 5 a 7 días hábiles dentro de Estados Unidos.</li>
              <li><strong>Envío rápido (UPS/FedEx):</strong> 2 a 3 días hábiles.</li>
              <li><strong>Envío internacional:</strong> 7 a 15 días hábiles según el destino.</li>
              <li><strong>Envío gratuito:</strong> disponible en pedidos superiores a $50 USD dentro de Estados Unidos.</li>
            </ul>
            <p className="text-charcoal/70 leading-relaxed mt-2">Los plazos indicados son estimados y no constituyen una garantía de entrega. Factores externos como condiciones climáticas o retrasos del transportista pueden afectarlos.</p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">4. Costos de envío</h2>
            <p className="text-charcoal/70 leading-relaxed">
              El costo de envío se calcula automáticamente al finalizar la compra según el peso del paquete, las dimensiones y la ubicación de entrega.
              El envío estándar es gratuito en pedidos superiores a $50 USD dentro de Estados Unidos.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">5. Dirección de entrega</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Es tu responsabilidad proporcionar una dirección de entrega correcta y completa. No nos hacemos responsables por pedidos enviados a direcciones incorrectas, incompletas o desactualizadas proporcionadas por el cliente. Si el paquete es devuelto a nosotros por una dirección incorrecta, contactaremos para coordinar el reenvío, que podrá implicar un costo adicional de envío.
              Verifica siempre tus datos antes de confirmar la compra.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">6. Seguimiento de paquetes</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Recibirás un correo electrónico con el número de rastreo una vez que tu pedido haya sido enviado. Puedes dar seguimiento a tu paquete en el sitio del transportista. Si tienes dudas sobre el estado de tu envío, contáctanos a comunidad@almaserenaoficial.com.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">7. Paquetes perdidos, dañados o robados</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Hacemos todo lo posible para que tu pedido llegue en perfectas condiciones. Si tu paquete llega dañado o no lo recibes dentro del plazo estimado, contáctanos dentro de los 7 días posteriores a la fecha estimada de entrega con tu número de pedido. Investigaremos con el transportista y, cuando corresponda, coordinaremos el reenvío o reembolso. NO nos hacemos responsables por paquetes que el transportista confirme como entregados y que el cliente reporte como robados; en ese caso, recomendamos coordinar directamente con el transportista.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">8. Impuestos y aduanas (envíos internacionales)</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Los envíos internacionales pueden estar sujetos a impuestos de importación, aranceles y tasas aduaneras del país de destino. Dichos cargos corren por cuenta del destinatario y no están incluidos en el precio del producto ni en el costo de envío.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">9. Contacto</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Para cualquier consulta sobre envíos, escríbenos a <a href="mailto:comunidad@almaserenaoficial.com" className="text-sage-dark hover:text-sage">comunidad@almaserenaoficial.com</a> o contáctanos por WhatsApp al +1 (347) 510-9619.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
