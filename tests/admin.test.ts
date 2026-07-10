import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { isAdmin, isAdminEmail, isAllowedIP } from "../src/lib/admin";

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

  it("compara case-insensitive", () => {
    process.env.ADMIN_EMAIL = "Admin@Test.Com";
    expect(isAdminEmail("admin@test.com")).toBe(true);
  });
});

describe("isAllowedIP", () => {
  const original = process.env.ADMIN_ALLOWED_IPS;

  beforeAll(() => {
    process.env.ADMIN_ALLOWED_IPS = "192.168.1.1, 10.0.0.1, 172.16.0.1";
  });

  afterEach(() => {
    process.env.ADMIN_ALLOWED_IPS = "192.168.1.1, 10.0.0.1, 172.16.0.1";
  });

  afterAll(() => {
    process.env.ADMIN_ALLOWED_IPS = original;
  });

  it("permite IP que está en la lista", () => {
    expect(isAllowedIP("192.168.1.1")).toBe(true);
  });

  it("permite IP con espacios en la lista", () => {
    expect(isAllowedIP("10.0.0.1")).toBe(true);
  });

  it("bloquea IP que no está en la lista", () => {
    expect(isAllowedIP("192.168.1.100")).toBe(false);
  });

  it("permite cualquier IP si ADMIN_ALLOWED_IPS está vacío", () => {
    process.env.ADMIN_ALLOWED_IPS = "";
    expect(isAllowedIP("1.2.3.4")).toBe(true);
  });

  it("permite cualquier IP si ADMIN_ALLOWED_IPS no está definido", () => {
    delete process.env.ADMIN_ALLOWED_IPS;
    expect(isAllowedIP("1.2.3.4")).toBe(true);
  });

  it("retorna false si la IP es null o undefined", () => {
    expect(isAllowedIP(null)).toBe(false);
    expect(isAllowedIP(undefined)).toBe(false);
  });
});
