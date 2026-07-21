import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  const session = await auth();
  if (!session.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const errors: string[] = [];
  const dbUrl = process.env.DATABASE_URL || "";
  errors.push(`DATABASE_URL exists: ${!!dbUrl}, length: ${dbUrl.length}`);

  if (dbUrl) {
    try {
      const url = new URL(dbUrl);
      errors.push(`Host: ${url.hostname}, Port: ${url.port}, DB: ${url.pathname.slice(1)}, User: ${url.username}`);
    } catch (e: any) {
      errors.push(`Invalid URL: ${e.message}`);
    }
  }

  try {
    const url = new URL(dbUrl);
    errors.push(`Hostname: ${url.hostname}`);

    const { Pool } = await import("pg");
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 8000,
    });
    const client = await pool.connect();
    const result = await client.query("SELECT NOW() as now, current_database() as db");
    errors.push(`DB connected: ${result.rows[0].now}, database: ${result.rows[0].db}`);
    client.release();
    await pool.end();
  } catch (e: any) {
    errors.push(`DB error: ${e.message}`);
  }

  return NextResponse.json({ diagnostics: errors });
}
