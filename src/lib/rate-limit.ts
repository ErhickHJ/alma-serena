// Rate limiting en memoria (Map)
// Simple: cuenta requests por clave, resetea tras la ventana de tiempo
// NOTA: Se pierde al reiniciar el servidor (no persistente, suficiente para Vercel)

const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, opts: { limit?: number; windowMs?: number } = {}) {
  const limit = opts.limit ?? 10;
  const windowMs = opts.windowMs ?? 60000;

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}
