import type { EditorialSchema } from "../types";

/**
 * Admin schema for /press. Magazine features are a `pressList` —
 * publication + date (both localised), spread image + alt text.
 */
export const pressSchema: EditorialSchema = {
  pageKey: "press",
  title: "Press",
  description:
    "Magazine features list — accordion of publications that wrote about Sildel.",
  publicPath: "/press",
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
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "title", label: "Title", type: "text", localized: true },
        {
          key: "titleAccent",
          label: "Title accent (italic part)",
          type: "text",
          localized: true,
        },
        { key: "intro", label: "Intro paragraph", type: "textarea", localized: true },
      ],
    },
    {
      key: "features",
      label: "Press features (accordion)",
      description:
        "Each item opens to reveal the magazine spread it links to.",
      fields: [
        {
          key: "items",
          label: "Features (add / remove / reorder)",
          type: "pressList",
        },
      ],
    },
    {
      key: "cta",
      label: "Closing CTA",
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
        { key: "ctaLabel", label: "Button label", type: "text", localized: true },
        {
          key: "ctaHref",
          label: "Button link",
          type: "text",
          hint: "e.g. /contact",
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