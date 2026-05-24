"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { ProductModel, PRODUCT_CATEGORIES } from "@/lib/models/product.model";

type Category = (typeof PRODUCT_CATEGORIES)[number];

function parseForm(form: FormData) {
  const slug = String(form.get("slug") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const tagline = String(form.get("tagline") ?? "").trim();
  const category = String(form.get("category") ?? "") as Category;
  const priceEuros = Number(form.get("priceEuros") ?? 0);
  const badge = String(form.get("badge") ?? "").trim();
  const material = String(form.get("material") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const image = String(form.get("image") ?? "").trim();
  const gallery = form
    .getAll("gallery")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const inStock = form.get("inStock") === "on";

  if (!slug || !name || !category || !description || !image || !priceEuros) {
    throw new Error("Missing required fields");
  }
  if (!PRODUCT_CATEGORIES.includes(category)) {
    throw new Error("Invalid category");
  }
  return {
    slug,
    name,
    tagline,
    category,
    priceCents: Math.round(priceEuros * 100),
    badge: badge || undefined,
    material: material || undefined,
    description,
    image,
    gallery,
    inStock,
  };
}

export async function createProductAction(form: FormData) {
  await requireAdmin();
  await connectDb();
  const data = parseForm(form);
  await ProductModel.create(data);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(originalSlug: string, form: FormData) {
  await requireAdmin();
  await connectDb();
  const data = parseForm(form);
  const result = await ProductModel.findOneAndUpdate({ slug: originalSlug }, data, {
    new: true,
    runValidators: true,
  });
  if (!result) throw new Error("Product not found");
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${data.slug}`);
  redirect("/admin/products");
}

export async function deleteProductAction(slug: string) {
  await requireAdmin();
  await connectDb();
  await ProductModel.findOneAndDelete({ slug });
  revalidatePath("/admin/products");
}
