// Auditoría — Registra cada acción de administradores en la tabla AdminLog
// El catch silencioso evita que un fallo de logging rompa la operación principal

import { prisma } from "./db";

export async function logAdminAction(opts: {
  userId: string;
  email?: string;
  action: string;
  details?: string;
  ip?: string;
}) {
  try {
    await prisma.adminLog.create({
      data: {
        userId: opts.userId,
        email: opts.email || "",
        action: opts.action,
        details: opts.details || "",
        ip: opts.ip || "",
      },
    });
  } catch {
    // Logging failure shouldn't break the main flow
  }
}
