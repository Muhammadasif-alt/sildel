import "server-only";
import { Beaker, Leaf, Settings, type LucideIcon } from "lucide-react";
import { getYouThinkCorkEditorial } from "@/content/you-think-cork.editorial";
import type { Locale } from "@/lib/i18n/config";
import { loadEditorialContent } from "../load";
import type { StorySectionData } from "@/components/our-story/story-section";
import type { YtcPillar } from "@/components/you-think-cork/ytc-pillars";
import type {
  EditorialContentDoc,
  LocalizedParagraphs,
  LocalizedText,
  TitledListItem,
} from "../types";

// Pillar icons are fixed in code — founder picks order/labels, the
// first three rows in her titledList get these icons (the page only
// renders three pillars in practice; if she adds a fourth it falls
// through to the last icon).
const PILLAR_ICONS: LucideIcon[] = [Beaker, Leaf, Settings];

export type YouThinkCorkRendered = {
  hero: { eyebrow: string; image: string; imageAlt: string };
  intro: StorySectionData;
  bleed: { src: string; alt: string };
  innovate: StorySectionData;
  banner: string;
  pillars: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    body: string;
    image: string;
    imageAlt: string;
    items: YtcPillar[];
  };
  contactCta: {
    eyebrow: string;
    heading: string;
    image: string;
    imageAlt: string;
  };
};

export async function resolveYouThinkCork(
  locale: Locale,
): Promise<YouThinkCorkRendered> {
  const stored = await loadEditorialContent("you-think-cork");
  if (stored) return fromDb(stored, locale);
  return fromTs(locale);
}

/* ---------- TS fallback ---------- */

function fromTs(locale: Locale): YouThinkCorkRendered {
  const c = getYouThinkCorkEditorial(locale);

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
    bleed: c.bleed,
    innovate: {
      eyebrow: c.innovate.eyebrow,
      title: c.innovate.title,
      titleAccent: c.innovate.titleAccent,
      body: c.innovate.body,
      image: c.innovate.image,
      imageAlt: c.innovate.imageAlt,
    },
    banner: c.banner.line,
    pillars: {
      eyebrow: c.pillars.eyebrow,
      title: c.pillars.title,
      titleAccent: c.pillars.titleAccent,
      body: c.pillars.body,
      image: c.pillars.image,
      imageAlt: c.pillars.imageAlt,
      items: c.pillars.items.map((item, i) => ({
        icon: PILLAR_ICONS[i] ?? PILLAR_ICONS[PILLAR_ICONS.length - 1],
        title: item.title,
        body: item.body,
      })),
    },
    contactCta: c.contactCta,
  };
}

/* ---------- DB shape ---------- */

function fromDb(
  db: EditorialContentDoc,
  locale: Locale,
): YouThinkCorkRendered {
  const t = (v: unknown) => readLocalizedText(v, locale);
  const p = (v: unknown) => readLocalizedParagraphs(v, locale);
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const items = (v: unknown): YtcPillar[] =>
    Array.isArray(v)
      ? (v as TitledListItem[]).map((row, i) => ({
          icon: PILLAR_ICONS[i] ?? PILLAR_ICONS[PILLAR_ICONS.length - 1],
          title: row.title?.[locale] ?? "",
          body: row.body?.[locale] ?? "",
        }))
      : [];

  const hero = db.hero ?? {};
  const intro = db.intro ?? {};
  const bleed = db.bleed ?? {};
  const innovate = db.innovate ?? {};
  const banner = db.banner ?? {};
  const pillars = db.pillars ?? {};
  const contactCta = db.contactCta ?? {};

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
    bleed: { src: s(bleed.src), alt: t(bleed.alt) },
    innovate: {
      eyebrow: t(innovate.eyebrow),
      title: t(innovate.title),
      titleAccent: t(innovate.titleAccent) || undefined,
      body: p(innovate.body),
      image: s(innovate.image),
      imageAlt: t(innovate.imageAlt),
    },
    banner: t(banner.line),
    pillars: {
      eyebrow: t(pillars.eyebrow),
      title: t(pillars.title),
      titleAccent: t(pillars.titleAccent) || undefined,
      body: t(pillars.body),
      image: s(pillars.image),
      imageAlt: t(pillars.imageAlt),
      items: items(pillars.items),
    },
    contactCta: {
      eyebrow: t(contactCta.eyebrow),
      heading: t(contactCta.heading),
      image: s(contactCta.image),
      imageAlt: t(contactCta.imageAlt),
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