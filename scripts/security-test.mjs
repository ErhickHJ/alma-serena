// Security test suite — 11 pruebas contra la API en vivo
// Evalúa rate limiting, validación, auth, y headers de seguridad
// Uso: node scripts/security-test.mjs (o contra producción: BASE_URL=https://... node scripts/security-test.mjs)

const BASE = process.env.BASE_URL || "http://localhost:3000";

let passed = 0;
let failed = 0;

async function check(label, fn) {
  try {
    await fn();
    console.log(`  ✓ ${label}`);
    passed++;
  } catch (err) {
    console.log(`  ✗ ${label} — ${err.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || "assertion failed");
}

async function main() {
  console.log(`\n🔍 Security tests — ${BASE}\n`);

  await check("Home page returns 200", async () => {
    const res = await fetch(BASE);
    assert(res.status === 200, `status ${res.status}`);
  });

  await check("X-Content-Type-Options header present", async () => {
    const res = await fetch(BASE);
    assert(res.headers.get("x-content-type-options") === "nosniff");
  });

  await check("X-Frame-Options header present", async () => {
    const res = await fetch(BASE);
    assert(res.headers.get("x-frame-options") === "DENY");
  });

  await check("Referrer-Policy header present", async () => {
    const res = await fetch(BASE);
    assert(res.headers.get("referrer-policy") === "strict-origin-when-cross-origin");
  });

  await check("Content-Security-Policy header present", async () => {
    const res = await fetch(BASE);
    assert(res.headers.has("content-security-policy"), "missing CSP header");
  });

  await check("Admin route returns 403 for unauthorized IP", async () => {
    const res = await fetch(`${BASE}/admin/estadisticas`, {
      headers: { "x-forwarded-for": "1.2.3.4" },
      redirect: "manual",
    });
    assert(res.status === 403 || res.status === 307 || res.status === 302,
      `expected 403 or redirect, got ${res.status}`);
  });

  await check("API rate limit (3 requests to /api/contact)", async () => {
    const payload = { name: "test", email: "test@test.com", subject: "test", message: "x".repeat(10) };
    let lastStatus = 0;
    for (let i = 0; i < 5; i++) {
      const res = await fetch(`${BASE}/api/contact`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "10.0.0.99" },
        body: JSON.stringify(payload),
      });
      lastStatus = res.status;
    }
    assert(lastStatus === 429, `expected 429 after 5 rapid requests, got ${lastStatus}`);
  });

  await check("API input validation rejects long message", async () => {
    const res = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "test", email: "test@test.com", subject: "test", message: "x".repeat(2000) }),
    });
    assert(res.status === 400, `expected 400 for long message, got ${res.status}`);
  });

  await check("Health endpoint responds", async () => {
    const res = await fetch(`${BASE}/api/health`);
    assert(res.status === 200, `status ${res.status}`);
    const data = await res.json();
    assert(typeof data.uptime === "number", "uptime missing");
    assert(typeof data.env === "object", "env check missing");
  });

  await check("Sitemap is valid XML", async () => {
    const res = await fetch(`${BASE}/sitemap.xml`);
    assert(res.status === 200, `status ${res.status}`);
    const text = await res.text();
    assert(text.includes("<urlset"), "missing urlset tag");
  });

  await check("robots.txt allows all", async () => {
    const res = await fetch(`${BASE}/robots.txt`);
    assert(res.status === 200, `status ${res.status}`);
    const text = await res.text();
    assert(text.includes("Allow: /"), "missing Allow: /");
  });

  console.log(`\n📊 Resultados: ${passed} pasaron, ${failed} fallaron de ${passed + failed}\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(`\n💥 Error fatal: ${err.message}`);
  process.exit(1);
});
