<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Alma Serena — Web App Completa

## Objective
Completar app web Alma Serena con panel admin, e-commerce, blog, seguridad e infraestructura de producción (Stripe pendiente de activar cuenta).

## Stack
- **Framework:** Next.js 16.2.10
- **Auth:** Clerk (@clerk/nextjs v7) — Show component, UserButton, SignInButton modal, SignUpButton, <SignIn> en /login, ClerkProvider en layout
- **DB:** Supabase PostgreSQL + Prisma v7 (@prisma/adapter-pg)
- **Email:** Resend
- **Payments:** Stripe (cuenta no activada)
- **CSS:** Tailwind v4 (@tailwindcss/postcss)
- **Testing:** Vitest + jsdom
- **CI:** GitHub Actions (lint + test)
- **Deploy:** Vercel (auto-deploy desde main)
- **Domain:** almaserenaoficial.com (A record 76.76.21.21, pendiente propagación)

## Database (Prisma — 7 modelos)
Archivo: `prisma/schema.prisma`

| Model | Key Fields | Uso |
|-------|-----------|-----|
| ContactMessage | id, name, email, subject, message, createdAt | Formulario de contacto |
| PartnerRequest | id, name, email, phone, website, message, createdAt | Solicitudes de socio |
| Order | id, clerkUserId, email, name, product, amount(cents), status, paymentId, createdAt, updatedAt | Pedidos (status: pending→processing→shipped→delivered/cancelled) |
| Subscriber | id, email(unique), name, createdAt | Suscriptores newsletter |
| Post | id, title, slug(unique), excerpt, content, author, published, imageUrl, createdAt, updatedAt | Blog |
| Product | id, name, price, image, emoji, category, desc, featured, createdAt, updatedAt | Tienda |
| AdminLog | id, userId, email, action, details, ip, createdAt | Auditoría admin |

Las tablas se crearon via Supabase SQL Editor. Migración baseline en `prisma/migrations/0000_baseline/`. DNS local impide `prisma db push` pero la app funciona en runtime.

