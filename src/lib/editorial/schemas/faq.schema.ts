import type { EditorialSchema } from "../types";

/**
 * Admin schema for /faq. Q&A list reuses the titledList field type
 * — `title` is the question, `body` is the answer.
 */
export const faqSchema: EditorialSchema = {
  pageKey: "faq",
  title: "FAQ",
  description:
    "Frequently asked questions — hero, intro, Q&A list, and the closing contact CTA.",
  publicPath: "/faq",
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
      key: "faqs",
      label: "Questions & answers",
      description:
        "Each item: question (title) + answer (body). Click an item to expand on the public page.",
      fields: [
        {
          key: "items",
          label: "Q&As (add / remove / reorder)",
          type: "titledList",
          hint: "Title = the question. Body = the answer.",
        },
      ],
    },
    {
      key: "cta",
      label: "Closing CTA (talk-to-us band)",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
        {
          key: "body",
          label: "Pull-quote body",
          type: "textarea",
          localized: true,
        },
        { key: "ctaLabel", label: "Button label", type: "text", localized: true },
        {
          key: "ctaHref",
          label: "Button link",
          type: "text",
          hint: "e.g. /contact",
        },
      ],
    },
  ],
};