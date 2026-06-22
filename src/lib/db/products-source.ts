/**
 * Adapter — Prisma rows → the static `Product` shape the frontend already
 * speaks. This lets pages and components keep their existing types
 * (`Product`, the same fields, the same gallery/longDescription arrays)
 * while reading live from MySQL.
 *
 * Translations stay in the static PRODUCT_TEXT_PT overlay in
 * /content/treasures.ts — translations rarely change and the founder
 * doesn't edit them from admin, so there's no reason to make them
 * load-bearing on the DB. We just merge the overlay on top of each
 * Prisma row when the locale is pt.
 *
 * Use server-side only. Wrap the page handler in `revalidate = 3600`
 * (default in our marketing pages) so reads are amortised hourly.
 */
import "server-only";
import { prisma } from "@/lib/db/prisma";
import { fromCategoryEnum } from "@/lib/db/product-category";
import type { Locale } from "@/lib/i18n/config";
import {
  type Product,
  PRODUCT_TEXT_PT,
  products as fallbackProducts,
} from "@/content/treasures";

function rowToProduct(
  row: Awaited<ReturnType<typeof prisma.product.findMany>>[number],
): Product {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    category: fromCategoryEnum(row.category),
    priceCents: row.priceCents,
    currency: row.currency as "EUR",
    badge: row.badge ?? undefined,
    material: row.material ?? undefined,
    description: row.description,
    longDescription: (row.longDescription as string[]) ?? [],
    image: row.image,
    gallery: (row.gallery as string[]) ?? [],
  };
}

function withPtOverlay(p: Product): Product {
  const overlay = PRODUCT_TEXT_PT[p.slug];
  if (!overlay) return p;
  return { ...p, ...overlay };
}

/**
 * Each of these wrappers tries MySQL first and silently falls back to the
 * static `products` list in `/content/treasures.ts` on any failure.
 *
 * This keeps the marketing pages renderable even when:
 *   - DATABASE_URL is not set (Vercel build before the env was configured),
 *   - MySQL is unreachable (cPanel db not yet provisioned), or
 *   - the products table is empty (fresh deploy before `npm run db:seed`).
 *
 * Mirrors the same fallback pattern used in `/lib/content/blog.ts`.
 */

export async function listProducts(locale: Locale): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    if (rows.length === 0) {
      return locale === "pt"
        ? fallbackProducts.map(withPtOverlay)
        : fallbackProducts;
    }
    const items = rows.map(rowToProduct);
    return locale === "pt" ? items.map(withPtOverlay) : items;
  } catch {
    return locale === "pt"
      ? fallbackProducts.map(withPtOverlay)
      : fallbackProducts;
  }
}

export async function getProduct(
  locale: Locale,
  slug: string,
): Promise<Product | null> {
  try {
    const row = await prisma.product.findUnique({ where: { slug } });
    if (row) {
      const p = rowToProduct(row);
      return locale === "pt" ? withPtOverlay(p) : p;
    }
  } catch {
    // fall through to static lookup
  }
  const p = fallbackProducts.find((x) => x.slug === slug);
  if (!p) return null;
  return locale === "pt" ? withPtOverlay(p) : p;
}

export async function listProductSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.product.findMany({ select: { slug: true } });
    if (rows.length > 0) return rows.map((r) => r.slug);
  } catch {
    // fall through to static slugs
  }
  return fallbackProducts.map((p) => p.slug);
}