import type { EditorialSchema } from "../types";

/**
 * Admin schema for /contact — hero, intro narrative row, form
 * heading. The ContactForm fields and ContactMap (NAP + Google
 * maps) stay on their own components / siteConfig and are not
 * editable through this schema.
 */
export const contactSchema: EditorialSchema = {
  pageKey: "contact",
  title: "Contact",
  description:
    "Hero, intro row and form heading for /contact. The form fields and map block are wired separately.",
  publicPath: "/contact",
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
      label: "Intro narrative row",
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
      key: "form",
      label: "Contact form heading + side image",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        { key: "heading", label: "Heading", type: "text", localized: true },
        { key: "body", label: "Body (subtext under heading)", type: "textarea", localized: true },
        { key: "image", label: "Side image (left column on /contact)", type: "image" },
        { key: "imageAlt", label: "Side image alt", type: "text", localized: true },
      ],
    },
  ],
};