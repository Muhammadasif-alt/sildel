# `src/app/api` — Sildel backend

Next.js route handlers. Each folder = one URL. Each `route.ts` exports the
HTTP methods it handles (`GET`, `POST`, `PATCH`, `DELETE`).

## Setup

1. Make sure MongoDB is reachable. See [`src/lib/db/README.md`](../../lib/db/README.md).
2. Copy `.env.local.example` → `.env.local`, fill in `MONGODB_URI`.
3. Seed initial products: `npx tsx scripts/seed.ts` (one-time).
4. `npm run dev`.
5. Sanity check: open http://localhost:3000/api/health.

## Endpoints

### Health

| Method | Path           | Auth | Description                       |
|--------|----------------|------|-----------------------------------|
| GET    | `/api/health`  | none | Verifies MongoDB connection       |

### Products

| Method | Path                       | Auth   | Description                          |
|--------|----------------------------|--------|--------------------------------------|
| GET    | `/api/products`            | none   | List all products (filters: `?category=Sculpture&inStock=true`) |
| POST   | `/api/products`            | admin* | Create a product                     |
| GET    | `/api/products/[slug]`     | none   | Fetch one product by slug            |
| PATCH  | `/api/products/[slug]`     | admin* | Update a product                     |
| DELETE | `/api/products/[slug]`     | admin* | Delete a product                     |

### Orders

| Method | Path                       | Auth   | Description                          |
|--------|----------------------------|--------|--------------------------------------|
| GET    | `/api/orders`              | admin* | List all orders (filters: `?status=paid&email=…`) |
| POST   | `/api/orders`              | none   | Create order (called by checkout)    |
| GET    | `/api/orders/[id]`         | none** | Fetch one order by orderNumber or _id |
| PATCH  | `/api/orders/[id]`         | admin* | Update order status / notes / paymentRef |

### Newsletter

| Method | Path               | Auth | Description                                 |
|--------|--------------------|------|---------------------------------------------|
| POST   | `/api/newsletter`  | none | Subscribe email — idempotent (upsert)       |

\* **admin** auth is marked with a `TODO` in each route — currently the
endpoints are open. Lock them down with NextAuth or a custom middleware
before going live.

\*\* Order detail should eventually require either the order's email or a
logged-in customer/admin to view — open for now.

## Example calls

```bash
# Subscribe to newsletter
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{ "email": "isabel@sildel.pt" }'

# Create an order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@example.com",
    "customer": { "firstName": "Maria", "lastName": "Santos", "phone": "+351 91 000 0000" },
    "shipping": { "country": "Portugal", "street": "Rua X, 12", "city": "Lisbon", "postcode": "1100-001" },
    "items": [{ "productSlug": "shell", "name": "Shell", "priceCents": 287500, "quantity": 1 }],
    "shippingCents": 0,
    "paymentMethod": "paypal"
  }'

# Fetch an order
curl http://localhost:3000/api/orders/SIL-2026-A7K9X3
```

## What's NOT here yet

- Stripe / Mollie / PayPal payment integration (TODO in checkout)
- Webhook receivers (`/api/webhooks/stripe`)
- Email sending (Resend) for order confirmations
- Auth (NextAuth) — admin lockdown of protected routes
- File uploads (product images) — currently expects external URLs
