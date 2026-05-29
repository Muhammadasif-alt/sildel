/**
 * AdminProfile — per-admin (single-admin model: keyed by env email) profile
 * customization: display name + avatar URL.
 *
 * The avatar is stored inline as a small resized data URL (image is shrunk
 * client-side before upload). This keeps it filesystem-free so it works on
 * read-only serverless hosts like Vercel. Older records may still hold a
 * legacy `/uploads/admin/...` path until the photo is re-uploaded.
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