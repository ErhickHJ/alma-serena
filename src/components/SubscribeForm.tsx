"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (done) {
    return <p className="text-xs text-sage-dark">✓ Gracias por suscribirte</p>;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) throw new Error("Error al suscribir");
          setDone(true);
        } catch {
          setError("No se pudo completar. Intenta de nuevo.");
        } finally {
          setLoading(false);
        }
      }}
      className="flex gap-2"
    >
      <div className="flex-1 min-w-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          aria-label="Correo electrónico"
          className="w-full px-3 py-2 rounded-lg border border-sage/20 bg-warm-white text-xs focus:outline-none focus:border-sage transition-colors"
        />
        {error && <p className="text-rose text-2xs mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 px-4 py-2 bg-sage text-white rounded-lg text-xs font-medium hover:bg-sage-dark transition-colors disabled:opacity-50"
      >
        {loading ? "..." : "Suscribirme"}
      </button>
    </form>
  );
}
