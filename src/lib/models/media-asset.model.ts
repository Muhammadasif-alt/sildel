/**
 * MediaAsset — index of every uploaded file. Actual binaries live in
 * `/public/uploads/`; this model just stores metadata so the media library
 * can browse, search, and delete uploads.
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const localizedSchema = new Schema(
  {
    pt: { type: String, default: "" },
    en: { type: String, default: "" },
  },
  { _id: false }
);

const mediaAssetSchema = new Schema(
  {
    url: { type: String, required: true, index: true },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    alt: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
    title: { type: String, default: "" },
  },
  { timestamps: true }
);

export type MediaAsset = InferSchemaType<typeof mediaAssetSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const MediaAssetModel: Model<MediaAsset> =
  (mongoose.models.MediaAsset as Model<MediaAsset>) ||
  mongoose.model<MediaAsset>("MediaAsset", mediaAssetSchema);
