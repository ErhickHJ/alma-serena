import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream/30 to-warm-white">
      <section className="py-16 bg-gradient-to-b from-lavender/10 to-warm-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle>Política de devoluciones</SectionTitle>
          <DecorativeDivider className="my-6" />
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-sage max-w-none space-y-8">
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">1. Garantía de satisfacción</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Queremos que estés completamente satisfecho con tu compra. Si no es así, puedes devolver el producto dentro de los primeros 30 días después de la recepción.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">2. Condiciones para devoluciones</h2>
            <ul className="text-charcoal/70 leading-relaxed space-y-2">
              <li>El producto debe estar sin usar y en su empaque original</li>
              <li>Debes incluir el recibo o prueba de compra</li>
              <li>Los productos personalizados no son elegibles para devolución</li>
              <li>Los productos en liquidación tienen devoluciones limitadas</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">3. Proceso de devolución</h2>
            <ol className="text-charcoal/70 leading-relaxed space-y-2">
              <li>Contáctanos a ventas@almaserenaoficial.com con tu número de pedido</li>
              <li>Te enviaremos instrucciones para devolver el producto</li>
              <li>Una vez recibido el producto, procesaremos el reembolso en 5-7 días hábiles</li>
            </ol>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">4. Reembolsos</h2>
            <p className="text-charcoal/70 leading-relaxed">
              El reembolso se realizará al método de pago original. El tiempo de procesamiento puede variar según tu banco o institución financiera.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">5. Productos dañados</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Si recibes un producto dañado, contáctanos dentro de las 48 horas posteriores a la recepción con fotografías del daño.
              Enviaremos un reemplazo sin costo adicional.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-sage-dark mb-3">6. Contacto</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Para solicitudes de devolución o reembolso, escríbenos a <a href="mailto:ventas@almaserenaoficial.com" className="text-sage-dark hover:text-sage">ventas@almaserenaoficial.com</a> o
              contáctanos por WhatsApp al +1 (347) 510-9619.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
