/**
 * PageContent — block-based CMS document for marketing pages.
 *
 * One document per page (`pageKey`, e.g. "home", "our-story"). Each page has an
 * ordered array of blocks (see `src/lib/blocks/registry.ts` for block types).
 *
 * The legacy `sections` map is kept for backward compatibility with the
 * older field-based editor, so pages can fall back to old values while the
 * migration to blocks is in progress.
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const localizedSchema = new Schema(
  {
    pt: { type: String, default: "" },
    en: { type: String, default: "" },
  },
  { _id: false }
);

const blockSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    order: { type: Number, default: 0 },
    hidden: { type: Boolean, default: false },
    /**
     * Shape depends on `type` — see `BLOCK_TYPES` in `src/lib/blocks/registry.ts`.
     * Stored as Mixed because each block type has its own field set.
     */
    content: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const legacySectionSchema = new Schema(
  {
    fields: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

const pageContentSchema = new Schema(
  {
    pageKey: { type: String, required: true, unique: true, index: true, trim: true },
    blocks: { type: [blockSchema], default: [] },
    seo: {
      title: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
      description: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
    },
    /** @deprecated kept for backward compat with the old field-based editor */
    sections: { type: Map, of: legacySectionSchema, default: {} },
  },
  { timestamps: true, minimize: false }
);

export type PageContent = InferSchemaType<typeof pageContentSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const PageContentModel: Model<PageContent> =
  (mongoose.models.PageContent as Model<PageContent>) ||
  mongoose.model<PageContent>("PageContent", pageContentSchema);
