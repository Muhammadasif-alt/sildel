/**
 * ContactMessage — a customer enquiry from the /contact form.
 *
 * Created by the server action in app/(marketing)/contact/actions.ts.
 * Admin can read these (TODO: build /admin/messages view).
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const CONTACT_TOPICS = [
  "general",
  "commission",
  "press",
  "visit",
  "wholesale",
  "other",
] as const;

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: { type: String, trim: true, maxlength: 40 },
    topic: {
      type: String,
      enum: CONTACT_TOPICS,
      default: "general",
      index: true,
    },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type ContactMessage = InferSchemaType<typeof contactMessageSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const CONTACT_TOPIC_VALUES = CONTACT_TOPICS;

export const ContactMessageModel: Model<ContactMessage> =
  (mongoose.models.ContactMessage as Model<ContactMessage>) ||
  mongoose.model<ContactMessage>("ContactMessage", contactMessageSchema);
