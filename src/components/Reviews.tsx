"use client";

import { useState, useEffect, FormEvent } from "react";
import { useUser } from "@clerk/nextjs";

type Review = { id: string; productId: string; author: string; rating: number; text: string; createdAt: string };

function StarRating({ value, onChange, readonly }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(i)}
          onMouseEnter={() => !readonly && setHover(i)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={`text-lg transition-colors ${readonly ? "cursor-default" : "cursor-pointer"} ${(hover || value) >= i ? "text-gold" : "text-charcoal/20"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Reviews({ productId }: { productId: string }) {
  const { user } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setReviews(d.reviews); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productId]);

  const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (rating < 1 || rating > 5) return;
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, text }),
      });
      const data = await res.json();
      if (data.success) {
        setText("");
        setRating(0);
        setStatus("done");
        setMsg("¡Gracias por tu reseña!");
        setReviews((prev) => {
          const exists = prev.find((r) => r.clerkUserId === user?.id);
          if (exists) return prev.map((r) => (r.clerkUserId === user?.id ? { ...r, rating, text } : r));
          return [{ ...data.review, createdAt: new Date().toISOString() }, ...prev];
        });
        setTimeout(() => { setStatus("idle"); setMsg(""); }, 3000);
      } else {
        setStatus("error");
        setMsg(data.error || "Error al enviar");
      }
    } catch {
      setStatus("error");
      setMsg("Error de conexión");
    }
  }

  return (
    <section className="mt-12 pt-8 border-t border-sage/10">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="font-serif text-xl text-sage-dark">Reseñas</h3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <StarRating value={Math.round(avg)} readonly />
            <span className="text-charcoal/50">{avg.toFixed(1)} ({reviews.length})</span>
          </div>
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8 p-4 rounded-xl bg-sage/5 border border-sage/10">
          <p className="text-xs text-charcoal/50 mb-2">Tu calificación</p>
          <StarRating value={rating} onChange={setRating} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cuéntanos qué te pareció este producto (opcional)"
            rows={3}
            className="w-full mt-3 px-4 py-3 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors resize-none"
          />
          <div className="flex items-center gap-3 mt-2">
            <button type="submit" disabled={status === "sending" || rating < 1} className="px-5 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50">
              {status === "sending" ? "Enviando..." : "Publicar reseña"}
            </button>
            {msg && <span className={`text-xs ${status === "error" ? "text-red-400" : "text-sage-dark"}`}>{msg}</span>}
          </div>
        </form>
      ) : (
        <p className="text-xs text-charcoal/40 mb-8">Inicia sesión para dejar una reseña</p>
      )}

      {loading ? (
        <p className="text-xs text-charcoal/30">Cargando reseñas...</p>
      ) : reviews.length === 0 ? (
        <p className="text-xs text-charcoal/40">Sé el primero en reseñar este producto</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="p-4 rounded-xl bg-warm-white border border-sage/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-sage-dark font-medium text-xs">
                  {r.author?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <span className="text-sm font-medium text-charcoal">{r.author}</span>
                  <span className="text-xs text-charcoal/30 ml-2">{new Date(r.createdAt).toLocaleDateString("es")}</span>
                </div>
                <div className="ml-auto"><StarRating value={r.rating} readonly /></div>
              </div>
              {r.text && <p className="text-sm text-charcoal/60 leading-relaxed">{r.text}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
