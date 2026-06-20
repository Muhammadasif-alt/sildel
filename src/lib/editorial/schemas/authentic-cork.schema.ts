import type { EditorialSchema } from "../types";

/**
 * Admin schema for /authentic-cork. Mirrors the live page flow:
 * hero → What is cork → bleed → Harvest → bleed → 6 properties (vertical
 * list) → bleed → At Sildel → closing CTA.
 */
export const authenticCorkSchema: EditorialSchema = {
  pageKey: "authentic-cork",
  title: "Authentic Cork",
  description:
    "What cork is, how it's harvested, why it shapes everything Sildel makes.",
  publicPath: "/authentic-cork",
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
      key: "whatIsCork",
      label: "What is cork (first narrative row)",
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
      key: "bleedAfterWhatIsCork",
      label: "Full-bleed image #1 (after What is cork)",
      fields: [
        { key: "src", label: "Image", type: "image" },
        { key: "alt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "harvest",
      label: "The Harvest (second narrative row)",
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
        { key: "image", label: "Image (master harvester's hands)", type: "image" },
        { key: "imageAlt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "bleedAfterHarvest",
      label: "Full-bleed image #2 (after Harvest)",
      fields: [
        { key: "src", label: "Image", type: "image" },
        { key: "alt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "properties",
      label: "Properties (six qualities — vertical list)",
      description:
        "The six cork qualities shown as a typeset list beside an image.",
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
          key: "body",
          label: "Intro paragraph",
          type: "textarea",
          localized: true,
        },
        {
          key: "items",
          label: "Properties (add / remove / reorder)",
          type: "titledList",
          hint: "Each item gets a small italic title + a one-line body.",
        },
        {
          key: "image",
          label: "Image (paired with the list)",
          type: "image",
        },
        {
          key: "imageAlt",
          label: "Image alt",
          type: "text",
          localized: true,
        },
      ],
    },
    {
      key: "bleedBeforeInSildel",
      label: "Full-bleed image #3 (before At Sildel)",
      fields: [
        { key: "src", label: "Image", type: "image" },
        { key: "alt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "inSildel",
      label: "Cork at Sildel (final narrative row)",
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