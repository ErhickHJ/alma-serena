"use client";

import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function FaqContent() {
  const { lang } = useLang();
  const t = translations[lang].faq;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t.title}</SectionTitle>
        <DecorativeDivider className="my-8" />
        <div className="space-y-4">
          {t.items.map((faq: any, i: number) => (
            <details key={i} className="group bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
              <summary className="list-none cursor-pointer p-5 flex items-center justify-between gap-4 hover:bg-sage/5 transition-colors">
                <span className="text-sm font-medium text-charcoal">{faq.q}</span>
                <svg className="w-4 h-4 text-sage shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm text-charcoal/60 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
