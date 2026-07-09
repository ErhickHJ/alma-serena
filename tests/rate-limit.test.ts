import { describe, it, expect } from "vitest";
import { rateLimit } from "../src/lib/rate-limit";

describe("rateLimit", () => {
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
});
