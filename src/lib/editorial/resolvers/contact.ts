import "server-only";
import { getContactEditorial } from "@/content/contact.editorial";
import type { Locale } from "@/lib/i18n/config";
import { loadEditorialContent } from "../load";
import type { StorySectionData } from "@/components/our-story/story-section";
import type {
  EditorialContentDoc,
  LocalizedParagraphs,
  LocalizedText,
} from "../types";

export type ContactRendered = {
  hero: { eyebrow: string; image: string; imageAlt: string };
  intro: StorySectionData;
  form: {
    eyebrow: string;
    heading: string;
    body: string;
    image: string;
    imageAlt: string;
  };
};

export async function resolveContact(locale: Locale): Promise<ContactRendered> {
  const stored = await loadEditorialContent("contact");
  if (stored) return fromDb(stored, locale);
  return fromTs(locale);
}

function fromTs(locale: Locale): ContactRendered {
  const c = getContactEditorial(locale);
  return {
    hero: c.hero,
    intro: {
      eyebrow: c.intro.eyebrow,
      title: c.intro.title,
      titleAccent: c.intro.titleAccent,
      body: c.intro.body,
      image: c.intro.image,
      imageAlt: c.intro.imageAlt,
    },
    form: c.form,
  };
}

function fromDb(db: EditorialContentDoc, locale: Locale): ContactRendered {
  const t = (v: unknown) => readLocalizedText(v, locale);
  const p = (v: unknown) => readLocalizedParagraphs(v, locale);
  const s = (v: unknown) => (typeof v === "string" ? v : "");

  const hero = db.hero ?? {};
  const intro = db.intro ?? {};
  const form = db.form ?? {};

  return {
    hero: {
      eyebrow: t(hero.eyebrow),
      image: s(hero.image),
      imageAlt: t(hero.imageAlt),
    },
    intro: {
      eyebrow: t(intro.eyebrow),
      title: t(intro.title),
      titleAccent: t(intro.titleAccent) || undefined,
      body: p(intro.body),
      image: s(intro.image),
      imageAlt: t(intro.imageAlt),
    },
    form: {
      eyebrow: t(form.eyebrow),
      heading: t(form.heading),
      body: t(form.body),
      image: s(form.image),
      imageAlt: t(form.imageAlt),
    },
  };
}

function readLocalizedText(v: unknown, locale: Locale): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object" && !Array.isArray(v)) {
    const obj = v as LocalizedText;
    return typeof obj[locale] === "string" ? obj[locale] : "";
  }
  return "";
}

function readLocalizedParagraphs(v: unknown, locale: Locale): string[] {
  if (Array.isArray(v))
    return v.filter((x): x is string => typeof x === "string");
  if (v && typeof v === "object") {
    const obj = v as LocalizedParagraphs;
    const list = obj[locale];
    return Array.isArray(list)
      ? list.filter((x): x is string => typeof x === "string")
      : [];
  }
  return [];
}