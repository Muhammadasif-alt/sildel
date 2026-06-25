/**
 * Page-content schema + reader.
 *
 * `PAGE_SCHEMAS` declares which sections/fields are editable for each marketing
 * page. The admin Pages editor renders forms from these schemas; marketing
 * pages call `getPageField(pageKey, sectionKey, fieldKey, fallback)` to read
 * a saved value (or the fallback if nothing is in the DB yet).
 *
 * To make a NEW section editable:
 *   1. Add it to PAGE_SCHEMAS below.
 *   2. In the marketing page, replace the hardcoded text with
 *      `await getPageField("home", "hero", "heading", "The cork that…")`.
 */
import "server-only";
import { prisma } from "@/lib/db/prisma";

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
  hint?: string;
};

export type SectionDef = {
  key: string;
  label: string;
  fields: FieldDef[];
};

export type PageSchema = {
  key: string;
  label: string;
  description: string;
  sections: SectionDef[];
};

export const PAGE_SCHEMAS: PageSchema[] = [
  {
    key: "home",
    label: "Home",
    description: "Landing page hero + brand story.",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", hint: "Small label above heading" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "subheading", label: "Subheading", type: "textarea" },
          { key: "ctaPrimary", label: "Primary CTA label", type: "text" },
          { key: "ctaSecondary", label: "Secondary CTA label", type: "text" },
        ],
      },
      {
        key: "brandStory",
        label: "Brand Story",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "body", label: "Body", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "our-story",
    label: "Our Story",
    description: "About + history page.",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "body", label: "Intro paragraph", type: "textarea" },
          { key: "image", label: "Hero image", type: "image" },
        ],
      },
    ],
  },
  {
    key: "authentic-cork",
    label: "Authentic Cork",
    description: "Material education page.",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "body", label: "Intro paragraph", type: "textarea" },
          { key: "image", label: "Hero image", type: "image" },
        ],
      },
    ],
  },
  {
    key: "you-think-cork",
    label: "You Think Cork",
    description: "Brand campaign page.",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "body", label: "Intro paragraph", type: "textarea" },
          { key: "image", label: "Hero image", type: "image" },
        ],
      },
    ],
  },
  {
    key: "treasures",
    label: "Treasures",
    description: "Catalog hero copy.",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "body", label: "Intro paragraph", type: "textarea" },
          { key: "image", label: "Hero image", type: "image" },
        ],
      },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    description: "Contact page hero + studio info.",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "body", label: "Intro paragraph", type: "textarea" },
          { key: "image", label: "Hero image", type: "image" },
        ],
      },
      {
        key: "studio",
        label: "Studio",
        fields: [
          { key: "address", label: "Address", type: "textarea" },
          { key: "email", label: "Email", type: "text" },
          { key: "phone", label: "Phone", type: "text" },
        ],
      },
    ],
  },
  {
    key: "terms",
    label: "Terms",
    description: "Terms of service.",
    sections: [
      {
        key: "main",
        label: "Body",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "body", label: "Body (markdown-ish)", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "privacy",
    label: "Privacy",
    description: "Privacy policy.",
    sections: [
      {
        key: "main",
        label: "Body",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "body", label: "Body (markdown-ish)", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "shipping",
    label: "Shipping",
    description: "Shipping policy.",
    sections: [
      {
        key: "main",
        label: "Body",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "body", label: "Body (markdown-ish)", type: "textarea" },
        ],
      },
    ],
  },
];

export function findPageSchema(key: string): PageSchema | undefined {
  return PAGE_SCHEMAS.find((p) => p.key === key);
}

type StoredSections = Record<string, { fields?: Record<string, string> }>;

export async function getPageContent(
  pageKey: string
): Promise<StoredSections> {
  try {
    const row = await prisma.pageContent.findUnique({
      where: { pageKey },
      select: { sections: true },
    });
    const raw = row?.sections;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};

    const out: StoredSections = {};
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (!v || typeof v !== "object") continue;
      const fields = (v as { fields?: unknown }).fields;
      out[k] = {
        fields:
          fields && typeof fields === "object" && !Array.isArray(fields)
            ? (fields as Record<string, string>)
            : {},
      };
    }
    return out;
  } catch {
    return {};
  }
}

export async function getPageField(
  pageKey: string,
  sectionKey: string,
  fieldKey: string,
  fallback: string
): Promise<string> {
  const content = await getPageContent(pageKey);
  const v = content[sectionKey]?.fields?.[fieldKey];
  return v && v.trim().length > 0 ? v : fallback;
}