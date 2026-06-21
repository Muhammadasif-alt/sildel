import "server-only";
import { getAuthenticCork } from "@/content/authentic-cork";
import type { Locale } from "@/lib/i18n/config";
import { loadEditorialContent } from "../load";
import type { StorySectionData } from "@/components/our-story/story-section";
import type {
  EditorialContentDoc,
  LocalizedParagraphs,
  LocalizedText,
  TitledListItem,
} from "../types";

export type AuthenticCorkRendered = {
  hero: { eyebrow: string; image: string; imageAlt: string };
  whatIsCork: StorySectionData;
  harvest: StorySectionData;
  inSildel: StorySectionData;
  // "One of the world's thirty-five" — biodiversity + CO2 section
  // pulled from sildel.pt /authentic-cork. Pull-quote on top, image
  // + paragraphs in a split row, fact strip beneath.
  biodiversity: {
    eyebrow: string;
    pullQuote: string;
    title: string;
    titleAccent?: string;
    body: string[];
    image: string;
    imageAlt: string;
    facts: Array<{ value: string; label: string }>;
  };
  bleeds: {
    afterWhatIsCork: { src: string; alt: string };
    afterHarvest: { src: string; alt: string };
    beforeInSildel: { src: string; alt: string };
  };
  properties: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    body: string;
    image: string;
    imageAlt: string;
    items: Array<{ title: string; body: string }>;
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

export async function resolveAuthenticCork(
  locale: Locale,
): Promise<AuthenticCorkRendered> {
  const stored = await loadEditorialContent("authentic-cork");
  if (stored) return fromDb(stored, locale);
  return fromTs(locale);
}

/* ---------- TS fallback ---------- */

function fromTs(locale: Locale): AuthenticCorkRendered {
  const c = getAuthenticCork(locale);

  return {
    hero: {
      eyebrow: c.hero.eyebrow,
      image: c.hero.image,
      imageAlt: c.hero.imageAlt,
    },
    whatIsCork: {
      eyebrow: c.whatIsCork.eyebrow,
      title: c.whatIsCork.title,
      titleAccent: c.whatIsCork.titleAccent,
      body: c.whatIsCork.body,
      image: c.whatIsCork.image,
      imageAlt: c.whatIsCork.imageAlt,
    },
    harvest: {
      eyebrow: c.harvest.eyebrow,
      title: c.harvest.title,
      titleAccent: c.harvest.titleAccent,
      body: [c.harvest.body],
      image: c.harvest.images[1].src,
      imageAlt: c.harvest.images[1].alt,
    },
    inSildel: {
      eyebrow: c.inSildel.eyebrow,
      title: c.inSildel.title,
      titleAccent: c.inSildel.titleAccent,
      body: [c.inSildel.body, c.inSildel.points.join(". ") + "."],
      image: c.inSildel.image,
      imageAlt: c.inSildel.imageAlt,
    },
    biodiversity: {
      eyebrow: c.biodiversity.eyebrow,
      pullQuote: c.biodiversity.pullQuote,
      title: c.biodiversity.title,
      titleAccent: c.biodiversity.titleAccent,
      body: c.biodiversity.body,
      image: c.biodiversity.image,
      imageAlt: c.biodiversity.imageAlt,
      facts: c.biodiversity.facts.map((f) => ({ value: f.value, label: f.label })),
    },
    bleeds: {
      afterWhatIsCork: {
        src: c.harvest.images[0].src,
        alt: c.harvest.images[0].alt,
      },
      afterHarvest: {
        src: c.harvest.images[2].src,
        alt: c.harvest.images[2].alt,
      },
      beforeInSildel: {
        src: c.cta.destinations[1].image,
        alt: c.cta.destinations[1].imageAlt,
      },
    },
    properties: {
      eyebrow: c.properties.eyebrow,
      title: c.properties.title,
      titleAccent: c.properties.titleAccent,
      body: c.properties.body,
      image: c.cta.destinations[0].image,
      imageAlt: c.cta.destinations[0].imageAlt,
      items: c.properties.items.map((i) => ({ title: i.title, body: i.body })),
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

/* ---------- DB shape ---------- */

function fromDb(
  db: EditorialContentDoc,
  locale: Locale,
): AuthenticCorkRendered {
  const t = (v: unknown) => readLocalizedText(v, locale);
  const p = (v: unknown) => readLocalizedParagraphs(v, locale);
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const items = (v: unknown) =>
    Array.isArray(v)
      ? (v as TitledListItem[]).map((row) => ({
          title: row.title?.[locale] ?? "",
          body: row.body?.[locale] ?? "",
        }))
      : [];

  const hero = db.hero ?? {};
  const whatIsCork = db.whatIsCork ?? {};
  const harvest = db.harvest ?? {};
  const inSildel = db.inSildel ?? {};
  const biodiversity = db.biodiversity ?? {};
  const properties = db.properties ?? {};
  const bleed1 = db.bleedAfterWhatIsCork ?? {};
  const bleed2 = db.bleedAfterHarvest ?? {};
  const bleed3 = db.bleedBeforeInSildel ?? {};
  const cta = db.cta ?? {};

  return {
    hero: {
      eyebrow: t(hero.eyebrow),
      image: s(hero.image),
      imageAlt: t(hero.imageAlt),
    },
    whatIsCork: {
      eyebrow: t(whatIsCork.eyebrow),
      title: t(whatIsCork.title),
      titleAccent: t(whatIsCork.titleAccent) || undefined,
      body: p(whatIsCork.body),
      image: s(whatIsCork.image),
      imageAlt: t(whatIsCork.imageAlt),
    },
    harvest: {
      eyebrow: t(harvest.eyebrow),
      title: t(harvest.title),
      titleAccent: t(harvest.titleAccent) || undefined,
      body: p(harvest.body),
      image: s(harvest.image),
      imageAlt: t(harvest.imageAlt),
    },
    inSildel: {
      eyebrow: t(inSildel.eyebrow),
      title: t(inSildel.title),
      titleAccent: t(inSildel.titleAccent) || undefined,
      body: p(inSildel.body),
      image: s(inSildel.image),
      imageAlt: t(inSildel.imageAlt),
    },
    biodiversity: {
      eyebrow: t(biodiversity.eyebrow),
      pullQuote: t(biodiversity.pullQuote),
      title: t(biodiversity.title),
      titleAccent: t(biodiversity.titleAccent) || undefined,
      body: p(biodiversity.body),
      image: s(biodiversity.image),
      imageAlt: t(biodiversity.imageAlt),
      facts: Array.isArray(biodiversity.facts)
        ? (biodiversity.facts as Array<{ value?: unknown; label?: unknown }>).map((f) => ({
            value: typeof f.value === "string" ? f.value : "",
            label: typeof f.label === "object" && f.label !== null
              ? readLocalizedText(f.label, locale)
              : typeof f.label === "string"
                ? f.label
                : "",
          }))
        : [],
    },
    bleeds: {
      afterWhatIsCork: { src: s(bleed1.src), alt: t(bleed1.alt) },
      afterHarvest: { src: s(bleed2.src), alt: t(bleed2.alt) },
      beforeInSildel: { src: s(bleed3.src), alt: t(bleed3.alt) },
    },
    properties: {
      eyebrow: t(properties.eyebrow),
      title: t(properties.title),
      titleAccent: t(properties.titleAccent) || undefined,
      body: t(properties.body),
      image: s(properties.image),
      imageAlt: t(properties.imageAlt),
      items: items(properties.items),
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