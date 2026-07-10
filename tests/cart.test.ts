import { describe, it, expect } from "vitest";
import { cartReducer } from "../src/context/CartContext";

describe("cartReducer", () => {
  it("ADD agrega item al carrito vacío", () => {
    const state = { items: [] };
    const next = cartReducer(state, { type: "ADD", payload: { id: "1", name: "Test", price: 10, quantity: 1, emoji: "📦" } });
    expect(next.items).toHaveLength(1);
    expect(next.items[0].id).toBe("1");
    expect(next.items[0].quantity).toBe(1);
  });

  it("ADD incrementa quantity si el item ya existe", () => {
    const state = { items: [{ id: "1", name: "Test", price: 10, quantity: 1, emoji: "📦" }] };
    const next = cartReducer(state, { type: "ADD", payload: { id: "1", name: "Test", price: 10, quantity: 2, emoji: "📦" } });
    expect(next.items).toHaveLength(1);
    expect(next.items[0].quantity).toBe(3);
  });

  it("REMOVE elimina item por id", () => {
    const state = { items: [{ id: "1", name: "A", price: 10, quantity: 1, emoji: "📦" }, { id: "2", name: "B", price: 20, quantity: 1, emoji: "📦" }] };
    const next = cartReducer(state, { type: "REMOVE", payload: "1" });
    expect(next.items).toHaveLength(1);
    expect(next.items[0].id).toBe("2");
  });

  it("REMOVE no-op si id no existe", () => {
    const state = { items: [{ id: "1", name: "Test", price: 10, quantity: 1, emoji: "📦" }] };
    const next = cartReducer(state, { type: "REMOVE", payload: "999" });
    expect(next.items).toHaveLength(1);
  });

  it("UPDATE_QTY actualiza cantidad", () => {
    const state = { items: [{ id: "1", name: "Test", price: 10, quantity: 1, emoji: "📦" }] };
    const next = cartReducer(state, { type: "UPDATE_QTY", payload: { id: "1", quantity: 5 } });
    expect(next.items[0].quantity).toBe(5);
  });

  it("UPDATE_QTY no-op si id no existe", () => {
    const state = { items: [{ id: "1", name: "Test", price: 10, quantity: 1, emoji: "📦" }] };
    const next = cartReducer(state, { type: "UPDATE_QTY", payload: { id: "999", quantity: 5 } });
    expect(next.items[0].quantity).toBe(1);
  });

  it("CLEAR vacía el carrito", () => {
    const state = { items: [{ id: "1", name: "Test", price: 10, quantity: 1, emoji: "📦" }] };
    const next = cartReducer(state, { type: "CLEAR" });
    expect(next.items).toHaveLength(0);
  });

  it("UPDATE_QTY con quantity 0 mantiene el item", () => {
    const state = { items: [{ id: "1", name: "Test", price: 10, quantity: 1, emoji: "📦" }] };
    const next = cartReducer(state, { type: "UPDATE_QTY", payload: { id: "1", quantity: 0 } });
    expect(next.items[0].quantity).toBe(0);
  });
});
