import { site } from "./site";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://alma-serena.vercel.app",
  "https://alma-serena-iota.vercel.app",
  "https://almaserenaoficial.com",
  "https://www.almaserenaoficial.com",
];

export function validateOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const source = origin || referer;
  if (!source) return false;
  try {
    const url = new URL(source);
    const allowed = ALLOWED_ORIGINS.some((o) => {
      const allowedUrl = new URL(o);
      return url.hostname === allowedUrl.hostname && url.protocol === allowedUrl.protocol;
    });
    return allowed;
  } catch {
    return false;
  }
}

export function checkHoneypot(form: URLSearchParams | Record<string, unknown>): boolean {
  const hp = typeof form === "object" && "entries" in form
    ? (form as URLSearchParams).get("_hp")
    : (form as Record<string, unknown>)._hp;
  return hp === "" || hp === undefined;
}