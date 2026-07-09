// Middleware global (Clerk + seguridad)
// 1. Protege /admin con whitelist de IPs
// 2. Agrega headers de seguridad (CSP, X-Frame-Options, etc.)
// 3. Clerk auth para todas las rutas protegidas

import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isAllowedIP } from "@/lib/admin";
import { notifySecurityAlert } from "@/lib/email";

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "127.0.0.1";
    if (!isAllowedIP(ip)) {
      notifySecurityAlert("IP no autorizada", `Intento de acceso a ${pathname} desde IP: ${ip}`);
      return new NextResponse("Acceso denegado", { status: 403 });
    }
  }

  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://clerk.accounts.dev https://js.stripe.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://img.clerk.com",
      "frame-src https://clerk.accounts.dev https://js.stripe.com",
      "connect-src 'self' https://api.stripe.com",
      "font-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );
  return res;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
