/**
 * Server-side block renderer. Reads blocks for a page and renders each one
 * with the appropriate component. Pre-fetches any products referenced by
 * productShowcase blocks in a single round-trip.
 */
import { getPageBlocks } from "@/lib/content/page-blocks";
import { prisma } from "@/lib/db/prisma";
import { getLocale } from "@/lib/i18n/get-locale";
import type { Block, Locale } from "@/lib/blocks/types";

import { HeroBlock } from "./hero-block";
import { PageHeaderBlock } from "./page-header-block";
import { ImageTextBlock } from "./image-text-block";
import { RichTextBlock } from "./rich-text-block";
import { StatsBlock } from "./stats-block";
import { GalleryBlock } from "./gallery-block";
import { FaqBlock } from "./faq-block";
import { TestimonialsBlock } from "./testimonials-block";
import { VideoEmbedBlock } from "./video-embed-block";
import { CtaBannerBlock } from "./cta-banner-block";
import { ProcessStepsBlock } from "./process-steps-block";
import { SpacerBlock } from "./spacer-block";
import { CustomHtmlBlock } from "./custom-html-block";
import { ProductShowcaseBlock, type ShowcaseProduct } from "./product-showcase-block";
import {
  HomeHeroShopBlock,
  HomeShopCategoriesBlock,
  HomeFeaturedTreasuresBlock,
  HomeWhySildelBlock,
  HomeBrandVideoBlock,
  HomeSustainabilityBlock,
  HomeNewsletterBlock,
} from "./home-presets";
import {
  OurStoryHeroBlock,
  OurStoryOriginBlock,
  OurStorySymbolBlock,
  OurStoryHeritageBlock,
  OurStoryAtelierBlock,
  OurStoryFounderBlock,
  OurStoryValuesBlock,
  OurStoryCtaBlock,
} from "./our-story-presets";
import {
  CorkHeroBlock,
  WhatIsCorkBlock,
  CorkPropertiesBlock,
  CorkHarvestBlock,
  CorkInSildelBlock,
  CorkCtaBlock,
} from "./authentic-cork-presets";
import {
  YtHeroBlock,
  PerceptionBlock,
  ManifestoBlock,
  ShowcaseBlock,
  PossibilitiesBlock,
  YtCtaBlock,
} from "./you-think-cork-presets";
import {
  TreasuresHeroBlock,
  TreasuresProductGridBlock,
  TreasuresFeaturedBlock,
  TreasuresPromiseBlock,
  TreasuresCtaBlock,
} from "./treasures-presets";
import {
  BlogHeroBlock,
  BlogFeaturedBlock,
  BlogGridBlock,
} from "./blog-presets";
import {
  ContactHeroBlock,
  ContactFormBlock,
  ContactVisitBlock,
  ContactFaqBlock,
} from "./contact-presets";

export async function BlocksRenderer({
  pageKey,
  fallback,
  skipTypes,
}: {
  pageKey: string;
  /** Rendered if the page has no blocks yet — keeps pre-CMS pages working. */
  fallback?: React.ReactNode;
  /** Optional set of block types to filter out before rendering. Used on
   *  the home page so we can render the hero block manually first,
   *  drop the new AtelierIntro section between hero and shop, then
   *  let BlocksRenderer paint the remaining CMS blocks. */
  skipTypes?: readonly string[];
}) {
  const [allBlocks, locale] = await Promise.all([
    getPageBlocks(pageKey),
    getLocale(),
  ]);
  const skip = skipTypes && skipTypes.length ? new Set(skipTypes) : null;
  const blocks = skip
    ? allBlocks.filter((b) => !skip.has(b.type))
    : allBlocks;
  if (!blocks.length) return <>{fallback ?? null}</>;

  const products = await loadShowcaseProducts(blocks);

  return (
    <>
      {blocks.map((b) => (
        <BlockRender key={b.id} block={b} locale={locale} products={products} />
      ))}
    </>
  );
}

async function loadShowcaseProducts(blocks: Block[]): Promise<Map<string, ShowcaseProduct>> {
  const slugs = new Set<string>();
  for (const b of blocks) {
    if (b.type !== "productShowcase") continue;
    const raw = b.content?.productSlugs;
    if (typeof raw !== "string") continue;
    raw.split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => slugs.add(s));
  }
  if (slugs.size === 0) return new Map();

  try {
    const rows = await prisma.product.findMany({
      where: { slug: { in: Array.from(slugs) } },
      select: {
        slug: true,
        name: true,
        tagline: true,
        image: true,
        priceCents: true,
        currency: true,
      },
    });
    const map = new Map<string, ShowcaseProduct>();
    for (const d of rows) {
      map.set(d.slug, {
        slug: d.slug,
        name: d.name,
        tagline: d.tagline ?? "",
        image: d.image,
        priceCents: d.priceCents,
        currency: d.currency ?? "EUR",
      });
    }
    return map;
  } catch {
    return new Map();
  }
}

