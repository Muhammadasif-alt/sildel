/**
 * You Think Cork preset block renderers.
 */
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, list, itemStr, pickFromItem } from "./block-utils";
import { youThinkCork, type YouThinkCorkContent } from "@/content/you-think-cork";
import { YouThinkCorkProvider } from "@/content/you-think-cork-provider";
import { YtHero } from "@/components/you-think-cork/yt-hero";
import { Perception } from "@/components/you-think-cork/perception";
import { Manifesto } from "@/components/you-think-cork/manifesto";
import { Showcase } from "@/components/you-think-cork/showcase";
import { Possibilities } from "@/components/you-think-cork/possibilities";
import { YtCta } from "@/components/you-think-cork/yt-cta";

function provider<K extends keyof YouThinkCorkContent>(
  section: K,
  value: YouThinkCorkContent[K]
): YouThinkCorkContent {
  return { ...youThinkCork, [section]: value } as YouThinkCorkContent;
}

export function YtHeroBlock({ block, locale }: { block: Block; locale: Locale }) {
  const data = provider("hero", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    intro: loc(block, "intro", locale),
    image: str(block, "image") || youThinkCork.hero.image,
    imageAlt: loc(block, "imageAlt", locale, youThinkCork.hero.imageAlt),
  });
  return (
    <YouThinkCorkProvider data={data}>
      <YtHero />
    </YouThinkCorkProvider>
  );
}

export function PerceptionBlock({ block, locale }: { block: Block; locale: Locale }) {
  const cards = list(block, "cards").map((it) => ({
    index: itemStr(it, "index"),
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
    tone: itemStr(it, "tone", "during"),
  }));
  const data = provider("perception", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    cards: cards.length ? cards : youThinkCork.perception.cards,
  });
  return (
    <YouThinkCorkProvider data={data}>
      <Perception />
    </YouThinkCorkProvider>
  );
}

export function ManifestoBlock({ block, locale }: { block: Block; locale: Locale }) {
  const linesText = loc(block, "lines", locale);
  const lines = linesText.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const data = provider("manifesto", {
    eyebrow: loc(block, "eyebrow", locale),
    image: str(block, "image"),
    imageAlt: loc(block, "imageAlt", locale, youThinkCork.manifesto.imageAlt),
    lead: loc(block, "lead", locale),
    lines: lines.length ? lines : youThinkCork.manifesto.lines,
    closing: loc(block, "closing", locale),
    signature: loc(block, "signature", locale),
  });
  return (
    <YouThinkCorkProvider data={data}>
      <Manifesto />
    </YouThinkCorkProvider>
  );
}

export function ShowcaseBlock({ block, locale }: { block: Block; locale: Locale }) {
  const items = list(block, "items").map((it) => ({
    title: pickFromItem(it, "title", locale),
    tagline: pickFromItem(it, "tagline", locale),
    image: itemStr(it, "image"),
  }));
  const data = provider("showcase", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    items: items.length ? items : youThinkCork.showcase.items,
  });
  return (
    <YouThinkCorkProvider data={data}>
      <Showcase />
    </YouThinkCorkProvider>
  );
}

export function PossibilitiesBlock({ block, locale }: { block: Block; locale: Locale }) {
  const items = list(block, "items").map((it) => ({
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
    image: itemStr(it, "image"),
  }));
  const data = provider("possibilities", {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    items: items.length ? items : youThinkCork.possibilities.items,
  });
  return (
    <YouThinkCorkProvider data={data}>
      <Possibilities />
    </YouThinkCorkProvider>
  );
}

export function YtCtaBlock({ block, locale }: { block: Block; locale: Locale }) {
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
    destinations: destinations.length ? destinations : youThinkCork.cta.destinations,
    closingLine: loc(block, "closingLine", locale),
  });
  return (
    <YouThinkCorkProvider data={data}>
      <YtCta />
    </YouThinkCorkProvider>
  );
}
