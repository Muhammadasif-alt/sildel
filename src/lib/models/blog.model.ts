/**
 * Blog (Journal) post — mirrors the static type in src/content/blog.ts so the
 * marketing /blog pages can read from the DB without changing UI code.
 *
 * Body is an array of blocks: paragraph | heading | quote | image.
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

export const BLOG_TAGS = [
  "Atelier",
  "Forest",
  "Craft",
  "Material",
  "Collectors",
] as const;

const blockSchema = new Schema(
  {
    kind: {
      type: String,
      enum: ["paragraph", "heading", "quote", "image"],
      required: true,
    },
    text: String,
    author: String,
    src: String,
    alt: String,
    caption: String,
  },
  { _id: false }
);

const blogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, default: "" },
    author: { type: String, required: true },
    authorRole: { type: String, default: "" },
    date: { type: Date, required: true },
    readMinutes: { type: Number, default: 5, min: 1 },
    tag: { type: String, enum: BLOG_TAGS, required: true, index: true },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
    body: { type: [blockSchema], default: [] },
  },
  { timestamps: true }
);

export type Blog = InferSchemaType<typeof blogSchema> & {
  _id: mongoose.Types.ObjectId;
};

export type LeanBlog = Omit<Blog, "_id"> & { _id: mongoose.Types.ObjectId };

export const BlogModel: Model<Blog> =
  (mongoose.models.Blog as Model<Blog>) ||
  mongoose.model<Blog>("Blog", blogSchema);