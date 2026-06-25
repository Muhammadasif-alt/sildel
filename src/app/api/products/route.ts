/**
 * /api/products — GET list (public). Reads via the products-source adapter,
 * which itself falls back to static treasures if the DB is unreachable.
 */
import { NextResponse } from "next/server";
import { listProducts } from "@/lib/db/products-source";
import { fromCategoryEnum } from "@/lib/db/product-category";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryFilter = searchParams.get("category");

  const all = await listProducts("en");
  const products = categoryFilter
    ? all.filter(
        (p) => p.category === fromCategoryEnum(categoryFilter as never),
      )
    : all;
  return NextResponse.json({ products, count: products.length });
}