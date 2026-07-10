"use client";

import { useState, FormEvent, useEffect } from "react";

const STORAGE_KEY = "as_forum_accepted";
const RULES = [
  "Respeta a todos los miembros. No se tolera discriminación, acoso o lenguaje ofensivo.",
  "Mantén un tono constructivo y amable. Este es un espacio de apoyo y crecimiento.",
  "No compartas información personal tuya ni de otros (dirección, teléfono, etc.).",
  "Evita spam, autopromoción o enlaces no relacionados con bienestar y gratitud.",
  "Los mensajes deben estar relacionados con el propósito de la comunidad: bienestar, gratitud y serenidad.",
  "Respeta la privacidad: no compartas conversaciones privadas del foro.",
  "Los administradores se reservan el derecho de moderar o eliminar mensajes que incumplan estas normas.",
];

export function ForumForm() {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [rulesOpen, setRulesOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (text.trim().length < 2) return;
    if (!accepted) { setMsg("Debes aceptar las reglas del foro para publicar."); return; }
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), tag: tag.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setText("");
        setTag("");
        setStatus("done");
        setMsg("¡Gracias por compartir! Tu mensaje se ha publicado.");
        setTimeout(() => { setStatus("idle"); setMsg(""); window.location.reload(); }, 2000);
      } else {
        setStatus("error");
        setMsg(data.error || "Error al publicar");
      }
    } catch {
      setStatus("error");
      setMsg("Error de conexión");
    }
  }

  function handleAccept() {
    setAccepted(true);
    localStorage.setItem(STORAGE_KEY, "true");
    setRulesOpen(false);
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h3 className="font-serif text-lg text-sage-dark">Comparte tu experiencia</h3>
        <p className="text-xs text-charcoal/50 mt-1">Tu historia puede inspirar a alguien más</p>
      </div>

      {status === "done" ? (
        <p className="text-center text-sm text-sage-dark">{msg}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu reflexión, experiencia o mensaje para la comunidad..."
            rows={3}
            required
            className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors resize-none"
          />
          <div className="flex gap-2">
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Etiqueta (ej: Gratitud, Meditación)"
              className="flex-1 px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-5 py-2.5 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50 shrink-0"
            >
              {status === "sending" ? "Enviando..." : "Publicar"}
            </button>
          </div>

          <div className="border-t border-sage/10 pt-3">
            <button type="button" onClick={() => setRulesOpen(!rulesOpen)} className="text-xs text-sage hover:text-sage-dark transition-colors flex items-center gap-1">
              <span className={rulesOpen ? "rotate-90" : ""}>&#9654;</span>
              {accepted ? "Reglas del foro (aceptadas)" : "Leer reglas del foro"}
            </button>

            {rulesOpen && (
              <div className="mt-3 p-4 rounded-lg bg-sage/5 border border-sage/10">
                <h4 className="text-xs font-medium text-sage-dark mb-3 uppercase tracking-wider">Reglas de la comunidad</h4>
                <ul className="space-y-2 mb-4">
                  {RULES.map((rule, i) => (
                    <li key={i} className="text-xs text-charcoal/60 leading-relaxed flex gap-2">
                      <span className="text-sage shrink-0 mt-0.5">{i + 1}.</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                {!accepted ? (
                  <button type="button" onClick={handleAccept} className="w-full px-4 py-2 bg-sage text-white rounded-lg text-xs font-medium hover:bg-sage-dark transition-colors">
                    Acepto las reglas del foro
                  </button>
                ) : (
                  <p className="text-xs text-sage text-center">✓ Has aceptado las reglas del foro</p>
                )}
              </div>
            )}
          </div>

          {status === "error" && <p className="text-xs text-red-400 text-center">{msg}</p>}
        </form>
      )}
    </div>
  );
}
