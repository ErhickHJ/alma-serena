"use client";

import { useLang } from "@/context/LangContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="text-xs font-medium text-charcoal/50 hover:text-sage-dark transition-colors cursor-pointer"
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
