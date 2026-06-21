"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/db/prisma";
import {
  PRODUCT_CATEGORIES,
  toCategoryEnum,
  type CategoryLabel,
} from "@/lib/db/product-category";

function parseForm(form: FormData) {
  const slug = String(form.get("slug") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const tagline = String(form.get("tagline") ?? "").trim();
  const category = String(form.get("category") ?? "") as CategoryLabel;
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
    category: toCategoryEnum(category),
    priceCents: Math.round(priceEuros * 100),
    badge: badge || null,
    material: material || null,
    description,
    image,
    gallery,
    inStock,
  };
}

export async function createProductAction(form: FormData) {
  await requireAdmin();
  const data = parseForm(form);
  await prisma.product.create({ data });
  revalidatePath("/admin/products");
  revalidatePath("/treasures");
  redirect("/admin/products");
}

export async function updateProductAction(originalSlug: string, form: FormData) {
  await requireAdmin();
  const data = parseForm(form);
  const existing = await prisma.product.findUnique({
    where: { slug: originalSlug },
  });
  if (!existing) throw new Error("Product not found");
  await prisma.product.update({ where: { slug: originalSlug }, data });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${data.slug}`);
  revalidatePath("/treasures");
  revalidatePath(`/treasures/${data.slug}`);
  redirect("/admin/products");
}

export async function deleteProductAction(slug: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { slug } });
  revalidatePath("/admin/products");
  revalidatePath("/treasures");
}