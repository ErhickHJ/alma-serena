import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream/30 to-warm-white">
      <section className="py-16 bg-gradient-to-b from-lavender/10 to-warm-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle>Política de envío</SectionTitle>
          <DecorativeDivider className="my-6" />
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-sage max-w-none space-y-8">
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">1. Áreas de envío</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Realizamos envíos a todo Estados Unidos. Los pedidos se procesan desde nuestro centro de distribución en Nueva York.
              Para envíos internacionales, por favor contáctanos a través de ventas@almaserenaoficial.com.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">2. Tiempos de entrega</h2>
            <ul className="text-charcoal/70 leading-relaxed space-y-2">
              <li><strong>Envío estándar (USPS):</strong> 5-7 días hábiles</li>
              <li><strong>Envío rápido (UPS/FedEx):</strong> 2-3 días hábiles</li>
              <li><strong>Envío gratuito:</strong> Disponible en pedidos superiores a $50 USD</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">3. Costos de envío</h2>
            <p className="text-charcoal/70 leading-relaxed">
              El costo de envío se calcula automáticamente al finalizar la compra según el peso del paquete y la ubicación de entrega.
              Envío estándar gratuito en pedidos superiores a $50 USD.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">4. Seguimiento</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Recibirás un correo electrónico con el número de rastreo una vez que tu pedido haya sido enviado.
              Puedes dar seguimiento a tu paquete en el sitio del transportista.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">5. Dirección de entrega</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Es tu responsabilidad proporcionar una dirección de entrega correcta y completa.
              No nos hacemos responsables por pedidos enviados a direcciones incorrectas proporcionadas por el cliente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
