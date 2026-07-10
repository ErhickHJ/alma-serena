"use client";

import { useState, FormEvent } from "react";

export function ForumForm() {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (text.trim().length < 2) return;
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
          {status === "error" && <p className="text-xs text-red-400 text-center">{msg}</p>}
        </form>
      )}
    </div>
  );
}
