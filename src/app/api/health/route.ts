export const runtime = "nodejs";

export async function GET() {
  const required = ["DATABASE_URL", "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"];
  const missing = required.filter((k) => !process.env[k]);

  const healthy = missing.length === 0;

  return Response.json(
    {
      status: healthy ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      checks: { env: missing.length === 0 ? "ok" : `missing: ${missing.join(", ")}` },
    },
    { status: healthy ? 200 : 503 }
  );
}
