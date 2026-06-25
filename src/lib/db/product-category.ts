/**
 * Bridge between the UI label "Fine Arts" (with space) and the Prisma
 * enum value `FineArts` (no space, Prisma's identifier rules). Single
 * source of truth for the label list so admin forms, filters and
 * product type-checks all stay aligned.
 */
import { ProductCategory } from "@prisma/client";

export const PRODUCT_CATEGORIES = [
  "Sculpture",
  "Tables",
  "Lighting",
  "Fine Arts",
] as const;

export type CategoryLabel = (typeof PRODUCT_CATEGORIES)[number];

export function toCategoryEnum(label: CategoryLabel): ProductCategory {
  if (label === "Fine Arts") return ProductCategory.FineArts;
  return label as ProductCategory; // Sculpture / Tables / Lighting
}

export function fromCategoryEnum(value: ProductCategory): CategoryLabel {
  if (value === ProductCategory.FineArts) return "Fine Arts";
  return value as CategoryLabel;
}