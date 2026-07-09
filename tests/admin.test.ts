import { describe, it, expect } from "vitest";
import { isAdmin, isAdminEmail } from "../src/lib/admin";

describe("isAdmin", () => {
  it("devuelve true si role es admin", () => {
    expect(isAdmin({ role: "admin" })).toBe(true);
  });

  it("devuelve false si role no es admin", () => {
    expect(isAdmin({ role: "user" })).toBe(false);
  });

  it("devuelve false si metadata es null", () => {
    expect(isAdmin(null)).toBe(false);
  });

  it("devuelve false si metadata es undefined", () => {
    expect(isAdmin(undefined)).toBe(false);
  });
});

describe("isAdminEmail", () => {
  const original = process.env.ADMIN_EMAIL;
  afterEach(() => {
    process.env.ADMIN_EMAIL = original;
  });

  it("devuelve true si el email coincide", () => {
    process.env.ADMIN_EMAIL = "admin@test.com";
    expect(isAdminEmail("admin@test.com")).toBe(true);
  });

  it("devuelve false si no coincide", () => {
    process.env.ADMIN_EMAIL = "admin@test.com";
    expect(isAdminEmail("otro@test.com")).toBe(false);
  });

  it("devuelve false si ADMIN_EMAIL no está definido", () => {
    delete process.env.ADMIN_EMAIL;
    expect(isAdminEmail("admin@test.com")).toBe(false);
  });
});
