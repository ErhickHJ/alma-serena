// Rate limiting con Upstash Redis (persistente entre instancias Vercel)
// Fallback a Map en memoria si UPSTASH no está configurado

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let upstash: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  upstash = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "60s"),
    analytics: false,
  });
}

// Fallback en memoria (se pierde al reiniciar)
const memStore = new Map<string, { count: number; resetAt: number }>();

function memRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = memStore.get(key);
  if (!entry || now > entry.resetAt) {
    memStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) return { allowed: false, remaining: 0 };
  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

export async function rateLimit(
  key: string,
  opts: { limit?: number; windowMs?: number } = {},
): Promise<{ allowed: boolean; remaining: number }> {
  const limit = opts.limit ?? 10;
  const windowMs = opts.windowMs ?? 60000;

  if (upstash) {
    const windowSec = Math.max(1, Math.round(windowMs / 1000));
    const result = await upstash.limit(key, { limit, window: `${windowSec}s` });
    return { allowed: result.success, remaining: result.remaining };
  }

  return memRateLimit(key, limit, windowMs);
}
