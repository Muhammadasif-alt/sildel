import "server-only";
import { getTreasures } from "@/content/treasures";
import type { Locale } from "@/lib/i18n/config";
import { loadEditorialContent } from "../load";
import type {
  EditorialContentDoc,
  LocalizedText,
} from "../types";

export type TreasuresChromeRendered = {
  hero: { eyebrow: string; image: string; imageAlt: string };
  intro: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    intro: string;
  };
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

export async function resolveTreasuresChrome(
  locale: Locale,
): Promise<TreasuresChromeRendered> {
  const stored = await loadEditorialContent("treasures");
  if (stored) return fromDb(stored, locale);
  return fromTs(locale);
}

function fromTs(locale: Locale): TreasuresChromeRendered {
  const c = getTreasures(locale);
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
    cta: {
      eyebrow: c.cta.eyebrow,
      title: c.cta.title,
      titleAccent: c.cta.titleAccent,
      body: c.cta.body,
      label: c.cta.destinations[0].cta,
      href: c.cta.destinations[0].href,
      backgroundImage:
        c.cta.destinations[1]?.image ?? c.cta.destinations[0].image,
      closingLine: c.cta.closingLine,
    },
  };
}

function fromDb(
  db: EditorialContentDoc,
  locale: Locale,
): TreasuresChromeRendered {
  const t = (v: unknown) => readLocalizedText(v, locale);
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
      intro: t(intro.intro),
    },
    cta: {
      eyebrow: t(cta.eyebrow),
      title: t(cta.title),
      titleAccent: t(cta.titleAccent) || undefined,
      body: t(cta.body),
      label: t(cta.ctaLabel),
      href: s(cta.ctaHref) || "/our-story",
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