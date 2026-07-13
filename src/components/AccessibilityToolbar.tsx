"use client";

import { useState, useEffect } from "react";

export function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [simplified, setSimplified] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("alma-a11y");
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        if (prefs.fontSize) setFontSize(prefs.fontSize);
        if (prefs.highContrast) setHighContrast(true);
        if (prefs.simplified) setSimplified(true);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.style.fontSize = fontSize === "large" ? "115%" : fontSize === "xlarge" ? "135%" : "";

    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (simplified) {
      root.classList.add("simplified");
    } else {
      root.classList.remove("simplified");
    }

    localStorage.setItem("alma-a11y", JSON.stringify({ fontSize, highContrast, simplified }));
  }, [fontSize, highContrast, simplified]);

  function reset() {
    setFontSize("normal");
    setHighContrast(false);
    setSimplified(false);
    localStorage.removeItem("alma-a11y");
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 left-4 z-[60] w-10 h-10 rounded-full bg-sage text-white shadow-lg hover:bg-sage-dark transition-colors flex items-center justify-center cursor-pointer"
        aria-label="Menú de accesibilidad"
        title="Accesibilidad"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a2 2 0 100 4 2 2 0 000-4zM7 21l3-6h4l3 6M12 8v4l-2 3" />
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-16 left-4 z-[60] bg-warm-white border border-sage/20 rounded-xl shadow-lg p-4 w-56">
          <p className="text-xs font-medium text-sage-dark mb-3">Accesibilidad</p>

          <label className="block text-xs text-charcoal/60 mb-1">Tamaño de texto</label>
          <div className="flex gap-1 mb-3">
            {(["normal", "large", "xlarge"] as const).map((s) => (
              <button key={s} onClick={() => setFontSize(s)} className={`flex-1 px-2 py-1 text-xs rounded-md border transition-colors cursor-pointer ${fontSize === s ? "bg-sage text-white border-sage" : "border-sage/20 text-charcoal/60 hover:border-sage"}`}>
                {s === "normal" ? "A" : s === "large" ? "A+" : "A++"}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} className="accent-sage" />
            <span className="text-xs text-charcoal/60">Alto contraste</span>
          </label>

          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input type="checkbox" checked={simplified} onChange={(e) => setSimplified(e.target.checked)} className="accent-sage" />
            <span className="text-xs text-charcoal/60">Modo simplificado</span>
          </label>

          <button onClick={reset} className="w-full px-3 py-1.5 text-xs rounded-md border border-sage/20 text-charcoal/50 hover:border-sage transition-colors cursor-pointer">
            Restablecer
          </button>
        </div>
      )}
    </>
  );
}
