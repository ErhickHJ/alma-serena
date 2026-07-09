"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="text-xs text-sage-dark">✓ Gracias por suscribirte</p>;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await fetch("/api/subscribe", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });
        setDone(true);
      }}
      className="flex gap-2"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        aria-label="Correo electrónico"
        className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-sage/20 bg-warm-white text-xs focus:outline-none focus:border-sage transition-colors"
      />
      <button
        type="submit"
        className="shrink-0 px-4 py-2 bg-sage text-white rounded-lg text-xs font-medium hover:bg-sage-dark transition-colors"
      >
        Suscribirme
      </button>
    </form>
  );
}
