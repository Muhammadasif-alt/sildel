import type { EditorialSchema } from "../types";

/**
 * Admin schema for /you-think-cork. Mirrors the live page flow:
 * hero → "You Think Cork" narrative → bleed → "Let's innovate"
 * narrative → dark slogan band → 3 collaboration pillars → contact
 * form heading.
 *
 * Icons for the pillars are fixed in code (Beaker, Leaf, Settings)
 * — the first three rows in the titledList map to those icons by
 * index. Additional rows would render without an icon.
 */
export const youThinkCorkSchema: EditorialSchema = {
  pageKey: "you-think-cork",
  title: "You Think Cork",
  description:
    "Sildel × Material Bank — invitation to brands, studios and makers.",
  publicPath: "/you-think-cork",
  sections: [
    {
      key: "hero",
      label: "Hero",
      description: "Image-only opening. No text overlay.",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "image", label: "Hero image", type: "image" },
        { key: "imageAlt", label: "Hero image alt text", type: "text", localized: true },
      ],
    },
    {
      key: "intro",
      label: "Intro narrative (first row)",
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
      key: "bleed",
      label: "Full-bleed image (between rows)",
      fields: [
        { key: "src", label: "Image", type: "image" },
        { key: "alt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "innovate",
      label: "\"Let's innovate together\" narrative (second row)",
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
      key: "banner",
      label: "Dark slogan band",
      description: "One uppercase line on a black band — punctuates the page.",
      fields: [
        {
          key: "line",
          label: "Slogan (uppercased automatically)",
          type: "text",
          localized: true,
        },
      ],
    },
    {
      key: "pillars",
      label: "Collaboration pillars (vertical list)",
      description:
        "Icons are fixed in code (Beaker, Leaf, Settings) and map to the first three items by order.",
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
          label: "Pillars (add / remove / reorder — icons fixed by order)",
          type: "titledList",
        },
        { key: "image", label: "Image (paired with the list)", type: "image" },
        { key: "imageAlt", label: "Image alt", type: "text", localized: true },
      ],
    },
    {
      key: "contactCta",
      label: "Contact form heading",
      description:
        "The eyebrow and heading shown above the contact form at the bottom of the page.",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "heading", label: "Heading", type: "text", localized: true },
      ],
    },
  ],
};