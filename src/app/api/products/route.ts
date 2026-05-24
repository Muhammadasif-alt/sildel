/**
 * /api/products
 *   GET  → list all products (public)
 *   POST → create a product (TODO: protect with admin auth)
 */
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { ProductModel } from "@/lib/models/product.model";

export async function GET(req: Request) {
  await connectDb();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const inStockOnly = searchParams.get("inStock") === "true";

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (inStockOnly) filter.inStock = true;

  const products = await ProductModel.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ products, count: products.length });
}

export async function POST(req: Request) {
  // TODO: require admin authentication before allowing product creation.
  await connectDb();

  try {
    const body = await req.json();
    const product = await ProductModel.create(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not create product" },
      { status: 400 }
    );
  }
}
