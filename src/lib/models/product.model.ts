/**
 * Product — a Sildel treasure (sculpture / table / lighting / fine art).
 *
 * Schema mirrors the static type in src/content/treasures.ts so we can move
 * from the static catalog to the database without changing UI code.
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";
import { PRODUCT_CATEGORIES } from "./constants";

export { PRODUCT_CATEGORIES } from "./constants";

const productSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: "", trim: true },
    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: true,
      index: true,
    },
    priceCents: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "EUR" },
    badge: String,
    material: String,
    description: { type: String, required: true },
    longDescription: { type: [String], default: [] },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    inStock: { type: Boolean, default: true, index: true },
    editionSize: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);

export type Product = InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ProductModel: Model<Product> =
  (mongoose.models.Product as Model<Product>) ||
  mongoose.model<Product>("Product", productSchema);
