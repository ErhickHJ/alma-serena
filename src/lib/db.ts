import { PrismaClient } from "@/generated/prisma/client";

let dbAvailable: boolean | null = null;
let _client: PrismaClient | null = null;

async function getClient(): Promise<PrismaClient | null> {
  if (dbAvailable === false) return null;
  if (_client) return _client;
  try {
    const { Pool } = await import("pg");
    const url = new URL(process.env.DATABASE_URL!);
    let host = url.hostname;
    try {
      const { resolve4 } = await import("dns/promises");
      const addrs = await resolve4(host);
      if (addrs.length) host = addrs[0];
    } catch { /* fallback to hostname */ }
    const pool = new Pool({
      host,
      port: Number(url.port) || 6543,
      database: url.pathname.slice(1),
      user: url.username,
      password: url.password,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 3000,
    });
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const adapter = new PrismaPg(pool);
    _client = new PrismaClient({ adapter });
    dbAvailable = true;
    return _client;
  } catch {
    dbAvailable = false;
    return null;
  }
}

async function exec(prop: string, method: string, args: unknown[]): Promise<unknown> {
  const client = dbAvailable === false ? null : await getClient();
  if (!client) {
    if (prop === "product" && method === "findMany") return [];
    if (prop === "post" && method === "findMany") return [];
    if (method === "count") return 0;
    if (method === "findUnique") return null;
    if (method === "create" || method === "update") return null;
    if (method === "aggregate") return { _sum: { amount: 0 }, _count: 0, _avg: {}, _min: {}, _max: {} } as never;
    return [];
  }
  try {
    const m = (client as unknown as Record<string, Record<string, (...a: unknown[]) => unknown>>)[prop];
    if (!m || typeof m[method] !== "function") return [];
    return await m[method](...args);
  } catch (e) {
    dbAvailable = false;
    console.warn("DB query failed, switching to offline mode:", (e as Error)?.message);
    return [];
  }
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    if (typeof prop !== "string") return undefined;
    return new Proxy({}, {
      get(__, method: string | symbol) {
        if (typeof method !== "string") return undefined;
        return (...args: unknown[]) => exec(prop, method, args);
      },
    });
  },
});
