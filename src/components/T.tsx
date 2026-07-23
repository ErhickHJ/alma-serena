"use client";

import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

function resolve(obj: any, path: string): string {
  try {
    return path.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), obj) ?? path;
  } catch {
    return path;
  }
}

export default function T({ k, fallback }: { k: string; fallback?: string }) {
  const { lang } = useLang();
  const text = resolve(translations[lang], k);
  if (text === k && fallback) return <>{fallback}</>;
  return <>{text}</>;
}
