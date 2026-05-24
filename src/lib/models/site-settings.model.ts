/**
 * SiteSettings — singleton document for site-wide chrome.
 *
 * Use `singletonKey: "main"` for the one and only settings document.
 * Loaded by header/footer and any page that needs nav/social/contact info.
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const localizedSchema = new Schema(
  {
    pt: { type: String, default: "" },
    en: { type: String, default: "" },
  },
  { _id: false }
);

const navLinkSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
    href: { type: String, default: "" },
  },
  { _id: false }
);

const footerColumnSchema = new Schema(
  {
    id: { type: String, required: true },
    heading: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
    links: { type: [navLinkSchema], default: [] },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema(
  {
    singletonKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: "main",
    },
    brand: {
      name: { type: String, default: "Sildel" },
      tagline: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
      logoDarkUrl: { type: String, default: "" },
      logoLightUrl: { type: String, default: "" },
    },
    nav: { type: [navLinkSchema], default: [] },
    footer: {
      tagline: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
      columns: { type: [footerColumnSchema], default: [] },
      copyright: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
    },
    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      pinterest: { type: String, default: "" },
      tiktok: { type: String, default: "" },
    },
    contact: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
      hours: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
    },
    brandVideo: {
      url: { type: String, default: "" },
      title: { type: localizedSchema, default: () => ({ pt: "", en: "" }) },
      poster: { type: String, default: "" },
    },
  },
  { timestamps: true, minimize: false }
);

export type SiteSettings = InferSchemaType<typeof siteSettingsSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SiteSettingsModel: Model<SiteSettings> =
  (mongoose.models.SiteSettings as Model<SiteSettings>) ||
  mongoose.model<SiteSettings>("SiteSettings", siteSettingsSchema);
