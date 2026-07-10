import { describe, it, expect } from "vitest";
import { products, bookProduct } from "../src/lib/products";

describe("products (estáticos)", () => {
  it("tiene 16 productos", () => {
    expect(products).toHaveLength(16);
  });

  it("bookProduct tiene id y precio correctos", () => {
    expect(bookProduct.id).toBe("alma-serena-libro");
    expect(bookProduct.price).toBe(24.99);
  });

  it("todos los productos tienen campos requeridos", () => {
    for (const p of products) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(typeof p.price).toBe("number");
      expect(p.emoji).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.desc).toBeTruthy();
    }
  });

  it("ids únicos — sin duplicados", () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("precios son positivos", () => {
    for (const p of products) {
      expect(p.price).toBeGreaterThan(0);
    }
  });

  it("categorías son del conjunto esperado", () => {
    const valid = ["Velas y Aromaterapia", "Diarios y Papelería", "Cristales y Energía", "Ritual y Bienestar", "Libros"];
    for (const p of [...products, bookProduct]) {
      expect(valid).toContain(p.category);
    }
  });
});
