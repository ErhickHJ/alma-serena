"use client";

import { useState } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpContent() {
  const [accepted, setAccepted] = useState(false);
  const [proceed, setProceed] = useState(false);

  if (proceed) {
    return (
      <div className="w-full">
        <div className="bg-warm-white rounded-xl p-8 border border-sage/10 shadow-sm flex justify-center">
          <SignUp signInUrl="/sign-in" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-warm-white rounded-xl p-8 border border-sage/10 shadow-sm">
        <h2 className="font-serif text-xl text-sage-dark mb-3">Antes de crear tu cuenta</h2>
        <p className="text-sm text-charcoal/60 leading-relaxed mb-4">
          Por favor, lee y acepta nuestras políticas para continuar con el registro. Al
          marcar la casilla confirmas que has leído y aceptas los siguientes documentos.
        </p>
        <div className="space-y-3 mb-6">
          <a
            href="/terminos"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border border-sage/20 bg-sage/5 hover:bg-sage/10 transition-colors"
          >
            <span className="block text-sm font-medium text-sage-dark">Términos y Condiciones</span>
            <span className="block text-xs text-charcoal/50 mt-1">Reglas de uso del sitio, pedidos y devoluciones.</span>
          </a>
          <a
            href="/aviso-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border border-sage/20 bg-sage/5 hover:bg-sage/10 transition-colors"
          >
            <span className="block text-sm font-medium text-sage-dark">Política de Privacidad</span>
            <span className="block text-xs text-charcoal/50 mt-1">Cómo recopilamos y usamos tu información.</span>
          </a>
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-sage/40 text-sage focus:ring-sage"
            aria-label="Acepto los Términos y Condiciones y la Política de Privacidad"
          />
          <span className="text-sm text-charcoal/70 leading-relaxed">
            He leído y acepto los{" "}
            <a href="/terminos" target="_blank" rel="noopener noreferrer" className="text-sage-dark underline">
              Términos y Condiciones
            </a>{" "}
            y la{" "}
            <a href="/aviso-privacidad" target="_blank" rel="noopener noreferrer" className="text-sage-dark underline">
              Política de Privacidad
            </a>{" "}
            de Alma Serena.
          </span>
        </label>
        <button
          type="button"
          disabled={!accepted}
          onClick={() => setProceed(true)}
          className="mt-6 w-full px-5 py-3 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:bg-sage enabled:hover:bg-sage-dark"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
}
