"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("alma-cookie-consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("alma-cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-warm-white border-t border-sage/20 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-xs text-charcoal/60 flex-1">
          Usamos cookies necesarias para el funcionamiento del sitio. No usamos cookies de rastreo.
        </p>
        <button onClick={accept} className="px-5 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors shrink-0">
          Aceptar
        </button>
      </div>
    </div>
  );
}