function BlockRender({
  block,
  locale,
  products,
}: {
  block: Block;
  locale: Locale;
  products: Map<string, ShowcaseProduct>;
}) {
  switch (block.type) {
    case "hero":
      return <HeroBlock block={block} locale={locale} />;
    case "pageHeader":
      return <PageHeaderBlock block={block} locale={locale} />;
    case "imageText":
      return <ImageTextBlock block={block} locale={locale} />;
    case "richText":
      return <RichTextBlock block={block} locale={locale} />;
    case "stats":
      return <StatsBlock block={block} locale={locale} />;
    case "gallery":
      return <GalleryBlock block={block} locale={locale} />;
    case "faq":
      return <FaqBlock block={block} locale={locale} />;
    case "testimonials":
      return <TestimonialsBlock block={block} locale={locale} />;
    case "videoEmbed":
      return <VideoEmbedBlock block={block} locale={locale} />;
    case "ctaBanner":
      return <CtaBannerBlock block={block} locale={locale} />;
    case "processSteps":
      return <ProcessStepsBlock block={block} locale={locale} />;
    case "productShowcase":
      return <ProductShowcaseBlock block={block} locale={locale} products={products} />;
    case "spacer":
      return <SpacerBlock block={block} />;
    case "customHtml":
      return <CustomHtmlBlock block={block} locale={locale} />;
    case "home.heroShop":
      return <HomeHeroShopBlock block={block} locale={locale} />;
    case "home.shopCategories":
      return <HomeShopCategoriesBlock block={block} locale={locale} />;
    case "home.featuredTreasures":
      return <HomeFeaturedTreasuresBlock block={block} locale={locale} />;
    case "home.whySildel":
      return <HomeWhySildelBlock block={block} locale={locale} />;
    case "home.brandVideo":
      return <HomeBrandVideoBlock block={block} locale={locale} />;
    case "home.sustainability":
      return <HomeSustainabilityBlock block={block} locale={locale} />;
    case "home.newsletter":
      return <HomeNewsletterBlock block={block} locale={locale} />;

    case "ourStory.hero":
      return <OurStoryHeroBlock block={block} locale={locale} />;
    case "ourStory.origin":
      return <OurStoryOriginBlock block={block} locale={locale} />;
    case "ourStory.symbol":
      return <OurStorySymbolBlock block={block} locale={locale} />;
    case "ourStory.heritage":
      return <OurStoryHeritageBlock block={block} locale={locale} />;
    case "ourStory.atelier":
      return <OurStoryAtelierBlock block={block} locale={locale} />;
    case "ourStory.founder":
      return <OurStoryFounderBlock block={block} locale={locale} />;
    case "ourStory.values":
      return <OurStoryValuesBlock block={block} locale={locale} />;
    case "ourStory.cta":
      return <OurStoryCtaBlock block={block} locale={locale} />;

    case "authenticCork.hero":
      return <CorkHeroBlock block={block} locale={locale} />;
    case "authenticCork.whatIsCork":
      return <WhatIsCorkBlock block={block} locale={locale} />;
    case "authenticCork.properties":
      return <CorkPropertiesBlock block={block} locale={locale} />;
    case "authenticCork.harvest":
      return <CorkHarvestBlock block={block} locale={locale} />;
    case "authenticCork.inSildel":
      return <CorkInSildelBlock block={block} locale={locale} />;
    case "authenticCork.cta":
      return <CorkCtaBlock block={block} locale={locale} />;

    case "youThinkCork.hero":
      return <YtHeroBlock block={block} locale={locale} />;
    case "youThinkCork.perception":
      return <PerceptionBlock block={block} locale={locale} />;
    case "youThinkCork.manifesto":
      return <ManifestoBlock block={block} locale={locale} />;
    case "youThinkCork.showcase":
      return <ShowcaseBlock block={block} locale={locale} />;
    case "youThinkCork.possibilities":
      return <PossibilitiesBlock block={block} locale={locale} />;
    case "youThinkCork.cta":
      return <YtCtaBlock block={block} locale={locale} />;

    case "treasures.hero":
      return <TreasuresHeroBlock block={block} locale={locale} />;
    case "treasures.productGrid":
      return <TreasuresProductGridBlock block={block} locale={locale} />;
    case "treasures.featured":
      return <TreasuresFeaturedBlock block={block} locale={locale} />;
    case "treasures.promise":
      return <TreasuresPromiseBlock block={block} locale={locale} />;
    case "treasures.cta":
      return <TreasuresCtaBlock block={block} locale={locale} />;

    case "blog.hero":
      return <BlogHeroBlock block={block} locale={locale} />;
    case "blog.featured":
      return <BlogFeaturedBlock block={block} locale={locale} />;
    case "blog.grid":
      return <BlogGridBlock block={block} locale={locale} />;

    case "contact.hero":
      return <ContactHeroBlock block={block} locale={locale} />;
    case "contact.form":
      return <ContactFormBlock block={block} locale={locale} />;
    case "contact.visit":
      return <ContactVisitBlock block={block} locale={locale} />;
    case "contact.faq":
      return <ContactFaqBlock block={block} locale={locale} />;

    default:
      return null;
  }
}
