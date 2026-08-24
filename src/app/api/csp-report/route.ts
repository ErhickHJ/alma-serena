import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = await rateLimit(`csp:${ip}`, { limit: 20, windowMs: 60000 });
  if (!rl.allowed) return new NextResponse(null, { status: 429 });

  try {
    const body = await req.json();
    const violation = body["csp-report"] || body;

    const details = JSON.stringify({
      violatedDirective: violation["violated-directive"] || "",
      blockedURI: violation["blocked-uri"] || "",
      originalPolicy: violation["original-policy"] || "",
      documentURI: violation["document-uri"] || "",
      sourceFile: violation["source-file"] || "",
      lineNumber: violation["line-number"] || "",
      timestamp: new Date().toISOString(),
    });

    await prisma.adminLog.create({
      data: {
        userId: "csp-report",
        action: "csp_violation",
        details,
        ip,
      },
    });
  } catch {
    // CSP report logging failure shouldn't break anything
  }

  return new NextResponse(null, { status: 204 });
}
