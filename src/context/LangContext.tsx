"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Lang } from "@/lib/translations";
import { translations } from "@/lib/translations";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

function resolve(obj: any, path: string): string {
  try {
    return path.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), obj) ?? path;
  } catch {
    return path;
  }
}

const LangContext = createContext<LangContextType>({ lang: "es", setLang: () => {}, t: (key: string) => key });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("alma-lang") as Lang | null;
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("alma-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key: string) => resolve(translations[lang], key), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
