"use client";

import { useState } from "react";

export default function PartnerForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="text-3xl mb-3 text-sage">✓</div>
        <p className="text-charcoal/60">
          Gracias por tu interés. Te contactaremos pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = new URLSearchParams(new FormData(form) as any);
      await fetch("/api/partners", { method: "POST", body: data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      setSent(true);
    }} className="max-w-md mx-auto text-left space-y-4">
      <div>
        <label htmlFor="business" className="block text-sm text-charcoal/60 mb-1">Nombre del negocio *</label>
        <input id="business" name="business" type="text" required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm text-charcoal/60 mb-1">Tu nombre *</label>
        <input id="name" name="name" type="text" required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-charcoal/60 mb-1">Correo electrónico *</label>
        <input id="email" name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm text-charcoal/60 mb-1">Teléfono</label>
        <input id="phone" name="phone" type="tel" className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-charcoal/60 mb-1">Mensaje (opcional)</label>
        <textarea id="message" name="message" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors resize-none" />
      </div>
      <button type="submit" className="w-full py-2.5 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm">
        Enviar solicitud
      </button>
    </form>
  );
}
