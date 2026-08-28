"use client";
import { useState, useEffect } from "react";

const CONSENT_KEY = "alma-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  function decide(value: string) {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("alma-cookie-consent-change"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-warm-white border-t border-sage/20 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-xs text-charcoal/60 flex-1">
          Usamos cookies esenciales para el funcionamiento del sitio y cookies de Google
          Analytics para medir el tráfico de forma anónima. Puedes aceptarlas o rechazarlas.
          Consulta nuestra{" "}
          <a href="/aviso-privacidad" className="text-sage-dark underline">
            Política de Privacidad
          </a>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => decide("declined")}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-sage/30 text-charcoal/70 hover:bg-sage/5 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={() => decide("accepted")}
            className="px-5 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
