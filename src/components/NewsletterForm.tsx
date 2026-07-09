"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: name.trim() || undefined }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setMessage(data.message || "¡Gracias por suscribirte!");
      setEmail("");
      setName("");
    } else {
      setStatus("error");
      setMessage(data.error || "Error al suscribir");
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-sage/5 to-warm-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-4xl mb-4 text-sage/60">✿</div>
        <SectionTitle>Recibe serenidad en tu correo</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          Suscríbete para recibir afirmaciones, consejos de bienestar y
          contenido exclusivo de Alma Serena.
        </p>

        {status === "success" ? (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-green-700 text-sm font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Tu nombre (opcional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-3 rounded-full border border-sage/30 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full border border-sage/30 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Enviando..." : "Suscribirme"}
              </button>
            </div>
            {status === "error" && (
              <p className="text-rose text-sm text-left">{message}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
