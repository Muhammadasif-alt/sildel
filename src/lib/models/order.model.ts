/**
 * Order — a checkout submission.
 *
 * Created by POST /api/orders. Status flow:
 *   pending → paid → preparing → shipped → delivered
 *                                       ↘ cancelled
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";
import { ORDER_STATUSES, PAYMENT_METHODS } from "./constants";

export { ORDER_STATUSES, PAYMENT_METHODS, type LeanOrder } from "./constants";

const orderItemSchema = new Schema(
  {
    productSlug: { type: String, required: true },
    name: { type: String, required: true },
    priceCents: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: String,
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    customer: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      phone: { type: String, trim: true },
    },
    shipping: {
      country: { type: String, required: true, trim: true },
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postcode: { type: String, required: true, trim: true },
    },
    items: { type: [orderItemSchema], required: true, validate: (v: unknown[]) => v.length > 0 },
    subtotalCents: { type: Number, required: true, min: 0 },
    shippingCents: { type: Number, default: 0, min: 0 },
    totalCents: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "EUR" },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "pending",
      index: true,
    },
    paymentMethod: { type: String, enum: PAYMENT_METHODS },
    paymentRef: String,
    notes: String,
  },
  { timestamps: true }
);

export type Order = InferSchemaType<typeof orderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const OrderModel: Model<Order> =
  (mongoose.models.Order as Model<Order>) ||
  mongoose.model<Order>("Order", orderSchema);

/** Generate a customer-facing order number: SIL-2026-A7K9X3 */
export function generateOrderNumber(): string {
  const id = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SIL-${new Date().getFullYear()}-${id}`;
}
