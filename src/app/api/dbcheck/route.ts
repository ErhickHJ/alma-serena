import { NextResponse } from "next/server";

export async function GET() {
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
    let host = url.hostname;
    try {
      const { resolve4, resolve6 } = await import("dns/promises");
      try {
        const v4 = await resolve4(host);
        if (v4.length) host = v4[0];
      } catch {
        const v6 = await resolve6(host);
        if (v6.length) host = v6[0];
      }
    } catch { /* keep hostname */ }
    errors.push(`Resolved host: ${host}`);

    const { Pool } = await import("pg");
    const pool = new Pool({
      host,
      port: Number(url.port) || 5432,
      database: url.pathname.slice(1),
      user: url.username,
      password: url.password,
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
