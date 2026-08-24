import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
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
        ip: req.headers.get("x-forwarded-for") || "",
      },
    });
  } catch {
    // CSP report logging failure shouldn't break anything
  }

  return new NextResponse(null, { status: 204 });
}
