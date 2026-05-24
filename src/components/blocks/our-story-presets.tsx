/**
 * Our Story preset block renderers. Each preset reads block.content (already
 * localized per-key by the seed/admin) and feeds the existing section component
 * through `OurStoryProvider`. Other sections in the provider keep the EN
 * defaults — they're never rendered because each preset only mounts one.
 */
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, list, itemStr, pickFromItem } from "./block-utils";
import { ourStory, type OurStoryContent } from "@/content/our-story";
import { OurStoryProvider } from "@/content/our-story-provider";
import { StoryHero } from "@/components/our-story/story-hero";
import { Origin } from "@/components/our-story/origin";
import { BrandSymbol } from "@/components/our-story/symbol";
import { Heritage } from "@/components/our-story/heritage";
import { Atelier } from "@/components/our-story/atelier";
import { Founder } from "@/components/our-story/founder";
import { Values } from "@/components/our-story/values";
import { StoryCta } from "@/components/our-story/story-cta";

function provider<K extends keyof OurStoryContent>(
  section: K,
  value: OurStoryContent[K]
): OurStoryContent {
  return { ...ourStory, [section]: value } as OurStoryContent;
}

export function OurStoryHeroBlock({ block, locale }: { block: Block; locale: Locale }) {
  const data = provider("hero", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    intro: loc(block, "intro", locale),
    image: str(block, "image") || ourStory.hero.image,
    imageAlt: loc(block, "imageAlt", locale, ourStory.hero.imageAlt),
  });
  return (
    <OurStoryProvider data={data}>
      <StoryHero />
    </OurStoryProvider>
  );
}

export function OurStoryOriginBlock({ block, locale }: { block: Block; locale: Locale }) {
  const bodyText = loc(block, "body", locale);
  const data = provider("origin", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: bodyText.split(/\n\n+/).filter(Boolean),
    image: str(block, "image") || ourStory.origin.image,
    imageAlt: loc(block, "imageAlt", locale, ourStory.origin.imageAlt),
    year: loc(block, "year", locale, ourStory.origin.year),
  });
  return (
    <OurStoryProvider data={data}>
      <Origin />
    </OurStoryProvider>
  );
}

export function OurStorySymbolBlock({ block, locale }: { block: Block; locale: Locale }) {
  const bodyText = loc(block, "body", locale);
  const facts = list(block, "facts").map((it) => ({
    value: itemStr(it, "value"),
    label: pickFromItem(it, "label", locale),
  }));
  const data = provider("symbol", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: bodyText.split(/\n\n+/).filter(Boolean),
    image: str(block, "image") || ourStory.symbol.image,
    imageAlt: loc(block, "imageAlt", locale, ourStory.symbol.imageAlt),
    facts: facts.length ? facts : ourStory.symbol.facts,
  });
  return (
    <OurStoryProvider data={data}>
      <BrandSymbol />
    </OurStoryProvider>
  );
}

export function OurStoryHeritageBlock({ block, locale }: { block: Block; locale: Locale }) {
  const slides = list(block, "slides").map((it) => ({
    src: itemStr(it, "image") || "",
    alt: pickFromItem(it, "alt", locale),
    eyebrow: pickFromItem(it, "eyebrow", locale),
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
    keywords: itemStr(it, "keywords"),
  }));
  const facts = list(block, "facts").map((it) => ({
    value: itemStr(it, "value"),
    label: pickFromItem(it, "label", locale),
  }));
  const data = provider("heritage", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    images: slides.length ? slides : ourStory.heritage.images,
    facts: facts.length ? facts : ourStory.heritage.facts,
  });
  return (
    <OurStoryProvider data={data}>
      <Heritage />
    </OurStoryProvider>
  );
}

export function OurStoryAtelierBlock({ block, locale }: { block: Block; locale: Locale }) {
  const slides = list(block, "slides").map((it) => ({
    src: itemStr(it, "image") || "",
    alt: pickFromItem(it, "alt", locale),
    eyebrow: pickFromItem(it, "eyebrow", locale),
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
    keywords: itemStr(it, "keywords"),
  }));
  const steps = list(block, "steps").map((it) => ({
    number: itemStr(it, "number"),
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
  }));
  const data = provider("atelier", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    images: slides.length ? slides : ourStory.atelier.images,
    steps: steps.length ? steps : ourStory.atelier.steps,
  });
  return (
    <OurStoryProvider data={data}>
      <Atelier />
    </OurStoryProvider>
  );
}

export function OurStoryFounderBlock({ block, locale }: { block: Block; locale: Locale }) {
  const bodyText = loc(block, "body", locale);
  const data = provider("founder", {
    eyebrow: loc(block, "eyebrow", locale),
    pullQuote: loc(block, "pullQuote", locale),
    body: bodyText.split(/\n\n+/).filter(Boolean),
    closing: loc(block, "closing", locale),
    image: str(block, "image") || ourStory.founder.image,
    imageAlt: loc(block, "imageAlt", locale, ourStory.founder.imageAlt),
    signature: {
      name: loc(block, "signatureName", locale, ourStory.founder.signature.name),
      role: loc(block, "signatureRole", locale, ourStory.founder.signature.role),
    },
  });
  return (
    <OurStoryProvider data={data}>
      <Founder />
    </OurStoryProvider>
  );
}

export function OurStoryValuesBlock({ block, locale }: { block: Block; locale: Locale }) {
  const pillars = list(block, "pillars").map((it) => ({
    index: itemStr(it, "index"),
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
  }));
  const data = provider("values", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    pillars: pillars.length ? pillars : ourStory.values.pillars,
    quote: loc(block, "quote", locale),
    quoteAuthor: loc(block, "quoteAuthor", locale),
  });
  return (
    <OurStoryProvider data={data}>
      <Values />
    </OurStoryProvider>
  );
}

export function OurStoryCtaBlock({ block, locale }: { block: Block; locale: Locale }) {
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
    destinations: destinations.length ? destinations : ourStory.cta.destinations,
    closingLine: loc(block, "closingLine", locale),
  });
  return (
    <OurStoryProvider data={data}>
      <StoryCta />
    </OurStoryProvider>
  );
}
