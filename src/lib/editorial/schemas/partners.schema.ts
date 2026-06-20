import type { EditorialSchema } from "../types";

/**
 * Admin schema for /partners. The PartnersSection cards (Porcel,
 * Lightenjin, Festival Mental) live in their own component and are
 * NOT controlled by this schema — only the page-level hero, intro
 * row and closing parallax CTA are editable here.
 */
export const partnersSchema: EditorialSchema = {
  pageKey: "partners",
  title: "Partners",
  description: "Image-only hero, intro row, and closing CTA on /partners.",
  publicPath: "/partners",
  sections: [
    {
      key: "hero",
      label: "Hero",
      description: "Image-only opening.",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "image", label: "Hero image", type: "image" },
        { key: "imageAlt", label: "Hero image alt", type: "text", localized: true },
      ],
    },
    {
      key: "intro",
      label: "Intro narrative row (before the partner cards)",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "title", label: "Title", type: "text", localized: true },
        {
          key: "titleAccent",
          label: "Title accent (italic part)",
          type: "text",
          localized: true,
        },
        { key: "body", label: "Body paragraphs", type: "paragraphs", localized: true },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "cta",
      label: "Closing parallax CTA",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "title", label: "Title", type: "text", localized: true },
        {
          key: "titleAccent",
          label: "Title accent (italic part)",
          type: "text",
          localized: true,
        },
        { key: "body", label: "Body", type: "textarea", localized: true },
        {
          key: "ctaLabel",
          label: "Primary button label",
          type: "text",
          localized: true,
        },
        {
          key: "ctaHref",
          label: "Primary button link",
          type: "text",
          hint: "e.g. /you-think-cork",
        },
        {
          key: "backgroundImage",
          label: "Parallax background image",
          type: "image",
        },
        {
          key: "closingLine",
          label: "Small caps line below button (optional)",
          type: "text",
          localized: true,
        },
      ],
    },
  ],
};