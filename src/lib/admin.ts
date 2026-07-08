export function isAdmin(metadata: { role?: unknown } | null | undefined): boolean {
  return metadata?.role === "admin";
}

export function isAdminEmail(email: string | null | undefined): boolean {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
  if (!email || !ADMIN_EMAIL) return false;
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export function isAllowedIP(ip: string | null): boolean {
  if (!ip) return false;
  const allowed = process.env.ADMIN_ALLOWED_IPS || "";
  if (!allowed) return true;
  return allowed.split(",").map(s => s.trim()).includes(ip);
}

