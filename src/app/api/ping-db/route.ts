import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const session = await auth();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    return NextResponse.json({ success: false, error: "DATABASE_URL not set" }, { status: 500 });
  }

  try {
    const { Pool } = await import("pg");
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 8000,
    });
    const client = await pool.connect();
    const res = await client.query("SELECT 1 AS ok");
    client.release();
    await pool.end();
    return NextResponse.json({ success: true, ok: res.rows[0].ok, ts: new Date().toISOString() });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Unknown" }, { status: 503 });
  }
}
