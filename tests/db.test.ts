import { describe, it, expect } from "vitest";

describe("db (fallback offline)", () => {
  it("prisma se puede importar sin errores", async () => {
    const { prisma } = await import("../src/lib/db");
    expect(prisma).toBeDefined();
  });

  it("product.findMany retorna array vacío cuando DB no disponible", async () => {
    const { prisma } = await import("../src/lib/db");
    const result = await (prisma as any).product.findMany();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it("post.findMany retorna array vacío cuando DB no disponible", async () => {
    const { prisma } = await import("../src/lib/db");
    const result = await (prisma as any).post.findMany();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it("order.count retorna 0 cuando DB no disponible", async () => {
    const { prisma } = await import("../src/lib/db");
    const result = await (prisma as any).order.count();
    expect(result).toBe(0);
  });

  it("findUnique retorna null cuando DB no disponible", async () => {
    const { prisma } = await import("../src/lib/db");
    const result = await (prisma as any).product.findUnique({ where: { id: "test" } });
    expect(result).toBeNull();
  });

  it("create retorna null cuando DB no disponible", async () => {
    const { prisma } = await import("../src/lib/db");
    const result = await (prisma as any).product.create({ data: { name: "test" } });
    expect(result).toBeNull();
  });
});
