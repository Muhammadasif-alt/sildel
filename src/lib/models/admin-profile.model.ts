/**
 * AdminProfile — per-admin (single-admin model: keyed by env email) profile
 * customization: display name + avatar URL.
 *
 * Avatar files live under `/public/uploads/admin/` and the stored value is the
 * web-accessible path (e.g. `/uploads/admin/avatar-1716000000.png`).
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const adminProfileSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    displayName: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export type AdminProfile = InferSchemaType<typeof adminProfileSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const AdminProfileModel: Model<AdminProfile> =
  (mongoose.models.AdminProfile as Model<AdminProfile>) ||
  mongoose.model<AdminProfile>("AdminProfile", adminProfileSchema);