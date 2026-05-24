/**
 * Client-safe constants + lean types for our Mongoose models.
 *
 * Models (`*.model.ts`) import Mongoose, which can ONLY run on the server.
 * Anything a client component needs (enum lists for selects, type shapes for
 * props) lives here so it can be safely bundled for the browser.
 */

export const PRODUCT_CATEGORIES = [
  "Sculpture",
  "Tables",
  "Lighting",
  "Fine Arts",
] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_METHODS = ["paypal", "multibanco", "stripe"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

/** Plain-object shape returned by `.lean<LeanOrder>()` calls. */
export type LeanOrder = {
  _id: { toString(): string } & Record<string, unknown>;
  orderNumber: string;
  email: string;
  customer: { firstName: string; lastName: string; phone?: string };
  shipping: { country: string; street: string; city: string; postcode: string };
  items: Array<{
    productSlug: string;
    name: string;
    priceCents: number;
    quantity: number;
    image?: string;
  }>;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentRef?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
