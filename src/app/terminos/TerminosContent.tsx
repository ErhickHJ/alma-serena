"use client";

import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function TerminosContent() {
  const { lang } = useLang();
  const t = translations[lang].legal;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {lang === "en" && (
          <p className="text-xs text-sage/60 mb-4 italic">This page is available only in Spanish as it contains legally binding terms.</p>
        )}
        <SectionTitle>{t.terminos} y condiciones</SectionTitle>
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

          <DecorativeDivider className="my-8" />

          <h2 className="font-serif text-xl text-sage-dark pt-2">ANEXO: TÉRMINOS Y CONDICIONES DEL PROGRAMA DE EMBAJADORES DE BIENESTAR Y CÍRCULOS DE COMUNIDAD</h2>
          <p>El presente documento constituye un anexo vinculante a los Términos y Condiciones Generales de la plataforma Alma Serena. Regula las normas, derechos, obligaciones y limitaciones aplicables al sistema de referidos, incentivos y al rol honorífico de Líder de Grupo dentro de nuestra comunidad.</p>

          <h3 className="font-serif text-base text-sage-dark pt-4">1. Naturaleza del Programa y Ausencia de Esquema Piramidal</h3>
          <p>El Programa de Embajadores de Bienestar de Alma Serena es un sistema estrictamente diseñado para la fidelización de usuarios, la recomendación orgánica y la promoción de la lectura y el bienestar integral.</p>
          <p><strong>Estructura Plana (Un solo nivel):</strong> Las recompensas, beneficios o incentivos se generan de forma exclusiva y directa por la suscripción inmediata del usuario referido utilizando el enlace o código único del usuario referente.</p>
          <p><strong>Prohibición de comisiones en cascada:</strong> Alma Serena no opera, bajo ninguna circunstancia, un modelo de comercialización multinivel (MLM), esquema piramidal ni red de mercadeo. No existen "líneas descendentes", comisiones indirectas por sub-referidos ni beneficios económicos derivados de la captación consecutiva de personas.</p>
          <p><strong>Inexistencia de promesa financiera:</strong> La participación en este programa es completamente gratuita y voluntaria. No se promete, garantiza ni ofrece un retorno de inversión, ingresos pasivos, salarios ni comisiones en dinero en efectivo de curso legal.</p>

          <h3 className="font-serif text-base text-sage-dark pt-4">2. El Rol de "Líder de Grupo" o "Moderador de Círculo"</h3>
          <p>Aquellos usuarios que alcancen el hito establecido por la plataforma de 15 usuarios referidos con suscripción activa de pago, calificarán de forma automática para optar por la distinción comunitaria de "Líder de Grupo" o "Moderador de Círculo Alma Serena".</p>
          <p><strong>Carácter Honorífico y Voluntario:</strong> Este rol es un reconocimiento comunitario y una función de vocería voluntaria. Su propósito es coordinar debates, liderar círculos de lectura en torno al diario impreso y fomentar la interacción saludable entre los miembros asignados a su equipo.</p>
          <p><strong>Naturaleza No Laboral:</strong> El otorgamiento de este título y sus correspondientes beneficios no constituyen una relación de subordinación laboral, contrato de trabajo, relación de agencia ni prestación de servicios profesionales. El Líder de Grupo actúa como un usuario avanzado independiente y no como empleado, comisionista o representante legal de Alma Serena.</p>

          <h3 className="font-serif text-base text-sage-dark pt-4">3. Beneficios, Compensaciones No Dinerarias e Incentivos</h3>
          <p>Las compensaciones para los Líderes de Grupo son estrictamente en especie y de naturaleza digital o de acceso a contenido:</p>
          <p><strong>Exención de Cuota de Suscripción:</strong> El Líder de Grupo recibirá una Licencia Premium de Cortesía (Suscripción Gratuita Total) mientras mantenga los requisitos mínimos de actividad y volumen de su grupo.</p>
          <p><strong>Accesos Editoriales Privilegiados:</strong> Posibilidad de participar en sesiones consultivas de contenido con el equipo de Alma Serena y, sujeto a criterios editoriales, firmar columnas de opinión o colaboraciones en el diario digital.</p>
          <p><strong>Acceso VIP:</strong> Invitaciones prioritarias o accesos bonificados a conferencias, talleres y eventos organizados directamente por la marca.</p>

          <h3 className="font-serif text-base text-sage-dark pt-4">4. Requisitos de Mantenimiento y Reglas de Moderación</h3>
          <p>Para conservar la distinción de Líder de Grupo y los beneficios asociados, el usuario deberá cumplir con los siguientes estándares de forma continua:</p>
          <p><strong>Mínimo de Usuarios Activos:</strong> El grupo coordinado deberá contar de forma permanente con un mínimo de 10 suscriptores de pago activos. Si el volumen desciende de dicha cifra, la plataforma otorgará un periodo de gracia de 30 días antes de suspender temporalmente los beneficios del rol.</p>
          <p><strong>Código de Conducta y Moderación:</strong> El Líder es responsable de velar por el respeto mutuo dentro de su círculo de comunidad. Queda estrictamente prohibido el uso del grupo para la difusión de spam, discursos de odio, actividades comerciales o promocionales ajenas a Alma Serena, o doctrinas políticas/religiosas radicalizadas.</p>

          <h3 className="font-serif text-base text-sage-dark pt-4">5. Limitación de Responsabilidad y Facultad de Revocación</h3>
          <p>Los Líderes de Grupo no poseen facultades ni autorizaciones legales para celebrar contratos, recaudar dineros, recibir pagos de terceros en nombre de Alma Serena, ni comprometer la responsabilidad jurídica o reputacional de la empresa bajo ningún concepto.</p>
          <p>Alma Serena se reserva el derecho absoluto e inapelable de revocar el rol de Líder de Grupo, dar de baja un círculo de comunidad y retirar los beneficios de cortesía de forma inmediata en caso de detectarse infracciones al presente anexo, manipulación fraudulenta del sistema de referidos o conductas incompatibles con los valores de bienestar de la marca.</p>
        </div>
      </div>
    </section>
  );
}