## Variables de Entorno (Vercel)
- `DATABASE_URL` — Supabase PostgreSQL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `ADMIN_EMAIL` / `ADMIN_ALLOWED_IPS` (190.166.123.202)
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` etc.

## Admin
- Login email: `erhicksonhernandez@gmail.com` (Clerk user, publicMetadata.role="admin")
- IP whitelist via middleware (`src/proxy.ts`) — solo IPs en ADMIN_ALLOWED_IPS acceden a /admin/*
- Rate limit: 30 req/min en todas las rutas /api/admin/*
- Auditoría: cada acción admin se registra en AdminLog
- AdminLink component: solo visible si el usuario tiene role=admin

## Seguridad
- **Middleware** (`src/proxy.ts`): Clerk auth + IP whitelist + CSP headers + X-Content-Type-Options + X-Frame-Options + Referrer-Policy
- **Rate limiting** (`src/lib/rate-limit.ts`): Map-based, 5 req/min subscribe, 3 req/min contact/partners, 30 req/min admin
- **Input validation**: trim, max length, email format, Content-Type detection
- **Webhook Stripe**: signature verification
- **Security test script**: `scripts/security-test.mjs` (11 tests)
- **Tests unitarios**: `tests/rate-limit.test.ts`, `tests/admin.test.ts`

## API Routes
| Ruta | Método | Uso |
|------|--------|-----|
| /api/health | GET | Health check |
| /api/subscribe | POST | Newsletter (email + Resend welcome) |
| /api/contact | POST | Contacto (crea ContactMessage + notify email) |
| /api/partners | POST | Solicitud socio |
| /api/create-checkout | POST | Stripe checkout (crea Order pendiente) |
| /api/webhook | POST | Stripe webhook (actualiza Order a completed) — NO FUNCIONAL (cuenta no activada) |
| /api/checkout | POST | Legacy checkout (form-data) |
| /api/set-admin | POST | Dev: asigna role admin a usuario Clerk |
| /api/admin/products | GET/POST/PUT | CRUD productos (admin+rate limit+audit) |
| /api/admin/posts | POST/PUT | CRUD blog (admin+rate limit+audit) |
| /api/admin/orders | PATCH | Actualizar estado pedido |
| /api/admin/delete | DELETE | Borrar recurso (type: order/contact/subscriber/post/product) |

## Pages (Rutas públicas)
- `/` — Homepage (Hero, About, Store preview, Community, Testimonials, Newsletter)
- `/libro` — Landing del libro (13 semanas, features)
- `/tienda` — Tienda (productos desde DB, 4 categorías)
- `/blog` — Blog (posts publicados, búsqueda, paginación)
- `/blog/[slug]` — Artículo individual
- `/carrito` — Carrito (useReducer + localStorage)
- `/checkout` — Checkout (formulario + Stripe redirect)
- `/comunidad` — Comunidad
- `/contacto` — Formulario de contacto
- `/partners` — Directorio + formulario socios
- `/perfil` — Perfil usuario (historial pedidos)
- `/faq`, `/terminos`, `/aviso-privacidad` — Páginas legales
- `/login`, `/sign-in`, `/sign-up` — Auth
- `/error`, `/not-found`, `/loading` — Estados sistema

## Admin Pages (/admin/*)
- `/admin/estadisticas` — Dashboard (8 tarjetas métricas)
- `/admin/pedidos` — Pedidos (búsqueda, StatusSelect, DeleteButton, paginación)
- `/admin/productos` — CRUD productos (listado, editar, nuevo)
- `/admin/productos/[id]` — Editar producto (ProductForm)
- `/admin/productos/nuevo` — Nuevo producto (ProductForm)
- `/admin/contactos` — Mensajes de contacto
- `/admin/suscriptores` — Suscriptores newsletter
- `/admin/blog` — CRUD blog (listado, editar, nuevo)
- `/admin/blog/[id]` — Editar artículo (PostForm)
- `/admin/blog/nuevo` — Nuevo artículo (PostForm)
- `/admin/log` — Registro de auditoría (50 por página)

## Componentes Clave (src/components/)
- AddToCartButton, BuyNowButton, CartButton — Carrito
- Carousel — Productos destacados (auto-rotate 5s)
- DeleteButton — Borrado admin con confirmación
- StatusSelect — Selector de estado de pedido
- Pagination — Paginación reutilizable
- NewsletterForm, SubscribeForm, PartnerForm — Formularios
- AdminLink — Link admin visible solo para admins
- SectionTitle, DecorativeDivider — Elementos decorativos

## Context (src/context/)
- CartContext — useReducer + localStorage (addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice)
- ToastContext — Notificaciones success/error/info (auto-dismiss 3s)

## Email (src/lib/email.ts con Resend)
- sendOrderConfirmation — Confirmación de pedido
- notifyNewContact — Notificación nuevo contacto
- sendWelcomeSubscriber — Bienvenida suscriptor
- notifySecurityAlert — Alerta de seguridad (intrusión IP)

## Scripts
- `scripts/seed-products.mjs` — Seed 16 productos iniciales
- `scripts/backup-db.mjs` — Backup de todas las tablas a JSON
- `scripts/security-test.mjs` — 11 tests de seguridad (requiere servidor corriendo)

## SEO & Assets
- sitemap.xml dinámico (src/app/sitemap.ts) — dominio almaserenaoficial.com
- robots.txt dinámico (deshabilita /admin/, /api/, /perfil)
- OG tags en layout
- Imágenes en /public/images/ (portada, contraportada, diarios)
- next.config.ts — image optimization (AVIF/WebP, deviceSizes, remotePatterns para img.clerk.com y images.unsplash.com)

## Estado del Proyecto
- **Completado:** Auth Clerk + roles admin, DB Supabase (7 tablas), todas las API routes, blog (listado/detalle/admin CRUD con paginación+búsqueda), CRUD productos desde DB, gestión pedidos con workflow estados, admin completo (pedidos, contactos, suscriptores, blog, log, productos, estadísticas con paginación/búsqueda), perfil usuario, Resend email (4 templates), SEO (sitemap, robots, OG, title), páginas legales, testimonios, seguridad (rate limiting, IP whitelist, CSP, email alerts, auditoría, input validation, health endpoint, security test), 404/error/loading pages, GitHub + auto-deploy Vercel, Prisma migration baseline, newsletter form con handler, toast feedback en carrito, vitest tests, CI workflow, backup script, accesibilidad (aria-labels), dominio configurado
- **Bloqueado:** Stripe account no activada — webhook y pagos reales no funcionales
- **Nuevo:** src/app/admin/save.tsx creado (ProductForm + PostForm) — faltaba y causaba error en páginas de crear/editar productos y posts

## Próximos Pasos
1. Activar cuenta Stripe, luego agregar STRIPE_WEBHOOK_SECRET real a Vercel
2. Esperar propagación DNS de almaserenaoficial.com
3. Pruebas de integración más completas
