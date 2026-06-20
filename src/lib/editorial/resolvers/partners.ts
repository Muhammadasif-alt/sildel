import "server-only";
import { getPartnersEditorial } from "@/content/partners.editorial";
import type { Locale } from "@/lib/i18n/config";
import { loadEditorialContent } from "../load";
import type { StorySectionData } from "@/components/our-story/story-section";
import type {
  EditorialContentDoc,
  LocalizedParagraphs,
  LocalizedText,
} from "../types";

export type PartnersRendered = {
  hero: { eyebrow: string; image: string; imageAlt: string };
  intro: StorySectionData;
  cta: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    body: string;
    label: string;
    href: string;
    backgroundImage: string;
    closingLine?: string;
  };
};

export async function resolvePartners(
  locale: Locale,
): Promise<PartnersRendered> {
  const stored = await loadEditorialContent("partners");
  if (stored) return fromDb(stored, locale);
  return fromTs(locale);
}

function fromTs(locale: Locale): PartnersRendered {
  const c = getPartnersEditorial(locale);
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
    cta: {
      eyebrow: c.cta.eyebrow,
      title: c.cta.title,
      titleAccent: c.cta.titleAccent,
      body: c.cta.body,
      label: c.cta.ctaLabel,
      href: c.cta.ctaHref,
      backgroundImage: c.cta.backgroundImage,
      closingLine: c.cta.closingLine,
    },
  };
}

function fromDb(
  db: EditorialContentDoc,
  locale: Locale,
): PartnersRendered {
  const t = (v: unknown) => readLocalizedText(v, locale);
  const p = (v: unknown) => readLocalizedParagraphs(v, locale);
  const s = (v: unknown) => (typeof v === "string" ? v : "");

  const hero = db.hero ?? {};
  const intro = db.intro ?? {};
  const cta = db.cta ?? {};

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
    cta: {
      eyebrow: t(cta.eyebrow),
      title: t(cta.title),
      titleAccent: t(cta.titleAccent) || undefined,
      body: t(cta.body),
      label: t(cta.ctaLabel),
      href: s(cta.ctaHref) || "/you-think-cork",
      backgroundImage: s(cta.backgroundImage),
      closingLine: t(cta.closingLine) || undefined,
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