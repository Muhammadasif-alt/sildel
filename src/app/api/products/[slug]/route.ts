/**
 * /api/products/[slug]
 *   GET    → fetch a single product (public)
 *   PATCH  → update a product (TODO: protect with admin auth)
 *   DELETE → delete a product (TODO: protect with admin auth)
 */
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { ProductModel } from "@/lib/models/product.model";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  await connectDb();
  const { slug } = await params;
  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(req: Request, { params }: RouteContext) {
  // TODO: require admin authentication.
  await connectDb();
  const { slug } = await params;
  try {
    const body = await req.json();
    const product = await ProductModel.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not update product" },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  // TODO: require admin authentication.
  await connectDb();
  const { slug } = await params;
  const result = await ProductModel.findOneAndDelete({ slug }).lean();
  if (!result) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ deleted: true, slug });
}
