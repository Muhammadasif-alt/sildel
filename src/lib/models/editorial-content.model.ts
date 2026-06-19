/**
 * EditorialContent — structured CMS document for the editorial pages
 * (our-story, authentic-cork, you-think-cork, partners, treasures,
 * contact, faq, press).
 *
 * Unlike PageContent which stores a flexible array of blocks, this
 * model stores ONE schema-shaped object per pageKey. The shape mirrors
 * the matching TS content file (e.g. `src/content/our-story.en.ts`),
 * with locale-aware text fields stored as `{ pt: string, en: string }`.
 *
 * The public page reads this doc if it exists, otherwise falls back to
 * the TS file (so the site keeps working before founder edits anything).
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const editorialContentSchema = new Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    /**
     * Mixed because each pageKey has its own shape (see
     * src/lib/editorial/schemas/*.ts). Validation happens at the
     * server-action layer, not the schema layer.
     */
    content: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

export type EditorialContent = InferSchemaType<typeof editorialContentSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const EditorialContentModel: Model<EditorialContent> =
  (mongoose.models.EditorialContent as Model<EditorialContent>) ||
  mongoose.model<EditorialContent>(
    "EditorialContent",
    editorialContentSchema,
  );