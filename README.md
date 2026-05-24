# Sildel — Project Structure

This is the source code for the Sildel website redesign. It's a **single
Next.js project** that holds everything: the customer-facing website, the
API (when we build it), and the admin dashboard (when we build it). They
all live together because Next.js is a full-stack framework — one app,
one deploy, one place to look.

```
sildel/
├── src/
│   ├── app/         →  All pages and (later) API routes
│   │   ├── (marketing)/   →  Public pages (Home, Treasures, Our Story...)
│   │   ├── cart/          →  Shopping cart page
│   │   ├── checkout/      →  Checkout + payment page
│   │   ├── account/       →  Customer account page (stub)
│   │   ├── api/           →  (Future) API routes — checkout, webhooks, orders
│   │   └── admin/         →  (Future) Admin dashboard (protected)
│   ├── components/  →  Reusable UI blocks (header, footer, cards...)
│   ├── content/     →  All page text and product data
│   └── lib/         →  Helpers (SEO, Redux store, site config)
│
├── public/          →  Static files (images, logo)
├── package.json     →  One package.json for the whole project
├── next.config.ts   →  Next.js config
├── tsconfig.json    →  TypeScript config (@/* maps to src/*)
├── README.md        →  This file
├── CLAUDE.md        →  Project rules for AI coding assistants
└── AGENTS.md        →  Notes about the Next.js version we use
```

---

## How to run it

```bash
npm install        # only the first time
npm run dev        # start the dev server
```

Open `http://localhost:3000` in a browser.

---

## What's in each part

### `src/app/(marketing)/`  →  The customer-facing website

The pages visitors see: Home, Our Story, Authentic Cork, You Think Cork,
Treasures (shop), individual product pages.

- Built with **Next.js + React + Tailwind CSS + Redux Toolkit**
- Product images live in `public/images/`
- Product data lives in `src/content/treasures.ts`

### `src/app/cart/` + `src/app/checkout/`

The shopping cart and checkout pages. Cart state is in Redux + saved to
`localStorage`. The checkout UI is built but the payment is **simulated**
(no real charge yet — see "What's still needed" below).

### `src/app/api/`  →  The backend (to be built)

When we add real e-commerce, the API code goes here as **route handlers**:

- `POST /api/checkout` — receive order, create Stripe Checkout session
- `POST /api/webhooks/stripe` — confirm payment, save order, send email
- `GET /api/products` — serve products from DB (today they're static)
- `GET /api/orders` — for the admin panel

This folder doesn't exist yet. When you're ready, create
`src/app/api/checkout/route.ts` and start there.

### `src/app/admin/`  →  The admin dashboard (to be built)

A protected section of the same site (only the Sildel team can log in)
where the studio manages products and orders. Doesn't exist yet.

---

## How it all fits together

```
Customer (browser)
       │
       ▼
┌────────────────────────────────────┐
│  Same Next.js app                  │
│  ┌──────────────────────────────┐  │
│  │  src/app/(marketing)/        │  │  ← what customers see
│  │  src/app/cart/, checkout/    │  │
│  └──────────────────────────────┘  │
│              ▲                     │
│              │ fetch /api/...      │
│              ▼                     │
│  ┌──────────────────────────────┐  │
│  │  src/app/api/                │  │  ← server-side API
│  │  (Stripe, DB, email)         │  │
│  └──────────────────────────────┘  │
│              ▲                     │
│              │ same API            │
│              ▼                     │
│  ┌──────────────────────────────┐  │
│  │  src/app/admin/              │  │  ← Sildel team only (protected)
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

Everything is **one Next.js app**. No separate servers. One `npm run dev`
runs the whole thing. One `vercel deploy` ships everything.

---

## Status today

| Part | What's done | What's still needed |
|---|---|---|
| **Public site** | All 17 pages live, theme toggle, cart, checkout UI, full SEO | — |
| **API (`/api`)** | Nothing yet | Stripe checkout + webhook, products endpoint, orders endpoint |
| **Admin (`/admin`)** | Nothing yet | Login (NextAuth), product editor, order list |
| **Database** | Nothing yet | Pick host (Supabase / Neon), design schema |
| **Payments** | Simulated only | Stripe Checkout |
| **Emails** | None | Resend for confirmations |

---

## Common things you might want to change

| What | Where |
|---|---|
| Add or edit a product | `src/content/treasures.ts` |
| Change homepage copy | `src/content/home.ts` |
| Change navigation links | `src/lib/site-config.ts` |
| Change brand colours | `src/app/globals.css` (the `:root` and `.dark` blocks) |
| Add a new page | Create a folder under `src/app/` with `page.tsx` |
| Add a product image | Drop into `public/images/treasures/`, then update `src/content/treasures.ts` |

---

## Notes

- The cart and theme preferences are stored in the browser's `localStorage`,
  so they survive page reloads.
- Path alias `@/*` resolves to `src/*` (see `tsconfig.json`). So
  `import { Button } from "@/components/ui/button"` reads from
  `src/components/ui/button.tsx`.
