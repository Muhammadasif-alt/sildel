import "server-only";
import { getOurStory } from "@/content/our-story";
import type { Locale } from "@/lib/i18n/config";
import { loadEditorialContent } from "../load";
import type { StorySectionData } from "@/components/our-story/story-section";
import type {
  EditorialContentDoc,
  LocalizedParagraphs,
  LocalizedText,
} from "../types";

/**
 * Page-render shape for /our-story. The route reads from this shape
 * instead of importing the TS content directly, so the same view code
 * works whether the data came from Mongo (founder edited it) or from
 * `src/content/our-story.*.ts` (default fallback).
 */
export type OurStoryRendered = {
  hero: { eyebrow: string; image: string; imageAlt: string };
  sections: StorySectionData[];
  bleeds: {
    afterOrigin: { src: string; alt: string };
    beforeAtelier: { src: string; alt: string };
  };
  founder: {
    eyebrow: string;
    pullQuote: string;
    body: string[];
    closing: string;
    image: string;
    imageAlt: string;
    signature: { name: string; role: string };
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

export async function resolveOurStory(
  locale: Locale,
): Promise<OurStoryRendered> {
  const stored = await loadEditorialContent("our-story");
  if (stored) return fromDb(stored, locale);
  return fromTs(locale);
}

/* ---------- TS fallback (default content) ---------- */

function fromTs(locale: Locale): OurStoryRendered {
  const c = getOurStory(locale);

  return {
    hero: {
      eyebrow: c.hero.eyebrow,
      image: c.hero.image,
      imageAlt: c.hero.imageAlt,
    },
    sections: [
      {
        eyebrow: c.origin.eyebrow,
        title: c.origin.title,
        titleAccent: c.origin.titleAccent,
        body: c.origin.body,
        image: c.origin.image,
        imageAlt: c.origin.imageAlt,
      },
      {
        eyebrow: c.heritage.images[0].eyebrow,
        title: c.heritage.images[0].title,
        body: [c.heritage.body, c.heritage.images[0].body],
        image: c.heritage.images[0].src,
        imageAlt: c.heritage.images[0].alt,
      },
      {
        eyebrow: c.heritage.images[1].eyebrow,
        title: c.heritage.images[1].title,
        body: [c.heritage.images[1].body],
        image: c.heritage.images[1].src,
        imageAlt: c.heritage.images[1].alt,
      },
      {
        eyebrow: c.atelier.eyebrow,
        title: c.atelier.title,
        titleAccent: c.atelier.titleAccent,
        body: [c.atelier.body, c.atelier.images[1].body],
        image: c.atelier.images[1].src,
        imageAlt: c.atelier.images[1].alt,
      },
      {
        eyebrow: c.symbol.eyebrow,
        title: c.symbol.title,
        titleAccent: c.symbol.titleAccent,
        body: c.symbol.body,
        image: c.symbol.image,
        imageAlt: c.symbol.imageAlt,
      },
    ],
    bleeds: {
      afterOrigin: {
        src: c.heritage.images[2].src,
        alt: c.heritage.images[2].alt,
      },
      beforeAtelier: {
        src: c.atelier.images[0].src,
        alt: c.atelier.images[0].alt,
      },
    },
    founder: {
      eyebrow: c.founder.eyebrow,
      pullQuote: c.founder.pullQuote,
      body: c.founder.body,
      closing: c.founder.closing,
      image: c.founder.image,
      imageAlt: c.founder.imageAlt,
      signature: c.founder.signature,
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

/* ---------- DB shape (admin-edited content) ---------- */

function fromDb(
  db: EditorialContentDoc,
  locale: Locale,
): OurStoryRendered {
  const t = (v: unknown) => readLocalizedText(v, locale);
  const p = (v: unknown) => readLocalizedParagraphs(v, locale);
  const s = (v: unknown) => (typeof v === "string" ? v : "");

  const hero = db.hero ?? {};
  const origin = db.origin ?? {};
  const heritageOak = db.heritageOak ?? {};
  const heritageHands = db.heritageHands ?? {};
  const atelier = db.atelier ?? {};
  const symbol = db.symbol ?? {};
  const bleedAfterOrigin = db.bleedAfterOrigin ?? {};
  const bleedBeforeAtelier = db.bleedBeforeAtelier ?? {};
  const founder = db.founder ?? {};
  const cta = db.cta ?? {};

  return {
    hero: {
      eyebrow: t(hero.eyebrow),
      image: s(hero.image),
      imageAlt: t(hero.imageAlt),
    },
    sections: [
      {
        eyebrow: t(origin.eyebrow),
        title: t(origin.title),
        titleAccent: t(origin.titleAccent) || undefined,
        body: p(origin.body),
        image: s(origin.image),
        imageAlt: t(origin.imageAlt),
      },
      {
        eyebrow: t(heritageOak.eyebrow),
        title: t(heritageOak.title),
        body: p(heritageOak.body),
        image: s(heritageOak.image),
        imageAlt: t(heritageOak.imageAlt),
      },
      {
        eyebrow: t(heritageHands.eyebrow),
        title: t(heritageHands.title),
        body: p(heritageHands.body),
        image: s(heritageHands.image),
        imageAlt: t(heritageHands.imageAlt),
      },
      {
        eyebrow: t(atelier.eyebrow),
        title: t(atelier.title),
        titleAccent: t(atelier.titleAccent) || undefined,
        body: p(atelier.body),
        image: s(atelier.image),
        imageAlt: t(atelier.imageAlt),
      },
      {
        eyebrow: t(symbol.eyebrow),
        title: t(symbol.title),
        titleAccent: t(symbol.titleAccent) || undefined,
        body: p(symbol.body),
        image: s(symbol.image),
        imageAlt: t(symbol.imageAlt),
      },
    ],
    bleeds: {
      afterOrigin: {
        src: s(bleedAfterOrigin.src),
        alt: t(bleedAfterOrigin.alt),
      },
      beforeAtelier: {
        src: s(bleedBeforeAtelier.src),
        alt: t(bleedBeforeAtelier.alt),
      },
    },
    founder: {
      eyebrow: t(founder.eyebrow),
      pullQuote: t(founder.pullQuote),
      body: p(founder.body),
      closing: t(founder.closing),
      image: s(founder.image),
      imageAlt: t(founder.imageAlt),
      signature: {
        name: s(founder.signatureName),
        role: t(founder.signatureRole),
      },
    },
    cta: {
      eyebrow: t(cta.eyebrow),
      title: t(cta.title),
      titleAccent: t(cta.titleAccent) || undefined,
      body: t(cta.body),
      label: t(cta.ctaLabel),
      href: s(cta.ctaHref) || "/treasures",
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