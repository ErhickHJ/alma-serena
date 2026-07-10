"use client";

import { useEffect, useState } from "react";

export function ReferralSection() {
  const [data, setData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [refInput, setRefInput] = useState("");
  const [claimStatus, setClaimStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [claimMsg, setClaimMsg] = useState("");

  useEffect(() => {
    fetch("/api/referral")
      .then(r => r.json())
      .then(d => { if (d.success) setData(d); })
      .catch(() => {});
  }, []);

  async function handleClaim() {
    if (!refInput.trim()) return;
    setClaimStatus("sending");
    setClaimMsg("");
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: refInput.trim() }),
      });
      const d = await res.json();
      if (d.success) {
        setClaimStatus("done");
        setClaimMsg("¡Gracias! Has registrado tu referido.");
        setRefInput("");
        const r = await fetch("/api/referral").then(r => r.json());
        if (r.success) setData(r);
        setTimeout(() => setClaimStatus("idle"), 3000);
      } else {
        setClaimStatus("error");
        setClaimMsg(d.error || "Error al registrar");
      }
    } catch {
      setClaimStatus("error");
      setClaimMsg("Error de conexión");
    }
  }

  function handleCopy() {
    if (data?.referralUrl) {
      navigator.clipboard.writeText(data.referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div>
      <h2 className="font-serif text-xl text-sage-dark mb-4">Tu red de comunidad</h2>

      {data && (
        <div className="mb-6 p-5 rounded-xl bg-warm-white border border-sage/10 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-charcoal/50">Personas que has invitado</p>
              <p className="text-2xl font-semibold text-sage-dark">{data.count}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-charcoal/50">Tu nivel</p>
              <p className="text-lg">{data.level.badge} {data.level.title}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-sage/10">
            <p className="text-xs text-charcoal/50 mb-2">Tu enlace de invitación</p>
            <div className="flex gap-2">
              <input
                readOnly
                value={data.referralUrl || ""}
                className="flex-1 px-3 py-2 rounded-lg border border-sage/20 bg-warm-white text-xs text-charcoal/60 focus:outline-none"
              />
              <button onClick={handleCopy} className="px-3 py-2 bg-sage text-white rounded-lg text-xs font-medium hover:bg-sage-dark transition-colors shrink-0">
                {copied ? "✓ Copiado" : "Copiar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-5 rounded-xl bg-warm-white border border-sage/10 shadow-sm">
        <h3 className="text-sm font-medium text-charcoal mb-2">¿Alguien te invitó?</h3>
        <p className="text-xs text-charcoal/50 mb-3">Ingresa el código de la persona que te invitó a la comunidad.</p>
        <div className="flex gap-2">
          <input
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            placeholder="Código de invitación"
            className="flex-1 px-3 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
          />
          <button onClick={handleClaim} disabled={claimStatus === "sending"} className="px-4 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50 shrink-0">
            {claimStatus === "sending" ? "..." : "Registrar"}
          </button>
        </div>
        {claimStatus === "done" && <p className="text-xs text-sage-dark mt-2">{claimMsg}</p>}
        {claimStatus === "error" && <p className="text-xs text-red-400 mt-2">{claimMsg}</p>}
      </div>
    </div>
  );
}
