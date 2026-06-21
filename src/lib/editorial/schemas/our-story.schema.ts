import type { EditorialSchema } from "../types";

/**
 * Admin schema for /our-story. Mirrors the shape of
 * `src/content/our-story.en.ts` so what the founder edits maps 1:1
 * to what renders on the page.
 *
 * Locale-aware text fields (`localized: true`) save both EN + PT.
 * Paragraph arrays let her add / remove / reorder body paragraphs.
 */
export const ourStorySchema: EditorialSchema = {
  pageKey: "our-story",
  title: "Our Story",
  description:
    "The story behind Sildel — atelier, heritage, hands, symbol, founder.",
  publicPath: "/our-story",
  sections: [
    {
      key: "hero",
      label: "Hero",
      description: "Image-only opening. No text overlay.",
      fields: [
        {
          key: "eyebrow",
          label: "Eyebrow (chrome label, never overlaid on image)",
          type: "text",
          localized: true,
        },
        { key: "image", label: "Hero image", type: "image" },
        {
          key: "imageAlt",
          label: "Hero image alt text",
          type: "text",
          localized: true,
        },
      ],
    },
    {
      key: "origin",
      label: "Origin (first narrative row)",
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
      key: "love",
      label: "“Cork is a matter of love” (founder voice — between Origin and Heritage)",
      description:
        "Isabel's signature beat in her own words. Image RIGHT, text LEFT.",
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
      key: "heritageOak",
      label: "Heritage — Quercus suber (second narrative row)",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "title", label: "Title", type: "text", localized: true },
        { key: "body", label: "Body paragraphs", type: "paragraphs", localized: true },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "heritageHands",
      label: "Heritage — descortiçador hands (third narrative row)",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "title", label: "Title", type: "text", localized: true },
        { key: "body", label: "Body paragraphs", type: "paragraphs", localized: true },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "atelier",
      label: "Atelier (fourth narrative row)",
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
      key: "symbol",
      label: "Symbol — the lynx (fifth narrative row)",
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
      key: "bleedAfterOrigin",
      label: "Full-bleed image #1 (between Origin and Heritage)",
      fields: [
        { key: "src", label: "Image", type: "image" },
        { key: "alt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "bleedBeforeAtelier",
      label: "Full-bleed image #2 (between Heritage Hands and Atelier)",
      fields: [
        { key: "src", label: "Image", type: "image" },
        { key: "alt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "founder",
      label: "Founder (portrait + pull quote)",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        {
          key: "pullQuote",
          label: "Pull quote (large italic)",
          type: "textarea",
          localized: true,
        },
        { key: "body", label: "Body paragraphs", type: "paragraphs", localized: true },
        {
          key: "closing",
          label: "Closing italic line",
          type: "text",
          localized: true,
        },
        {
          key: "signatureName",
          label: "Signature name",
          type: "text",
        },
        {
          key: "signatureRole",
          label: "Signature role",
          type: "text",
          localized: true,
        },
        { key: "image", label: "Portrait image", type: "image" },
        {
          key: "imageAlt",
          label: "Portrait alt",
          type: "text",
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
          hint: "e.g. /treasures",
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