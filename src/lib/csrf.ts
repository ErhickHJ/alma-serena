const CSRF_COOKIE = "__Host-csrf-token";
const CSRF_HEADER = "x-csrf-token";

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getCsrfCookie(headers: Headers): string | null {
  const cookie = headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${CSRF_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function validateCsrf(req: Request): boolean {
  const cookieToken = getCsrfCookie(req.headers);
  const headerToken = req.headers.get(CSRF_HEADER);
  if (!cookieToken || !headerToken) return false;
  if (cookieToken.length !== 64 || headerToken.length !== 64) return false;
  return cookieToken === headerToken;
}

export function setCsrfCookie(res: Response): void {
  const token = generateToken();
  res.headers.set(
    "Set-Cookie",
    `${CSRF_COOKIE}=${token}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=7200`,
  );
}

export function createCsrfResponse(): Response {
  const res = Response.json({ csrfToken: generateToken() });
  setCsrfCookie(res);
  return res;
}