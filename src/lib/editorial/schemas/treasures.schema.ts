import type { EditorialSchema } from "../types";

/**
 * Admin schema for /treasures — only the page chrome (hero, title
 * block, closing CTA) is editable here. The ProductGrid catalogue
 * pulls from the Products collection, not from this document.
 */
export const treasuresSchema: EditorialSchema = {
  pageKey: "treasures",
  title: "Treasures",
  description:
    "Catalogue page chrome — hero, title block and closing CTA. The product grid is managed under Commerce.",
  publicPath: "/treasures",
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
      label: "Title block",
      description: "Eyebrow + headline + intro paragraph shown above the grid.",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "title", label: "Title", type: "text", localized: true },
        {
          key: "titleAccent",
          label: "Title accent (italic part)",
          type: "text",
          localized: true,
        },
        {
          key: "intro",
          label: "Intro paragraph",
          type: "textarea",
          localized: true,
        },
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
          hint: "e.g. /our-story",
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