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

export async function listProducts(locale: Locale): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  const items = rows.map(rowToProduct);
  return locale === "pt" ? items.map(withPtOverlay) : items;
}

export async function getProduct(
  locale: Locale,
  slug: string,
): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  if (!row) return null;
  const p = rowToProduct(row);
  return locale === "pt" ? withPtOverlay(p) : p;
}

export async function listProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}