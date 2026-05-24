/**
 * Authentic Cork preset block renderers. Pattern matches our-story-presets.tsx:
 * each preset feeds the existing section component via `AuthenticCorkProvider`
 * with only its own slice filled in from CMS content.
 */
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, list, itemStr, pickFromItem } from "./block-utils";
import { authenticCork, type AuthenticCorkContent } from "@/content/authentic-cork";
import { AuthenticCorkProvider } from "@/content/authentic-cork-provider";
import { CorkHero } from "@/components/authentic-cork/cork-hero";
import { WhatIsCork } from "@/components/authentic-cork/what-is-cork";
import { Properties } from "@/components/authentic-cork/properties";
import { HarvestProcess } from "@/components/authentic-cork/harvest-process";
import { CorkInSildel } from "@/components/authentic-cork/cork-in-sildel";
import { CorkCta } from "@/components/authentic-cork/cork-cta";

function provider<K extends keyof AuthenticCorkContent>(
  section: K,
  value: AuthenticCorkContent[K]
): AuthenticCorkContent {
  return { ...authenticCork, [section]: value } as AuthenticCorkContent;
}

export function CorkHeroBlock({ block, locale }: { block: Block; locale: Locale }) {
  const data = provider("hero", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    intro: loc(block, "intro", locale),
    image: str(block, "image") || authenticCork.hero.image,
    imageAlt: loc(block, "imageAlt", locale, authenticCork.hero.imageAlt),
  });
  return (
    <AuthenticCorkProvider data={data}>
      <CorkHero />
    </AuthenticCorkProvider>
  );
}

export function WhatIsCorkBlock({ block, locale }: { block: Block; locale: Locale }) {
  const bodyText = loc(block, "body", locale);
  const data = provider("whatIsCork", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: bodyText.split(/\n\n+/).filter(Boolean),
    image: str(block, "image") || authenticCork.whatIsCork.image,
    imageAlt: loc(block, "imageAlt", locale, authenticCork.whatIsCork.imageAlt),
    callout: {
      label: loc(block, "calloutLabel", locale, authenticCork.whatIsCork.callout.label),
      value: loc(block, "calloutValue", locale, authenticCork.whatIsCork.callout.value),
    },
  });
  return (
    <AuthenticCorkProvider data={data}>
      <WhatIsCork />
    </AuthenticCorkProvider>
  );
}

export function CorkPropertiesBlock({ block, locale }: { block: Block; locale: Locale }) {
  const items = list(block, "items").map((it) => ({
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
  }));
  const data = provider("properties", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    items: items.length ? items : authenticCork.properties.items,
  });
  return (
    <AuthenticCorkProvider data={data}>
      <Properties />
    </AuthenticCorkProvider>
  );
}

export function CorkHarvestBlock({ block, locale }: { block: Block; locale: Locale }) {
  const images = list(block, "images").map((it) => ({
    src: itemStr(it, "image") || "",
    alt: pickFromItem(it, "alt", locale),
  }));
  const steps = list(block, "steps").map((it) => ({
    number: itemStr(it, "number"),
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
  }));
  const data = provider("harvest", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    images: images.length ? images : authenticCork.harvest.images,
    steps: steps.length ? steps : authenticCork.harvest.steps,
  });
  return (
    <AuthenticCorkProvider data={data}>
      <HarvestProcess />
    </AuthenticCorkProvider>
  );
}

export function CorkInSildelBlock({ block, locale }: { block: Block; locale: Locale }) {
  const points = list(block, "points")
    .map((it) => pickFromItem(it, "text", locale))
    .filter(Boolean);
  const data = provider("inSildel", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    image: str(block, "image") || authenticCork.inSildel.image,
    imageAlt: loc(block, "imageAlt", locale, authenticCork.inSildel.imageAlt),
    points: points.length ? points : authenticCork.inSildel.points,
  });
  return (
    <AuthenticCorkProvider data={data}>
      <CorkInSildel />
    </AuthenticCorkProvider>
  );
}

export function CorkCtaBlock({ block, locale }: { block: Block; locale: Locale }) {
  const destinations = list(block, "destinations").map((it) => ({
    eyebrow: pickFromItem(it, "eyebrow", locale),
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
    image: itemStr(it, "image"),
    imageAlt: pickFromItem(it, "imageAlt", locale),
    href: itemStr(it, "href"),
    cta: pickFromItem(it, "cta", locale),
  }));
  const data = provider("cta", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    destinations: destinations.length ? destinations : authenticCork.cta.destinations,
    closingLine: loc(block, "closingLine", locale),
  });
  return (
    <AuthenticCorkProvider data={data}>
      <CorkCta />
    </AuthenticCorkProvider>
  );
}