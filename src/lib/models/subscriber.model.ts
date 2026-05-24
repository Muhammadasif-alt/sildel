/**
 * Subscriber — newsletter signup.
 *
 * Created/upserted by POST /api/newsletter. Unique by email so multiple
 * signups don't create duplicates.
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    source: { type: String, default: "homepage" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type Subscriber = InferSchemaType<typeof subscriberSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SubscriberModel: Model<Subscriber> =
  (mongoose.models.Subscriber as Model<Subscriber>) ||
  mongoose.model<Subscriber>("Subscriber", subscriberSchema);
