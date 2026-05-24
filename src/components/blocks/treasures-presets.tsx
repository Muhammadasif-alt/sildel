/**
 * Treasures preset block renderers.
 *
 * Treasures has its own provider that bundles both editorial content AND the
 * live product list — so the wrappers always pass `products: getProducts(locale)`
 * so the product grid still works regardless of which sections are mounted.
 */
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, list, itemStr, pickFromItem } from "./block-utils";
import {
  treasures,
  getProducts,
  type TreasuresContent,
} from "@/content/treasures";
import { TreasuresProvider } from "@/content/treasures-provider";
import { TreasuresHero } from "@/components/treasures/treasures-hero";
import { ProductGrid } from "@/components/treasures/product-grid";
import { FeaturedSpotlight } from "@/components/treasures/featured-spotlight";
import { Promise as PromiseSection } from "@/components/treasures/promise";
import { TreasuresCta } from "@/components/treasures/treasures-cta";

function wrap<K extends keyof TreasuresContent>(
  section: K,
  value: TreasuresContent[K],
  locale: Locale,
  children: React.ReactNode
) {
  const content = { ...treasures, [section]: value } as TreasuresContent;
  return (
    <TreasuresProvider content={content} products={getProducts(locale)}>
      {children}
    </TreasuresProvider>
  );
}

export function TreasuresHeroBlock({ block, locale }: { block: Block; locale: Locale }) {
  const value: TreasuresContent["hero"] = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    intro: loc(block, "intro", locale),
    image: str(block, "image") || treasures.hero.image,
    imageAlt: loc(block, "imageAlt", locale, treasures.hero.imageAlt),
    badge: {
      label: loc(block, "badgeLabel", locale, treasures.hero.badge.label),
      value: loc(block, "badgeValue", locale, treasures.hero.badge.value),
    },
  };
  return wrap("hero", value, locale, <TreasuresHero />);
}

export function TreasuresProductGridBlock({ block, locale }: { block: Block; locale: Locale }) {
  const items = list(block, "categories").map((it) => ({
    slug: itemStr(it, "slug"),
    label: pickFromItem(it, "label", locale),
  }));
  const categories: TreasuresContent["categories"] = {
    eyebrow: loc(block, "catEyebrow", locale, treasures.categories.eyebrow),
    title: loc(block, "catTitle", locale, treasures.categories.title),
    titleAccent: loc(block, "catTitleAccent", locale, treasures.categories.titleAccent),
    items: items.length ? items : treasures.categories.items,
  };
  const products: TreasuresContent["products"] = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
  };
  const content = { ...treasures, categories, products };
  return (
    <TreasuresProvider content={content} products={getProducts(locale)}>
      <ProductGrid />
    </TreasuresProvider>
  );
}

export function TreasuresFeaturedBlock({ block, locale }: { block: Block; locale: Locale }) {
  const specs = list(block, "specs").map((it) => ({
    label: pickFromItem(it, "label", locale),
    value: pickFromItem(it, "value", locale),
  }));
  const value: TreasuresContent["featured"] = {
    eyebrow: loc(block, "eyebrow", locale),
    label: loc(block, "label", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    image: str(block, "image") || treasures.featured.image,
    imageAlt: loc(block, "imageAlt", locale, treasures.featured.imageAlt),
    specs: specs.length ? specs : treasures.featured.specs,
    cta: {
      label: loc(block, "ctaLabel", locale, treasures.featured.cta.label),
      href: str(block, "ctaHref") || treasures.featured.cta.href,
    },
  };
  return wrap("featured", value, locale, <FeaturedSpotlight />);
}

export function TreasuresPromiseBlock({ block, locale }: { block: Block; locale: Locale }) {
  const items = list(block, "items").map((it) => ({
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
  }));
  const value: TreasuresContent["promise"] = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    items: items.length ? items : treasures.promise.items,
  };
  return wrap("promise", value, locale, <PromiseSection />);
}

export function TreasuresCtaBlock({ block, locale }: { block: Block; locale: Locale }) {
  const destinations = list(block, "destinations").map((it) => ({
    eyebrow: pickFromItem(it, "eyebrow", locale),
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
    image: itemStr(it, "image"),
    imageAlt: pickFromItem(it, "imageAlt", locale),
    href: itemStr(it, "href"),
    cta: pickFromItem(it, "cta", locale),
  }));
  const value: TreasuresContent["cta"] = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    destinations: destinations.length ? destinations : treasures.cta.destinations,
    closingLine: loc(block, "closingLine", locale),
  };
  return wrap("cta", value, locale, <TreasuresCta />);
}
