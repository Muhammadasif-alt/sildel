import "server-only";
import { getFaqEditorial } from "@/content/faq.editorial";
import { getFaqs } from "@/content/legal";
import type { Locale } from "@/lib/i18n/config";
import { loadEditorialContent } from "../load";
import type {
  EditorialContentDoc,
  LocalizedText,
  TitledListItem,
} from "../types";

export type FaqRendered = {
  hero: { eyebrow: string; image: string; imageAlt: string };
  intro: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    intro: string;
  };
  faqs: Array<{ q: string; a: string }>;
  cta: {
    eyebrow: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export async function resolveFaq(locale: Locale): Promise<FaqRendered> {
  const stored = await loadEditorialContent("faq");
  if (stored) return fromDb(stored, locale);
  return fromTs(locale);
}

function fromTs(locale: Locale): FaqRendered {
  const c = getFaqEditorial(locale);
  return {
    hero: c.hero,
    intro: c.intro,
    faqs: getFaqs(locale),
    cta: c.cta,
  };
}

function fromDb(db: EditorialContentDoc, locale: Locale): FaqRendered {
  const t = (v: unknown) => readLocalizedText(v, locale);
  const s = (v: unknown) => (typeof v === "string" ? v : "");

  const hero = db.hero ?? {};
  const intro = db.intro ?? {};
  const faqs = db.faqs ?? {};
  const cta = db.cta ?? {};

  const items: Array<{ q: string; a: string }> = Array.isArray(faqs.items)
    ? (faqs.items as TitledListItem[]).map((row) => ({
        q: row.title?.[locale] ?? "",
        a: row.body?.[locale] ?? "",
      }))
    : getFaqs(locale);

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
    faqs: items,
    cta: {
      eyebrow: t(cta.eyebrow),
      body: t(cta.body),
      ctaLabel: t(cta.ctaLabel),
      ctaHref: s(cta.ctaHref) || "/contact",
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