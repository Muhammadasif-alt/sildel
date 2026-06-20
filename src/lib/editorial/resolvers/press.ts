import "server-only";
import { getPress } from "@/content/press";
import type { PressFeature } from "@/content/press";
import type { Locale } from "@/lib/i18n/config";
import { loadEditorialContent } from "../load";
import type {
  EditorialContentDoc,
  LocalizedText,
  PressListItem,
} from "../types";

export type PressRendered = {
  hero: { eyebrow: string; image: string; imageAlt: string };
  intro: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    intro: string;
  };
  features: PressFeature[];
  cta: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    body: string;
    label: string;
    href: string;
    closingLine?: string;
  };
};

export async function resolvePress(locale: Locale): Promise<PressRendered> {
  const stored = await loadEditorialContent("press");
  if (stored) return fromDb(stored, locale);
  return fromTs(locale);
}

function fromTs(locale: Locale): PressRendered {
  const c = getPress(locale);
  return {
    hero: {
      eyebrow: c.hero.eyebrow,
      image: c.hero.image,
      imageAlt: c.hero.imageAlt,
    },
    intro: {
      eyebrow: c.hero.eyebrow,
      title: c.hero.title,
      titleAccent: c.hero.titleAccent,
      intro: c.hero.intro,
    },
    features: c.features,
    cta: {
      eyebrow: c.cta.eyebrow,
      title: c.cta.title,
      titleAccent: c.cta.titleAccent,
      body: c.cta.body,
      label: c.cta.label,
      href: c.cta.href,
      closingLine: c.cta.closingLine,
    },
  };
}

function fromDb(db: EditorialContentDoc, locale: Locale): PressRendered {
  const t = (v: unknown) => readLocalizedText(v, locale);
  const s = (v: unknown) => (typeof v === "string" ? v : "");

  const hero = db.hero ?? {};
  const intro = db.intro ?? {};
  const features = db.features ?? {};
  const cta = db.cta ?? {};

  const items: PressFeature[] = Array.isArray(features.items)
    ? (features.items as PressListItem[]).map((row, i) => {
        const publication = row.publication?.[locale] ?? "";
        const date = row.date?.[locale] ?? "";
        const image = row.image ?? "";
        const alt = row.imageAlt?.[locale] ?? publication;
        return {
          id: `feature-${i}`,
          publication,
          date,
          thumbnail: image,
          spread: image,
          alt,
        };
      })
    : getPress(locale).features;

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
      intro: t(intro.intro),
    },
    features: items,
    cta: {
      eyebrow: t(cta.eyebrow),
      title: t(cta.title),
      titleAccent: t(cta.titleAccent) || undefined,
      body: t(cta.body),
      label: t(cta.ctaLabel),
      href: s(cta.ctaHref) || "/contact",
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