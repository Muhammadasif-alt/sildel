/**
 * /api/products/[slug] — public read-only. Admin mutations go through the
 * server actions at /admin/products/* instead.
 */
import { NextResponse } from "next/server";
import { getProduct } from "@/lib/db/products-source";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  const { slug } = await params;
  const product = await getProduct("en", slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}