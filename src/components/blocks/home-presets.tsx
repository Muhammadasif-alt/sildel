/**
 * Home page preset block renderers. Each preset reads its CMS content from
 * `block.content` (already localized at the call-site by `loc()`) and feeds
 * the existing custom component, so the visual design is unchanged.
 */
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, list, itemStr, pickFromItem } from "./block-utils";
import { ShopCategories } from "@/components/home/shop-categories";
import { FeaturedTreasures } from "@/components/home/featured-treasures";
import { WhySildel } from "@/components/home/why-sildel";
import { BrandVideo } from "@/components/home/brand-video";
import { Sustainability } from "@/components/home/sustainability";
import { Newsletter } from "@/components/home/newsletter";
import { HeroSlider } from "@/components/home/hero-slider";
import { getHome } from "@/content/home";

// Home hero — editorial cream-stage slider (text + product) with a static
// four-pillar feature strip beneath. CMS heroShop fields are bypassed in
// favour of the locale-aware heroSlider + heroFeatures content.
export function HomeHeroShopBlock({ block: _block, locale }: { block: Block; locale: Locale }) {
  const content = getHome(locale);
  return <HeroSlider slides={content.heroSlider} features={content.heroFeatures} />;
}

export function HomeShopCategoriesBlock({ block, locale }: { block: Block; locale: Locale }) {
  const data = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    piecesSuffix: loc(block, "piecesSuffix", locale),
    categories: {
      sculpture: {
        label: loc(block, "sculptureLabel", locale),
        tagline: loc(block, "sculptureTagline", locale),
      },
      tables: {
        label: loc(block, "tablesLabel", locale),
        tagline: loc(block, "tablesTagline", locale),
      },
      lighting: {
        label: loc(block, "lightingLabel", locale),
        tagline: loc(block, "lightingTagline", locale),
      },
      fineArts: {
        label: loc(block, "fineArtsLabel", locale),
        tagline: loc(block, "fineArtsTagline", locale),
      },
    },
  };
  return <ShopCategories data={data} />;
}

export function HomeFeaturedTreasuresBlock({ block, locale }: { block: Block; locale: Locale }) {
  const data = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    viewAll: loc(block, "viewAll", locale),
    viewTreasure: loc(block, "viewTreasure", locale),
  };
  return <FeaturedTreasures data={data} />;
}

export function HomeWhySildelBlock({ block, locale }: { block: Block; locale: Locale }) {
  const statsItems = list(block, "stats");
  const pillarsItems = list(block, "pillars");

  const data = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    stats: statsItems.map((it) => ({
      value: typeof it.value === "number" ? it.value : Number(it.value) || 0,
      suffix: itemStr(it, "suffix"),
      label: pickFromItem(it, "label", locale),
    })),
    pillars: pillarsItems.map((it) => ({
      index: itemStr(it, "index"),
      title: pickFromItem(it, "title", locale),
      body: pickFromItem(it, "body", locale),
    })),
  };
  return <WhySildel data={data} />;
}

export function HomeBrandVideoBlock({ block, locale }: { block: Block; locale: Locale }) {
  const data = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    youtubeId: str(block, "youtubeId"),
    duration: loc(block, "duration", locale),
  };
  return <BrandVideo data={data} />;
}

export function HomeSustainabilityBlock({ block, locale }: { block: Block; locale: Locale }) {
  const stepsItems = list(block, "steps");

  const data = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    image: str(block, "image"),
    imageAlt: loc(block, "imageAlt", locale),
    steps: stepsItems.map((it) => ({
      number: itemStr(it, "number"),
      title: pickFromItem(it, "title", locale),
      body: pickFromItem(it, "body", locale),
      image: itemStr(it, "image"),
    })),
    cta: {
      label: loc(block, "ctaLabel", locale),
      href: str(block, "ctaHref") || "/authentic-cork",
    },
  };
  return <Sustainability data={data} />;
}

export function HomeNewsletterBlock({ block, locale }: { block: Block; locale: Locale }) {
  const data = {
    eyebrow: loc(block, "eyebrow", locale),
    title: loc(block, "title", locale),
    titleAccent: loc(block, "titleAccent", locale),
    body: loc(block, "body", locale),
    placeholder: loc(block, "placeholder", locale),
    cta: loc(block, "cta", locale),
    loadingLabel: loc(block, "loadingLabel", locale),
    successTitle: loc(block, "successTitle", locale),
    successBody: loc(block, "successBody", locale),
    errorMessage: loc(block, "errorMessage", locale),
    privacyNote: loc(block, "privacyNote", locale),
  };
  return <Newsletter data={data} />;
}
