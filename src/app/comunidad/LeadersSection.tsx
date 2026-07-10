"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";

const LEVELS = [
  { level: 1, min: 1, title: "Líder Bronce", badge: "🥉", desc: "1 persona invitada" },
  { level: 2, min: 5, title: "Líder Plata", badge: "🥈", desc: "5 personas invitadas" },
  { level: 3, min: 15, title: "Líder Oro", badge: "🥇", desc: "15 personas invitadas" },
  { level: 4, min: 30, title: "Líder Especial", badge: "✨", desc: "30+ personas invitadas" },
];

export function LeadersSection() {
  const [leaders, setLeaders] = useState<any[] | null>(null);

  useEffect(() => {
    fetch("/api/leaders")
      .then(r => r.json())
      .then(d => { if (d.success) setLeaders(d.leaders); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionTitle>Líderes de la comunidad</SectionTitle>
          <p className="text-xs text-charcoal/50 mt-2">Reconociendo a quienes inspiran y conectan a más personas con la serenidad</p>
          <DecorativeDivider className="my-6" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {LEVELS.map(l => (
            <div key={l.level} className="text-center p-4 rounded-xl bg-warm-white border border-sage/10">
              <div className="text-2xl mb-1">{l.badge}</div>
              <p className="text-xs font-medium text-sage-dark">{l.title}</p>
              <p className="text-[10px] text-charcoal/40 mt-0.5">{l.desc}</p>
            </div>
          ))}
        </div>

        {!leaders ? (
          <p className="text-center text-xs text-charcoal/30">Cargando líderes...</p>
        ) : leaders.length === 0 ? (
          <p className="text-center text-xs text-charcoal/40">Sé el primero en convertirte en líder. Invita a más personas a la comunidad.</p>
        ) : (
          <div className="space-y-3 max-w-lg mx-auto">
            {leaders.map((l, i) => (
              <div key={l.id} className="flex items-center gap-4 p-4 rounded-xl bg-warm-white border border-sage/10">
                <span className="text-lg w-6 text-center shrink-0">{i === 0 ? "👑" : i + 1}</span>
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage-dark font-medium text-sm shrink-0">
                  {l.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">{l.name}</p>
                  <p className="text-xs text-charcoal/40">{l.referralCount} persona{l.referralCount !== 1 ? "s" : ""} invitada{l.referralCount !== 1 ? "s" : ""}</p>
                </div>
                <span className="text-xs shrink-0" title={l.title}>{l.badge} {l.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
