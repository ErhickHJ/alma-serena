import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { rateLimit } from "../src/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("permite la primera solicitud", () => {
    const result = rateLimit("test-key", { limit: 3, windowMs: 60000 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("bloquea después de superar el límite", () => {
    const key = `test-block-${Date.now()}`;
    rateLimit(key, { limit: 2, windowMs: 60000 });
    rateLimit(key, { limit: 2, windowMs: 60000 });
    const result = rateLimit(key, { limit: 2, windowMs: 60000 });
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("usa valores por defecto si no se pasan opciones", () => {
    const key = `test-default-${Date.now()}`;
    const result = rateLimit(key);
    expect(result.allowed).toBe(true);
    expect(typeof result.remaining).toBe("number");
  });

  it("permite múltiples keys independientes", () => {
    const a = rateLimit("key-a", { limit: 1, windowMs: 60000 });
    const b = rateLimit("key-b", { limit: 1, windowMs: 60000 });
    expect(a.allowed).toBe(true);
    expect(b.allowed).toBe(true);
  });

  it("reinicia contador después de que expire la ventana", () => {
    const key = `test-reset-${Date.now()}`;
    rateLimit(key, { limit: 1, windowMs: 60000 });
    expect(rateLimit(key, { limit: 1, windowMs: 60000 }).allowed).toBe(false);
    vi.advanceTimersByTime(60001);
    expect(rateLimit(key, { limit: 1, windowMs: 60000 }).allowed).toBe(true);
  });

  it("retorna remaining 0 en el límite exacto con limit 1", () => {
    const key = `test-edge-${Date.now()}`;
    const first = rateLimit(key, { limit: 1, windowMs: 60000 });
    expect(first.remaining).toBe(0);
    const second = rateLimit(key, { limit: 1, windowMs: 60000 });
    expect(second.remaining).toBe(0);
    expect(second.allowed).toBe(false);
  });
});
