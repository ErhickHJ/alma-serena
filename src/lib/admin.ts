// Utilidades de verificación de administradores
// isAdmin: verifica rol en publicMetadata de Clerk
// isAdminEmail: compara email (legacy)
// isAllowedIP: control de IP para la whitelist

export function isAdmin(metadata: { role?: unknown } | null | undefined): boolean {
  return metadata?.role === "admin";
}

export function isAdminEmail(email: string | null | undefined): boolean {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
  if (!email || !ADMIN_EMAIL) return false;
  const admins = ADMIN_EMAIL.split(",").map(s => s.trim().toLowerCase());
  return admins.includes(email.toLowerCase());
}

export function isAllowedIP(ip: string | null): boolean {
  if (!ip) return false;
  const allowed = process.env.ADMIN_ALLOWED_IPS || "";
  if (!allowed) return true;
  return allowed.split(",").map(s => s.trim()).includes(ip);
}

