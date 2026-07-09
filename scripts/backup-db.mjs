// Backup script — Exporta todas las tablas de Supabase a archivos JSON
// Uso: node scripts/backup-db.mjs
// Para respaldo automático: agregar a cron (diario/semanal)

import { PrismaClient } from "../src/generated/prisma/client/index.js";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();
const BACKUP_DIR = join(process.cwd(), "backups", new Date().toISOString().slice(0, 10));

async function main() {
  mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`Respaldando en: ${BACKUP_DIR}`);

  const tables = [
    ["contact-messages", () => prisma.contactMessage.findMany()],
    ["partner-requests", () => prisma.partnerRequest.findMany()],
    ["orders", () => prisma.order.findMany()],
    ["subscribers", () => prisma.subscriber.findMany()],
    ["posts", () => prisma.post.findMany()],
    ["admin-logs", () => prisma.adminLog.findMany()],
    ["products", () => prisma.product.findMany()],
  ] as const;

  for (const [name, query] of tables) {
    const data = await query();
    writeFileSync(join(BACKUP_DIR, `${name}.json`), JSON.stringify(data, null, 2));
    console.log(`  ✓ ${name} (${data.length} registros)`);
  }

  console.log(`\nBackup completado en: ${BACKUP_DIR}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Error en backup:", e);
  process.exit(1);
});
