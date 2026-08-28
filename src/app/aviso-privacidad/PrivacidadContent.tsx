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
          <p className="text-xs text-charcoal/40">Última actualización: 28 de agosto de 2026</p>

          <p><strong>Alma Serena</strong> (en adelante, &ldquo;Alma Serena&rdquo;, &ldquo;nosotros&rdquo; o &ldquo;el responsable&rdquo;) se compromete a proteger la privacidad y los datos personales de sus usuarios. Esta política explica qué información recopilamos, cómo la usamos, con quién la compartimos y qué derechos tienes sobre ella, de conformidad con la California Consumer Privacy Act (CCPA) y las leyes de privacidad aplicables en Estados Unidos.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">1. Datos que recopilamos</h2>
          <p>Recopilamos información personal que nos proporcionas de forma voluntaria al utilizar nuestros servicios, entre la que se incluye:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Datos de identificación y contacto:</strong> nombre, correo electrónico, dirección de envío, número de teléfono.</li>
            <li><strong>Datos de pedido y pago:</strong> productos adquiridos, montos y método de pago. Los datos de tarjeta son procesados exclusivamente por nuestro proveedor de pagos (Stripe) y nunca son almacenados en nuestros servidores.</li>
            <li><strong>Datos de cuenta:</strong> nombre de usuario, contraseña (cifrada) e historial de pedidos gestionados a través de nuestro proveedor de autenticación (Clerk).</li>
            <li><strong>Información de contacto voluntaria:</strong> mensajes enviados mediante los formularios de contacto, solicitudes de socios y suscripciones al boletín.</li>
          </ul>

          <h2 className="font-serif text-lg text-sage-dark pt-4">2. Datos que recopilamos automáticamente</h2>
          <p>Cuando visitas nuestro sitio, podemos recopilar de forma automática:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Datos de uso:</strong> páginas visitadas, tiempo de permanencia y las acciones realizadas en el sitio.</li>
            <li><strong>Datos técnicos:</strong> dirección IP, tipo y versión de navegador, sistema operativo, tipo de dispositivo y origen de referencia.</li>
            <li><strong>Cookies y tecnologías similares:</strong> utilizamos cookies esenciales para el funcionamiento del sitio y cookies de análisis (Google Analytics) para entender cómo se utiliza nuestra plataforma.</li>
          </ul>

          <h2 className="font-serif text-lg text-sage-dark pt-4">3. Uso de la información</h2>
          <p>Utilizamos tus datos personales para las siguientes finalidades:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Procesar, gestionar y entregar tus pedidos.</li>
            <li>Gestionar tu cuenta y autenticación.</li>
            <li>Enviar comunicaciones relacionadas con el servicio (confirmaciones de pedido, actualizaciones de envío y atención al cliente).</li>
            <li>Enviar contenido promocional y boletines solo si has dado tu consentimiento previo. Puedes darte de baja en cualquier momento.</li>
            <li>Mejorar nuestros productos, servicios y la experiencia del sitio.</li>
            <li>Cumplir con obligaciones legales y prevenir el fraude.</li>
          </ul>

          <h2 className="font-serif text-lg text-sage-dark pt-4">4. Terceros con los que compartimos información</h2>
          <p>No vendemos tus datos personales. Podemos compartir información limitada con proveedores de servicios de confianza que nos ayudan a operar el negocio, siempre bajo acuerdos de confidencialidad y solo en la medida necesaria:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Stripe:</strong> procesamiento de pagos.</li>
            <li><strong>Clerk:</strong> autenticación y gestión de cuentas.</li>
            <li><strong>Google Analytics:</strong> medición anónima del tráfico y uso del sitio.</li>
            <li><strong>Resend:</strong> envío de correos electrónicos transaccionales y de marketing.</li>
          </ul>
          <p>También podemos divulgar información cuando sea requerido por ley, orden judicial o autoridad competente, o para proteger nuestros derechos legales.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">5. Protección de datos</h2>
          <p>Implementamos medidas de seguridad técnicas y organizativas razonables para proteger tus datos contra acceso no autorizado, alteración, pérdida o destrucción. Utilizamos cifrado en tránsito (TLS/HTTPS) y almacenamos las contraseñas de forma cifrada. Sin embargo, ningún método de transmisión o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar una seguridad absoluta.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">6. Retención de datos</h2>
          <p>Conservamos tus datos personales únicamente durante el tiempo necesario para cumplir las finalidades descritas en esta política, para mantener registros comerciales y contables, o para cumplir con obligaciones legales. Cuando los datos ya no sean necesarios, serán eliminados o anonimizados de forma segura.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">7. Tus derechos (CCPA y leyes aplicables)</h2>
          <p>En la medida que la ley lo permita, tienes derecho a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Acceso:</strong> conocer qué información personal tenemos sobre ti.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
            <li><strong>Eliminación:</strong> solicitar el borrado de tus datos personales.</li>
            <li><strong>Oposición:</strong> oponerte a determinados tratamientos de tus datos.</li>
            <li><strong>Limitación:</strong> restringir el uso de tus datos en ciertas circunstancias.</li>
            <li><strong>Portabilidad:</strong> solicitar una copia de tus datos en un formato estructurado y legible.</li>
            <li><strong>No discriminación:</strong> no recibir un trato distinto por ejercer tus derechos de privacidad.</li>
          </ul>
          <p>Para ejercer cualquiera de estos derechos, escríbenos a <strong>comunidad@almaserenaoficial.com</strong>. Responderemos a tu solicitud dentro de los plazos establecidos por la ley aplicable. No te cobraremos por ejercer tus derechos de privacidad.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">8. Cookies</h2>
          <p>Este sitio utiliza cookies esenciales para su correcto funcionamiento y cookies de análisis (Google Analytics) para medir el tráfico de forma anónima. Las cookies de terceros o de rastreo solo se utilizan con tu consentimiento previo, el cual puedes gestionar mediante el banner de cookies y la configuración de tu navegador. Puedes desactivar las cookies en cualquier momento desde la configuración de tu navegador.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">9. Menores de edad</h2>
          <p>Nuestros servicios no están destinados a menores de 13 años (o la edad mínima requerida en tu jurisdicción) y no recopilamos de forma intencional datos personales de menores. Si consideras que hemos recopilado datos de un menor sin el consentimiento adecuado, contáctanos y los eliminaremos.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">10. Transferencias internacionales</h2>
          <p>Al operar en Estados Unidos y utilizar proveedores de servicios internacionales (como Google, Stripe, Clerk y Resend), tus datos pueden ser transferidos a servidores ubicados en Estados Unidos y otros países. Al utilizar nuestros servicios, consientes dichas transferencias. Estos proveedores participan en marcos de protección de datos reconocidos o cuentan con salvaguardas contractuales adecuadas.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">11. Cambios a esta política</h2>
          <p>Podemos actualizar esta política de privacidad periódicamente. Cualquier cambio será publicado en esta página con la fecha de última actualización. Te recomendamos revisar esta política con regularidad.</p>

          <h2 className="font-serif text-lg text-sage-dark pt-4">12. Contacto</h2>
          <p>Para cualquier duda, solicitud o ejercicio de derechos sobre esta política o el tratamiento de tus datos, contáctanos en <strong>comunidad@almaserenaoficial.com</strong> o por WhatsApp al <strong>+1 (347) 510-9619</strong>.</p>
        </div>
      </div>
    </section>
  );
}
