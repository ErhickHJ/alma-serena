// Rate limiting con Upstash Redis (persistente entre instancias Vercel)
// Fallback a Map en memoria si UPSTASH no está configurado

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Instancia global por defecto (sliding window 10 req/60s)
let upstashDefault: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  upstashDefault = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "60s"),
    analytics: false,
  });
}

// Cache de instancias por configuración (una por limit/window)
const instances = new Map<string, Ratelimit>();

function getUpstash(limit: number, windowSec: number): Ratelimit | null {
  if (!upstashDefault) return null;
  const key = `${limit}:${windowSec}`;
  if (instances.has(key)) return instances.get(key)!;

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSec}s`),
    analytics: false,
  });
  instances.set(key, rl);
  return rl;
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
  const windowSec = Math.max(1, Math.round(windowMs / 1000));

  const upstash = getUpstash(limit, windowSec);
  if (upstash) {
    const result = await upstash.limit(key);
    return { allowed: result.success, remaining: result.remaining };
  }

  return memRateLimit(key, limit, windowMs);
}
