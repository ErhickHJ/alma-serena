import { describe, it, expect } from "vitest";
import { bookProduct } from "../src/lib/products";

describe("bookProduct (estático)", () => {
  it("tiene id y precio correctos", () => {
    expect(bookProduct.id).toBe("alma-serena-libro");
    expect(bookProduct.price).toBe(24.99);
  });

  it("tiene todos los campos requeridos", () => {
    expect(bookProduct.id).toBeTruthy();
    expect(bookProduct.name).toBeTruthy();
    expect(typeof bookProduct.price).toBe("number");
    expect(bookProduct.emoji).toBeTruthy();
    expect(bookProduct.category).toBeTruthy();
    expect(bookProduct.desc).toBeTruthy();
  });

  it("precio es positivo", () => {
    expect(bookProduct.price).toBeGreaterThan(0);
  });

  it("categoría es Libros", () => {
    expect(bookProduct.category).toBe("Libros");
  });
});
