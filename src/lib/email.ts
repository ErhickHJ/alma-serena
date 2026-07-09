// Servicio de emails transaccionales con Resend
// 4 funciones: confirmación de pedido, notificación de contacto, alerta de seguridad, bienvenida

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const from = "Alma Serena <noreply@almaserenaoficial.com>";
const adminEmail = process.env.ADMIN_EMAIL || "comunidad@almaserenaoficial.com";

export async function sendOrderConfirmation(to: string, name: string, amount: number, orderId: string) {
  if (!resend) return;
  await resend.emails.send({
    from,
    to,
    subject: "¡Gracias por tu pedido! — Alma Serena",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #6B8D7A; font-family: serif;">✿ Alma Serena</h1>
        <p>Hola ${name},</p>
        <p>Gracias por tu pedido. Estamos preparándolo con mucho cariño.</p>
        <p style="font-size: 1.2em; font-weight: bold;">Total: $${(amount / 100).toFixed(2)}</p>
        <p style="color: #666;">Referencia: ${orderId}</p>
        <p>Recibirás un correo cuando tu pedido sea enviado.</p>
        <br/>
        <p style="color: #999; font-size: 0.85em;">✿ Alma Serena — Un diario de 90 días</p>
      </div>
    `,
  });
}

export async function notifyNewContact(name: string, email: string, subject: string, message: string) {
  if (!resend) return;
  await resend.emails.send({
    from,
    to: adminEmail,
    subject: `Nuevo mensaje de contacto: ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #6B8D7A;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="background: #f5f5f5; padding: 12px; border-radius: 6px;">${message}</p>
      </div>
    `,
  });
}

export async function notifySecurityAlert(type: string, detail: string) {
  if (!resend) return;
  await resend.emails.send({
    from,
    to: adminEmail,
    subject: `Alerta de seguridad: ${type}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #B85450;">Alerta de seguridad</h2>
        <p><strong>Tipo:</strong> ${type}</p>
        <p><strong>Detalle:</strong></p>
        <p style="background: #f5f5f5; padding: 12px; border-radius: 6px;">${detail}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <p style="color: #999; font-size: 0.85em;">✿ Alma Serena — Monitoreo de seguridad</p>
      </div>
    `,
  });
}

export async function sendWelcomeSubscriber(to: string, name?: string) {
  if (!resend) return;
  await resend.emails.send({
    from,
    to,
    subject: "¡Bienvenido a Alma Serena!",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #6B8D7A; font-family: serif;">✿ Alma Serena</h1>
        <p>${name ? `Hola ${name},` : "Hola,"}</p>
        <p>Gracias por suscribirte. Recibirás contenido exclusivo sobre gratitud, bienestar y crecimiento personal.</p>
        <p style="color: #999; font-size: 0.85em;">✿ Alma Serena — Un diario de 90 días</p>
      </div>
    `,
  });
}
