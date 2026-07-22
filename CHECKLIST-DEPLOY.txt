# Checklist de Despliegue — Alma Serena

Checklist basado en errores reales que tuvimos, para evitar repetirlos en futuros proyectos.

---

## 1. Setup Inicial

- [ ] `npx create-next-app@latest` con TypeScript, Tailwind, App Router
- [ ] Configurar `next.config.ts` (images, rewrites si aplica)
- [ ] Crear `.env.local` con TODAS las variables desde el día 1
- [ ] `git init && git add -A && git commit -m "init"`
- [ ] Repo en GitHub, push inicial

## 2. Base de Datos

- [ ] Crear schema en Supabase / Neon / Railway
- [ ] `prisma db push` o migración inicial
- [ ] Probar conexión desde local con `DATABASE_URL`
- [ ] **Lección:** Si el DNS local impide conectar, hacer `prisma db push` vía Supabase SQL Editor en vez de CLI
- [ ] **Lección:** Las páginas estáticas (SSG) fallan en build si no hay DB — usar `ƒ` (dynamic) o fallback data

## 3. Variables de Entorno

- [ ] Setear TODAS en Vercel **antes** del primer deploy
- [ ] `NEXT_PUBLIC_*` para variables del cliente
- [ ] Sin `*` para variables del servidor
- [ ] **Lección:** Si olvidas una variable, el build pasa pero la feature falla en runtime

## 4. Auth (Clerk)

- [ ] Crear app en Clerk Dashboard
- [ ] Configurar OAuth (Google, Apple, etc.)
  - Redirect URI: `https://{CLERK_FRONTEND_API}/v1/oauth_callback`
- [ ] Setear `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`
- [ ] Envolver layout con `<ClerkProvider>`
- [ ] Probar login local y en preview de Vercel
- [ ] **Lección:** Google OAuth requiere redirect URI exacto — revisar en Google Cloud Console

## 5. SEO y Metadatos

- [ ] `metadataBase` en layout con URL canónica (`https://tudominio.com`)
- [ ] `title` con template
- [ ] `description`, `keywords`, `openGraph`, `twitter`
- [ ] `robots.txt` dinámico (deshabilitar /admin/, /api/)
- [ ] `sitemap.xml` dinámico
- [ ] Favicon (`/favicon.ico`)
- [ ] `manifest.json` para PWA
- [ ] **Lección:** `themeColor` va en `export const viewport`, NO en `metadata` (Next.js 16+)

## 6. Google Analytics

- [ ] Crear propiedad GA4, obtener ID `G-XXXXXXXXXX`
- [ ] Setear `NEXT_PUBLIC_GA_ID` en Vercel
- [ ] Usar `<Script>` de `next/script` con `strategy="afterInteractive"`
- [ ] **NO** inyectar con `document.createElement` — Google Tag Assistant NO lo detecta
- [ ] **NO** poner detrás de consentimiento de cookies — la etiqueta debe cargar siempre
- [ ] El banner de cookies debe ser informativo, no un gate

## 7. Dominio y DNS

- [ ] Comprar dominio
- [ ] En Vercel: Project Settings → Domains → agregar dominio
- [ ] DNS: A record apuntando a `76.76.21.21` (Vercel)
- [ ] Opcional: CNAME `www` → `cname.vercel-dns.com`
- [ ] Esperar propagación (5 min — 48 h)
- [ ] **Lección:** No usar `clerk.tudominio.com` como redirect de OAuth si el subdominio no está configurado en Clerk

## 8. Stripe

- [ ] Crear cuenta Stripe
- [ ] **Activar la cuenta** — sin activación, los webhooks NO funcionan
- [ ] Setear `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Configurar webhook en Stripe Dashboard apuntando a `https://tudominio.com/api/webhook`
- [ ] Obtener `STRIPE_WEBHOOK_SECRET` y setearlo en Vercel
- [ ] **Lección:** Stripe no activada = pagos rotos. Este paso no se puede saltar.

## 9. Seguridad

- [ ] CSP headers en middleware (`src/proxy.ts` o `middleware.ts`)
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Strict-Transport-Security: max-age=63072000`
- [ ] Rate limiting en rutas sensibles (login, contacto, admin)
- [ ] IP whitelist para `/admin/*`
- [ ] Validación de input (trim, max length, email format)
- [ ] Auditoría de acciones admin
- [ ] **Lección:** Las rutas `/api/debug-db`, `/api/set-admin` deben requerir auth + admin — cualquiera puede llamarlas

## 10. Traducciones (i18n)

- [ ] Usar `React.createContext` + provider
- [ ] Keys en inglés en los objetos de traducción
- [ ] Hook `useT()` dentro del provider, no fuera
- [ ] **Lección:** Si pones `t()` fuera del provider (e.g., en metadatos), el contexto no existe → error
- [ ] **Lección:** `LanguageSwitcher` debe tener `export default`, no `export const`

## 11. Build

- [ ] Probar `npm run build` local antes de pushear
- [ ] Revisar warnings de deprecación
- [ ] **Lección:** `JSX.Element[]` no existe en React 19 — usar `ReactElement[]` o `ReactNode`
- [ ] **Lección:** Errores de DB en build son esperables si las páginas son dinámicas (ƒ)
- [ ] **Lección:** Los `loading.tsx` deben existir para rutas con `generateStaticParams`

## 12. Deploy

- [ ] Push a `main` → auto-deploy en Vercel
- [ ] Revisar logs del deploy en Vercel Dashboard
- [ ] Probar:
  - [ ] Login / Register
  - [ ] Tienda (productos desde DB)
  - [ ] Blog (posts con imágenes)
  - [ ] Carrito / Checkout
  - [ ] Admin (cada sección)
  - [ ] Contacto / Newsletter
  - [ ] Traducciones EN/ES
- [ ] Verificar Google Tag Assistant detecta GA4
- [ ] Verificar sitemap.xml y robots.txt accesibles

## 13. Post-Deploy

- [ ] Activar Stripe (si no se hizo antes)
- [ ] Configurar Google Search Console
- [ ] Configurar Google Analytics (verificar data streaming)
- [ ] Configurar emails transaccionales (Resend, SendGrid, etc.)
- [ ] Crear canal de YouTube si aplica (restricción 30 días en Workspace nuevos)

---

## Errores Comunes Resumidos

| Error | Causa | Solución |
|-------|-------|----------|
| `Unsupported metadata themeColor` | Next.js 16+ lo movió a viewport | Usar `export const viewport: Viewport = { themeColor }` |
| `JSX.Element[] not assignable` | React 19 cambió tipos | Usar `ReactElement[]` o `ReactNode` |
| `t() is not a function` | Llamar `t()` fuera del provider | Usar hook dentro del provider o pasar `t` como prop |
| GA4 no detectado | Script inyectado con JS dinámico | Usar `<Script>` de `next/script` |
| `Can't reach database server` en build | DNS local no resuelve, o build local sin DB | Usar fallback data o páginas dinámicas (ƒ) |
| Webhook Stripe no funciona | Cuenta Stripe no activada | Ir a Stripe Dashboard y completar activación |
| Admin routes accesibles sin auth | Faltaba verificación en API routes | Agregar `auth()` + `isAdminEmail()` antes de cualquier operación |
| OAuth redirect mismatch | URL incorrecta en Google Cloud Console | Revisar redirect URI exacta |
| `export default` vs `export const` | LanguageSwitcher mal exportado | Usar `export default function` |
