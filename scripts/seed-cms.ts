/**
 * Seed the CMS — populates:
 *   1. SiteSettings (header / footer / nav / social / contact / brand video)
 *   2. Home page blocks — converts every hardcoded section in
 *      `src/content/home.en.ts` + `home.pt.ts` into editable CMS blocks.
 *
 * Idempotent: re-running upserts by pageKey / singletonKey.
 *
 * Run with:  npm run seed:cms
 */
import { config as loadEnv } from "dotenv";
import path from "path";
// Next.js stores secrets in `.env.local`; tsx scripts must load it explicitly.
loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv({ path: path.resolve(process.cwd(), ".env") });

import { randomUUID } from "crypto";
import { connectDb } from "../src/lib/db/connect";
import { SiteSettingsModel } from "../src/lib/models/site-settings.model";
import { PageContentModel } from "../src/lib/models/page-content.model";
import { DEFAULT_SITE_SETTINGS } from "../src/lib/content/site-settings-defaults";
import { homeEn } from "../src/content/home.en";
import { homePt } from "../src/content/home.pt";
import { ourStoryEn } from "../src/content/our-story.en";
import { ourStoryPt } from "../src/content/our-story.pt";
import { authenticCorkEn } from "../src/content/authentic-cork.en";
import { authenticCorkPt } from "../src/content/authentic-cork.pt";
import { youThinkCorkEn } from "../src/content/you-think-cork.en";
import { youThinkCorkPt } from "../src/content/you-think-cork.pt";
import { treasures as treasuresEn, treasuresPt } from "../src/content/treasures";

type Loc = { pt: string; en: string };
const loc = (pt: string, en: string): Loc => ({ pt, en });

function buildHomeBlocks() {
  const en = homeEn;
  const pt = homePt;

  return [
    {
      id: randomUUID(),
      type: "home.heroShop",
      order: 0,
      hidden: false,
      content: {
        eyebrow: loc(pt.heroShop.eyebrow, en.heroShop.eyebrow),
        titleLine1: loc(pt.heroShop.titleLines[0], en.heroShop.titleLines[0]),
        titleLine2: loc(pt.heroShop.titleLines[1], en.heroShop.titleLines[1]),
        titleLine3: loc(pt.heroShop.titleLines[2], en.heroShop.titleLines[2]),
        description: loc(pt.heroShop.description, en.heroShop.description),
        ctaPrimary: loc(pt.heroShop.ctaPrimary, en.heroShop.ctaPrimary),
        ctaSecondary: loc(pt.heroShop.ctaSecondary, en.heroShop.ctaSecondary),
        socialProof: loc(pt.heroShop.socialProof, en.heroShop.socialProof),
        featuredLabel: loc(pt.heroShop.featuredLabel, en.heroShop.featuredLabel),
        stripLeft: loc(pt.heroShop.bottomStrip.left, en.heroShop.bottomStrip.left),
        stripMiddle: loc(pt.heroShop.bottomStrip.middle, en.heroShop.bottomStrip.middle),
        stripRight: loc(pt.heroShop.bottomStrip.right, en.heroShop.bottomStrip.right),
      },
    },
    {
      id: randomUUID(),
      type: "home.shopCategories",
      order: 1,
      hidden: false,
      content: {
        eyebrow: loc(pt.shopCategoriesSection.eyebrow, en.shopCategoriesSection.eyebrow),
        title: loc(pt.shopCategoriesSection.title, en.shopCategoriesSection.title),
        titleAccent: loc(pt.shopCategoriesSection.titleAccent, en.shopCategoriesSection.titleAccent),
        body: loc(pt.shopCategoriesSection.body, en.shopCategoriesSection.body),
        piecesSuffix: loc(pt.shopCategoriesSection.piecesSuffix, en.shopCategoriesSection.piecesSuffix),
        sculptureLabel: loc(pt.shopCategoriesSection.categories.sculpture.label, en.shopCategoriesSection.categories.sculpture.label),
        sculptureTagline: loc(pt.shopCategoriesSection.categories.sculpture.tagline, en.shopCategoriesSection.categories.sculpture.tagline),
        tablesLabel: loc(pt.shopCategoriesSection.categories.tables.label, en.shopCategoriesSection.categories.tables.label),
        tablesTagline: loc(pt.shopCategoriesSection.categories.tables.tagline, en.shopCategoriesSection.categories.tables.tagline),
        lightingLabel: loc(pt.shopCategoriesSection.categories.lighting.label, en.shopCategoriesSection.categories.lighting.label),
        lightingTagline: loc(pt.shopCategoriesSection.categories.lighting.tagline, en.shopCategoriesSection.categories.lighting.tagline),
        fineArtsLabel: loc(pt.shopCategoriesSection.categories.fineArts.label, en.shopCategoriesSection.categories.fineArts.label),
        fineArtsTagline: loc(pt.shopCategoriesSection.categories.fineArts.tagline, en.shopCategoriesSection.categories.fineArts.tagline),
      },
    },
    {
      id: randomUUID(),
      type: "home.featuredTreasures",
      order: 2,
      hidden: false,
      content: {
        eyebrow: loc(pt.featuredTreasuresSection.eyebrow, en.featuredTreasuresSection.eyebrow),
        title: loc(pt.featuredTreasuresSection.title, en.featuredTreasuresSection.title),
        titleAccent: loc(pt.featuredTreasuresSection.titleAccent, en.featuredTreasuresSection.titleAccent),
        viewAll: loc(pt.featuredTreasuresSection.viewAll, en.featuredTreasuresSection.viewAll),
        viewTreasure: loc(pt.featuredTreasuresSection.viewTreasure, en.featuredTreasuresSection.viewTreasure),
      },
    },
    {
      id: randomUUID(),
      type: "home.whySildel",
      order: 3,
      hidden: false,
      content: {
        eyebrow: loc(pt.whySildelSection.eyebrow, en.whySildelSection.eyebrow),
        title: loc(pt.whySildelSection.title, en.whySildelSection.title),
        titleAccent: loc(pt.whySildelSection.titleAccent, en.whySildelSection.titleAccent),
        body: loc(pt.whySildelSection.body, en.whySildelSection.body),
        stats: en.whySildelSection.stats.map((s, i) => ({
          value: s.value,
          suffix: s.suffix ?? "",
          label: loc(pt.whySildelSection.stats[i]?.label ?? s.label, s.label),
        })),
        pillars: en.whySildelSection.pillars.map((p, i) => ({
          index: p.index,
          title: loc(pt.whySildelSection.pillars[i]?.title ?? p.title, p.title),
          body: loc(pt.whySildelSection.pillars[i]?.body ?? p.body, p.body),
        })),
      },
    },
    {
      id: randomUUID(),
      type: "home.brandVideo",
      order: 4,
      hidden: false,
      content: {
        eyebrow: loc(pt.brandVideo.eyebrow, en.brandVideo.eyebrow),
        title: loc(pt.brandVideo.title, en.brandVideo.title),
        titleAccent: loc(pt.brandVideo.titleAccent, en.brandVideo.titleAccent),
        body: loc(pt.brandVideo.body, en.brandVideo.body),
        youtubeId: en.brandVideo.youtubeId,
        duration: loc(pt.brandVideo.duration, en.brandVideo.duration),
      },
    },
    {
      id: randomUUID(),
      type: "home.sustainability",
      order: 5,
      hidden: false,
      content: {
        eyebrow: loc(pt.sustainability.eyebrow, en.sustainability.eyebrow),
        title: loc(pt.sustainability.title, en.sustainability.title),
        titleAccent: loc(pt.sustainability.titleAccent, en.sustainability.titleAccent),
        body: loc(pt.sustainability.body, en.sustainability.body),
        image: en.sustainability.image,
        imageAlt: loc(pt.sustainability.imageAlt, en.sustainability.imageAlt),
        steps: en.sustainability.steps.map((s, i) => ({
          number: s.number,
          title: loc(pt.sustainability.steps[i]?.title ?? s.title, s.title),
          body: loc(pt.sustainability.steps[i]?.body ?? s.body, s.body),
          image: s.image,
        })),
        ctaLabel: loc(pt.sustainability.cta.label, en.sustainability.cta.label),
        ctaHref: en.sustainability.cta.href,
      },
    },
    {
      id: randomUUID(),
      type: "home.newsletter",
      order: 6,
      hidden: false,
      content: {
        eyebrow: loc(pt.newsletter.eyebrow, en.newsletter.eyebrow),
        title: loc(pt.newsletter.title, en.newsletter.title),
        titleAccent: loc(pt.newsletter.titleAccent, en.newsletter.titleAccent),
        body: loc(pt.newsletter.body, en.newsletter.body),
        placeholder: loc(pt.newsletter.placeholder, en.newsletter.placeholder),
        cta: loc(pt.newsletter.cta, en.newsletter.cta),
        loadingLabel: loc(pt.newsletter.loadingLabel, en.newsletter.loadingLabel),
        successTitle: loc(pt.newsletter.successTitle, en.newsletter.successTitle),
        successBody: loc(pt.newsletter.successBody, en.newsletter.successBody),
        errorMessage: loc(pt.newsletter.errorMessage, en.newsletter.errorMessage),
        privacyNote: loc(pt.newsletter.privacyNote, en.newsletter.privacyNote),
      },
    },
  ];
}

/* ----------------------- Our Story (8 sections) ----------------------- */

function buildOurStoryBlocks() {
  const en = ourStoryEn;
  const pt = ourStoryPt;
  let order = 0;

  const factPair = (
    enArr: ReadonlyArray<{ value: string; label: string }>,
    ptArr: ReadonlyArray<{ value: string; label: string }>
  ) =>
    enArr.map((f, i) => ({
      value: f.value,
      label: loc(ptArr[i]?.label ?? f.label, f.label),
    }));

  return [
    {
      id: randomUUID(),
      type: "ourStory.hero",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.hero.eyebrow, en.hero.eyebrow),
        title: loc(pt.hero.title, en.hero.title),
        intro: loc(pt.hero.intro, en.hero.intro),
        image: en.hero.image,
        imageAlt: loc(pt.hero.imageAlt, en.hero.imageAlt),
      },
    },
    {
      id: randomUUID(),
      type: "ourStory.origin",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.origin.eyebrow, en.origin.eyebrow),
        title: loc(pt.origin.title, en.origin.title),
        titleAccent: loc(pt.origin.titleAccent, en.origin.titleAccent),
        body: loc(pt.origin.body.join("\n\n"), en.origin.body.join("\n\n")),
        image: en.origin.image,
        imageAlt: loc(pt.origin.imageAlt, en.origin.imageAlt),
        year: loc(pt.origin.year, en.origin.year),
      },
    },
    {
      id: randomUUID(),
      type: "ourStory.symbol",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.symbol.eyebrow, en.symbol.eyebrow),
        title: loc(pt.symbol.title, en.symbol.title),
        titleAccent: loc(pt.symbol.titleAccent, en.symbol.titleAccent),
        body: loc(pt.symbol.body.join("\n\n"), en.symbol.body.join("\n\n")),
        image: en.symbol.image,
        imageAlt: loc(pt.symbol.imageAlt, en.symbol.imageAlt),
        facts: factPair(en.symbol.facts, pt.symbol.facts),
      },
    },
    {
      id: randomUUID(),
      type: "ourStory.heritage",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.heritage.eyebrow, en.heritage.eyebrow),
        title: loc(pt.heritage.title, en.heritage.title),
        titleAccent: loc(pt.heritage.titleAccent, en.heritage.titleAccent),
        body: loc(pt.heritage.body, en.heritage.body),
        slides: en.heritage.images.map((img, i) => ({
          image: img.src,
          alt: loc(pt.heritage.images[i]?.alt ?? img.alt, img.alt),
          eyebrow: loc(pt.heritage.images[i]?.eyebrow ?? img.eyebrow, img.eyebrow),
          title: loc(pt.heritage.images[i]?.title ?? img.title, img.title),
          body: loc(pt.heritage.images[i]?.body ?? img.body, img.body),
          keywords: img.keywords,
        })),
        facts: factPair(en.heritage.facts, pt.heritage.facts),
      },
    },
    {
      id: randomUUID(),
      type: "ourStory.atelier",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.atelier.eyebrow, en.atelier.eyebrow),
        title: loc(pt.atelier.title, en.atelier.title),
        titleAccent: loc(pt.atelier.titleAccent, en.atelier.titleAccent),
        body: loc(pt.atelier.body, en.atelier.body),
        slides: en.atelier.images.map((img, i) => ({
          image: img.src,
          alt: loc(pt.atelier.images[i]?.alt ?? img.alt, img.alt),
          eyebrow: loc(pt.atelier.images[i]?.eyebrow ?? img.eyebrow, img.eyebrow),
          title: loc(pt.atelier.images[i]?.title ?? img.title, img.title),
          body: loc(pt.atelier.images[i]?.body ?? img.body, img.body),
          keywords: img.keywords,
        })),
        steps: en.atelier.steps.map((s, i) => ({
          number: s.number,
          title: loc(pt.atelier.steps[i]?.title ?? s.title, s.title),
          body: loc(pt.atelier.steps[i]?.body ?? s.body, s.body),
        })),
      },
    },
    {
      id: randomUUID(),
      type: "ourStory.founder",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.founder.eyebrow, en.founder.eyebrow),
        pullQuote: loc(pt.founder.pullQuote, en.founder.pullQuote),
        body: loc(pt.founder.body.join("\n\n"), en.founder.body.join("\n\n")),
        closing: loc(pt.founder.closing, en.founder.closing),
        image: en.founder.image,
        imageAlt: loc(pt.founder.imageAlt, en.founder.imageAlt),
        signatureName: loc(pt.founder.signature.name, en.founder.signature.name),
        signatureRole: loc(pt.founder.signature.role, en.founder.signature.role),
      },
    },
    {
      id: randomUUID(),
      type: "ourStory.values",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.values.eyebrow, en.values.eyebrow),
        title: loc(pt.values.title, en.values.title),
        titleAccent: loc(pt.values.titleAccent, en.values.titleAccent),
        body: loc(pt.values.body, en.values.body),
        pillars: en.values.pillars.map((p, i) => ({
          index: p.index,
          title: loc(pt.values.pillars[i]?.title ?? p.title, p.title),
          body: loc(pt.values.pillars[i]?.body ?? p.body, p.body),
        })),
        quote: loc(pt.values.quote, en.values.quote),
        quoteAuthor: loc(pt.values.quoteAuthor, en.values.quoteAuthor),
      },
    },
    {
      id: randomUUID(),
      type: "ourStory.cta",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.cta.eyebrow, en.cta.eyebrow),
        title: loc(pt.cta.title, en.cta.title),
        titleAccent: loc(pt.cta.titleAccent, en.cta.titleAccent),
        body: loc(pt.cta.body, en.cta.body),
        destinations: en.cta.destinations.map((d, i) => ({
          eyebrow: loc(pt.cta.destinations[i]?.eyebrow ?? d.eyebrow, d.eyebrow),
          title: loc(pt.cta.destinations[i]?.title ?? d.title, d.title),
          body: loc(pt.cta.destinations[i]?.body ?? d.body, d.body),
          image: d.image,
          imageAlt: loc(pt.cta.destinations[i]?.imageAlt ?? d.imageAlt, d.imageAlt),
          href: d.href,
          cta: loc(pt.cta.destinations[i]?.cta ?? d.cta, d.cta),
        })),
        closingLine: loc(pt.cta.closingLine, en.cta.closingLine),
      },
    },
  ];
}

/* ----------------------- Authentic Cork (6 sections) ----------------------- */

function buildAuthenticCorkBlocks() {
  const en = authenticCorkEn;
  const pt = authenticCorkPt;
  let order = 0;

  return [
    {
      id: randomUUID(),
      type: "authenticCork.hero",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.hero.eyebrow, en.hero.eyebrow),
        title: loc(pt.hero.title, en.hero.title),
        titleAccent: loc(pt.hero.titleAccent, en.hero.titleAccent),
        intro: loc(pt.hero.intro, en.hero.intro),
        image: en.hero.image,
        imageAlt: loc(pt.hero.imageAlt, en.hero.imageAlt),
      },
    },
    {
      id: randomUUID(),
      type: "authenticCork.whatIsCork",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.whatIsCork.eyebrow, en.whatIsCork.eyebrow),
        title: loc(pt.whatIsCork.title, en.whatIsCork.title),
        titleAccent: loc(pt.whatIsCork.titleAccent, en.whatIsCork.titleAccent),
        body: loc(pt.whatIsCork.body.join("\n\n"), en.whatIsCork.body.join("\n\n")),
        image: en.whatIsCork.image,
        imageAlt: loc(pt.whatIsCork.imageAlt, en.whatIsCork.imageAlt),
        calloutLabel: loc(pt.whatIsCork.callout.label, en.whatIsCork.callout.label),
        calloutValue: loc(pt.whatIsCork.callout.value, en.whatIsCork.callout.value),
      },
    },
    {
      id: randomUUID(),
      type: "authenticCork.properties",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.properties.eyebrow, en.properties.eyebrow),
        title: loc(pt.properties.title, en.properties.title),
        titleAccent: loc(pt.properties.titleAccent, en.properties.titleAccent),
        body: loc(pt.properties.body, en.properties.body),
        items: en.properties.items.map((it, i) => ({
          title: loc(pt.properties.items[i]?.title ?? it.title, it.title),
          body: loc(pt.properties.items[i]?.body ?? it.body, it.body),
        })),
      },
    },
    {
      id: randomUUID(),
      type: "authenticCork.harvest",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.harvest.eyebrow, en.harvest.eyebrow),
        title: loc(pt.harvest.title, en.harvest.title),
        titleAccent: loc(pt.harvest.titleAccent, en.harvest.titleAccent),
        body: loc(pt.harvest.body, en.harvest.body),
        images: en.harvest.images.map((img, i) => ({
          image: img.src,
          alt: loc(pt.harvest.images[i]?.alt ?? img.alt, img.alt),
        })),
        steps: en.harvest.steps.map((s, i) => ({
          number: s.number,
          title: loc(pt.harvest.steps[i]?.title ?? s.title, s.title),
          body: loc(pt.harvest.steps[i]?.body ?? s.body, s.body),
        })),
      },
    },
    {
      id: randomUUID(),
      type: "authenticCork.inSildel",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.inSildel.eyebrow, en.inSildel.eyebrow),
        title: loc(pt.inSildel.title, en.inSildel.title),
        titleAccent: loc(pt.inSildel.titleAccent, en.inSildel.titleAccent),
        body: loc(pt.inSildel.body, en.inSildel.body),
        image: en.inSildel.image,
        imageAlt: loc(pt.inSildel.imageAlt, en.inSildel.imageAlt),
        points: en.inSildel.points.map((p, i) => ({
          text: loc(pt.inSildel.points[i] ?? p, p),
        })),
      },
    },
    {
      id: randomUUID(),
      type: "authenticCork.cta",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.cta.eyebrow, en.cta.eyebrow),
        title: loc(pt.cta.title, en.cta.title),
        titleAccent: loc(pt.cta.titleAccent, en.cta.titleAccent),
        body: loc(pt.cta.body, en.cta.body),
        destinations: en.cta.destinations.map((d, i) => ({
          eyebrow: loc(pt.cta.destinations[i]?.eyebrow ?? d.eyebrow, d.eyebrow),
          title: loc(pt.cta.destinations[i]?.title ?? d.title, d.title),
          body: loc(pt.cta.destinations[i]?.body ?? d.body, d.body),
          image: d.image,
          imageAlt: loc(pt.cta.destinations[i]?.imageAlt ?? d.imageAlt, d.imageAlt),
          href: d.href,
          cta: loc(pt.cta.destinations[i]?.cta ?? d.cta, d.cta),
        })),
        closingLine: loc(pt.cta.closingLine, en.cta.closingLine),
      },
    },
  ];
}

/* ----------------------- You Think Cork (6 sections) ----------------------- */

function buildYouThinkCorkBlocks() {
  const en = youThinkCorkEn;
  const pt = youThinkCorkPt;
  let order = 0;

  return [
    {
      id: randomUUID(),
      type: "youThinkCork.hero",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.hero.eyebrow, en.hero.eyebrow),
        title: loc(pt.hero.title, en.hero.title),
        titleAccent: loc(pt.hero.titleAccent, en.hero.titleAccent),
        intro: loc(pt.hero.intro, en.hero.intro),
        image: en.hero.image,
        imageAlt: loc(pt.hero.imageAlt, en.hero.imageAlt),
      },
    },
    {
      id: randomUUID(),
      type: "youThinkCork.perception",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.perception.eyebrow, en.perception.eyebrow),
        title: loc(pt.perception.title, en.perception.title),
        titleAccent: loc(pt.perception.titleAccent, en.perception.titleAccent),
        body: loc(pt.perception.body, en.perception.body),
        cards: en.perception.cards.map((c, i) => ({
          index: c.index,
          title: loc(pt.perception.cards[i]?.title ?? c.title, c.title),
          body: loc(pt.perception.cards[i]?.body ?? c.body, c.body),
          tone: c.tone,
        })),
      },
    },
    {
      id: randomUUID(),
      type: "youThinkCork.manifesto",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.manifesto.eyebrow, en.manifesto.eyebrow),
        image: en.manifesto.image,
        imageAlt: loc(pt.manifesto.imageAlt, en.manifesto.imageAlt),
        lead: loc(pt.manifesto.lead, en.manifesto.lead),
        lines: loc(pt.manifesto.lines.join("\n"), en.manifesto.lines.join("\n")),
        closing: loc(pt.manifesto.closing, en.manifesto.closing),
        signature: loc(pt.manifesto.signature, en.manifesto.signature),
      },
    },
    {
      id: randomUUID(),
      type: "youThinkCork.showcase",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.showcase.eyebrow, en.showcase.eyebrow),
        title: loc(pt.showcase.title, en.showcase.title),
        titleAccent: loc(pt.showcase.titleAccent, en.showcase.titleAccent),
        body: loc(pt.showcase.body, en.showcase.body),
        items: en.showcase.items.map((it, i) => ({
          title: loc(pt.showcase.items[i]?.title ?? it.title, it.title),
          tagline: loc(pt.showcase.items[i]?.tagline ?? it.tagline, it.tagline),
          image: it.image,
        })),
      },
    },
    {
      id: randomUUID(),
      type: "youThinkCork.possibilities",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.possibilities.eyebrow, en.possibilities.eyebrow),
        title: loc(pt.possibilities.title, en.possibilities.title),
        titleAccent: loc(pt.possibilities.titleAccent, en.possibilities.titleAccent),
        body: loc(pt.possibilities.body, en.possibilities.body),
        items: en.possibilities.items.map((it, i) => ({
          title: loc(pt.possibilities.items[i]?.title ?? it.title, it.title),
          body: loc(pt.possibilities.items[i]?.body ?? it.body, it.body),
          image: it.image,
        })),
      },
    },
    {
      id: randomUUID(),
      type: "youThinkCork.cta",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.cta.eyebrow, en.cta.eyebrow),
        title: loc(pt.cta.title, en.cta.title),
        titleAccent: loc(pt.cta.titleAccent, en.cta.titleAccent),
        body: loc(pt.cta.body, en.cta.body),
        destinations: en.cta.destinations.map((d, i) => ({
          eyebrow: loc(pt.cta.destinations[i]?.eyebrow ?? d.eyebrow, d.eyebrow),
          title: loc(pt.cta.destinations[i]?.title ?? d.title, d.title),
          body: loc(pt.cta.destinations[i]?.body ?? d.body, d.body),
          image: d.image,
          imageAlt: loc(pt.cta.destinations[i]?.imageAlt ?? d.imageAlt, d.imageAlt),
          href: d.href,
          cta: loc(pt.cta.destinations[i]?.cta ?? d.cta, d.cta),
        })),
        closingLine: loc(pt.cta.closingLine, en.cta.closingLine),
      },
    },
  ];
}

/* ----------------------- Treasures (5 sections) ----------------------- */

function buildTreasuresBlocks() {
  const en = treasuresEn;
  const pt = treasuresPt;
  let order = 0;

  return [
    {
      id: randomUUID(),
      type: "treasures.hero",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.hero.eyebrow, en.hero.eyebrow),
        title: loc(pt.hero.title, en.hero.title),
        titleAccent: loc(pt.hero.titleAccent, en.hero.titleAccent),
        intro: loc(pt.hero.intro, en.hero.intro),
        image: en.hero.image,
        imageAlt: loc(pt.hero.imageAlt, en.hero.imageAlt),
        badgeLabel: loc(pt.hero.badge.label, en.hero.badge.label),
        badgeValue: loc(pt.hero.badge.value, en.hero.badge.value),
      },
    },
    {
      id: randomUUID(),
      type: "treasures.productGrid",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.products.eyebrow, en.products.eyebrow),
        title: loc(pt.products.title, en.products.title),
        titleAccent: loc(pt.products.titleAccent, en.products.titleAccent),
        body: loc(pt.products.body, en.products.body),
        catEyebrow: loc(pt.categories.eyebrow, en.categories.eyebrow),
        catTitle: loc(pt.categories.title, en.categories.title),
        catTitleAccent: loc(pt.categories.titleAccent, en.categories.titleAccent),
        categories: en.categories.items.map((c, i) => ({
          slug: c.slug,
          label: loc(pt.categories.items[i]?.label ?? c.label, c.label),
        })),
      },
    },
    {
      id: randomUUID(),
      type: "treasures.featured",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.featured.eyebrow, en.featured.eyebrow),
        label: loc(pt.featured.label, en.featured.label),
        title: loc(pt.featured.title, en.featured.title),
        titleAccent: loc(pt.featured.titleAccent, en.featured.titleAccent),
        body: loc(pt.featured.body, en.featured.body),
        image: en.featured.image,
        imageAlt: loc(pt.featured.imageAlt, en.featured.imageAlt),
        specs: en.featured.specs.map((s, i) => ({
          label: loc(pt.featured.specs[i]?.label ?? s.label, s.label),
          value: loc(pt.featured.specs[i]?.value ?? s.value, s.value),
        })),
        ctaLabel: loc(pt.featured.cta.label, en.featured.cta.label),
        ctaHref: en.featured.cta.href,
      },
    },
    {
      id: randomUUID(),
      type: "treasures.promise",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.promise.eyebrow, en.promise.eyebrow),
        title: loc(pt.promise.title, en.promise.title),
        titleAccent: loc(pt.promise.titleAccent, en.promise.titleAccent),
        body: loc(pt.promise.body, en.promise.body),
        items: en.promise.items.map((it, i) => ({
          title: loc(pt.promise.items[i]?.title ?? it.title, it.title),
          body: loc(pt.promise.items[i]?.body ?? it.body, it.body),
        })),
      },
    },
    {
      id: randomUUID(),
      type: "treasures.cta",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc(pt.cta.eyebrow, en.cta.eyebrow),
        title: loc(pt.cta.title, en.cta.title),
        titleAccent: loc(pt.cta.titleAccent, en.cta.titleAccent),
        body: loc(pt.cta.body, en.cta.body),
        destinations: en.cta.destinations.map((d, i) => ({
          eyebrow: loc(pt.cta.destinations[i]?.eyebrow ?? d.eyebrow, d.eyebrow),
          title: loc(pt.cta.destinations[i]?.title ?? d.title, d.title),
          body: loc(pt.cta.destinations[i]?.body ?? d.body, d.body),
          image: d.image,
          imageAlt: loc(pt.cta.destinations[i]?.imageAlt ?? d.imageAlt, d.imageAlt),
          href: d.href,
          cta: loc(pt.cta.destinations[i]?.cta ?? d.cta, d.cta),
        })),
        closingLine: loc(pt.cta.closingLine, en.cta.closingLine),
      },
    },
  ];
}

/* ----------------------- Blog (3 sections) ----------------------- */

function buildBlogBlocks() {
  let order = 0;
  return [
    {
      id: randomUUID(),
      type: "blog.hero",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc("O Jornal", "The Journal"),
        title: loc("Notas do", "Notes from"),
        titleAccent: loc("atelier.", "the atelier."),
        intro: loc(
          "Histórias do nosso estúdio em Esmoriz, dos sobreirais do Alentejo, e do ritmo lento que dá vida a cada peça.",
          "Stories from our Esmoriz studio, the cork forests of the Alentejo, and the slow rhythm that gives life to every piece."
        ),
      },
    },
    {
      id: randomUUID(),
      type: "blog.featured",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc("Última nota", "Latest letter"),
        featuredLabel: loc("Destaque", "Featured"),
        readLabel: loc("Ler a nota", "Read the letter"),
      },
    },
    {
      id: randomUUID(),
      type: "blog.grid",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc("Mais notas", "More letters"),
        title: loc("Do estúdio", "From the studio"),
        subscribeLabel: loc("Subscrever a carta", "Subscribe to the letter"),
        subscribeHref: "/#newsletter",
      },
    },
  ];
}

/* ----------------------- Contact (4 sections) ----------------------- */

function buildContactBlocks() {
  let order = 0;
  return [
    {
      id: randomUUID(),
      type: "contact.hero",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc("Contacto", "Contact"),
        title: loc("Escreva para", "Write to"),
        titleAccent: loc("o atelier.", "the atelier."),
        intro: loc(
          "Para encomendas especiais, comissões ou para visitar o nosso estúdio em Esmoriz — escreva-nos. Cada mensagem é lida pelo atelier.",
          "For commissions, press, wholesale, or to visit our studio in Esmoriz — write to us. Every message is read by the atelier itself."
        ),
        badge: loc("Esmoriz · Portugal", "Esmoriz · Portugal"),
        image:
          "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp",
        imageAlt: loc(
          "Interior do atelier Sildel ao pôr-do-sol.",
          "Sildel atelier interior at golden hour."
        ),
      },
    },
    {
      id: randomUUID(),
      type: "contact.form",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc("Enviar mensagem", "Send a message"),
        title: loc(
          "Conte-nos o que tem em mente.",
          "Tell us what you have in mind."
        ),
        cardImage:
          "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp",
        cardImageAlt: loc(
          "Porta envelhecida do atelier português ao pôr-do-sol.",
          "Sildel atelier doorway in Esmoriz."
        ),
        cardEyebrow: loc("Atelier Sildel", "Atelier Sildel"),
        cardLocation: loc("Esmoriz, Portugal", "Esmoriz, Portugal"),
        emailLabel: loc("Email", "Email"),
        phoneLabel: loc("Telefone", "Phone"),
        phoneNote: loc(
          "Seg – Sex · 10h – 18h (WET)",
          "Mon – Fri · 10am – 6pm (WET)"
        ),
        addressLabel: loc("Atelier", "Atelier"),
        hoursLabel: loc("Horário", "Hours"),
        hoursValue: loc(
          "Seg – Sex · 10h – 18h (WET)",
          "Mon – Fri · 10am – 6pm (WET)"
        ),
        hoursNote: loc("Visitas só com marcação", "Visits by appointment only"),
      },
    },
    {
      id: randomUUID(),
      type: "contact.visit",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc("Visitas por marcação", "Visit by appointment"),
        title: loc("Veja a cortiça", "See cork"),
        titleAccent: loc("a tomar forma.", "take shape."),
        body: loc(
          "Duas vezes por ano abrimos o atelier a coleccionadores e imprensa. Verá a casca em bruto, as ferramentas, e as peças em diferentes fases — do bloco ao número final.",
          "Twice a year we open the atelier to collectors and press. You'll see the raw bark, the hand tools, and pieces at every stage — from rough block to the final number."
        ),
        image:
          "/Slidel/Nano Banana 2 - Overhead top-down view of an artisan workbench in low warm tungsten light_ hand tool_1.webp",
        imageAlt: loc(
          "Vista superior da bancada do artesão Sildel.",
          "Overhead view of the Sildel artisan workbench."
        ),
        perks: [
          {
            title: loc("Pequenos grupos", "Small groups"),
            body: loc("Máximo de 6 visitantes.", "Maximum 6 guests."),
          },
          {
            title: loc("Datas limitadas", "Limited dates"),
            body: loc("Duas vezes por ano.", "Twice a year only."),
          },
        ],
        ctaLabel: loc("Pedir visita", "Request a visit"),
        ctaHref: "#contact-form-heading",
      },
    },
    {
      id: randomUUID(),
      type: "contact.faq",
      order: order++,
      hidden: false,
      content: {
        eyebrow: loc("Perguntas Frequentes", "Frequently Asked"),
        title: loc("Antes que", "Before you"),
        titleAccent: loc("escreva.", "write."),
        intro: loc(
          "Algumas das perguntas que mais recebemos. Se a sua não estiver aqui, use o formulário — respondemos em dois dias úteis.",
          "A few of the questions we get most. If yours isn't here, use the form — we reply within two working days."
        ),
        emailCta: loc("Escrever directamente", "Email directly"),
        items: [
          {
            question: loc(
              "Quanto tempo até receber uma resposta?",
              "How long until I receive a reply?"
            ),
            answer: loc(
              "Cada pedido é lido pelo atelier — normalmente a Isabel ou a sua assistente. Respondemos em dois dias úteis. Para questões urgentes, a linha telefónica é o caminho mais rápido.",
              "Each enquiry is read by the atelier — usually Isabel or her assistant. We reply within two working days. For urgent matters, the phone line is the fastest route."
            ),
          },
          {
            question: loc(
              "Posso encomendar uma peça por medida?",
              "Can I commission a custom piece?"
            ),
            answer: loc(
              "Sim. Aceitamos comissões numa base reduzida e ponderada. Conte-nos sobre a sala, os materiais com que vive e a silhueta que tem em mente. O atelier responderá com um esboço, uma gama de preço e um prazo realista.",
              "Yes. Commissions are accepted on a small, considered basis. Tell us about the room, the materials you live with, and the silhouette you have in mind. The atelier will respond with a sketch, a price range, and a realistic timeline."
            ),
          },
          {
            question: loc(
              "O atelier está aberto a visitas?",
              "Is the atelier open for visits?"
            ),
            answer: loc(
              "Apenas por marcação. Recebemos coleccionadores e imprensa duas vezes por ano no nosso estúdio de Esmoriz. Use o formulário (tópico: Visitar o atelier) e enviaremos as próximas datas disponíveis.",
              "By appointment only. We host collectors and press twice a year at our Esmoriz studio. Use the form (topic: Visit the atelier) and we'll send the next available dates."
            ),
          },
          {
            question: loc("Enviam para todo o mundo?", "Do you ship worldwide?"),
            answer: loc(
              "Sim. Cada tesouro Sildel é enviado de Portugal com seguro total e entrega rastreada. Europa: 4 a 7 dias úteis. Resto do mundo: 7 a 12 dias úteis.",
              "Yes. Every Sildel treasure ships from Portugal with full insurance and tracked delivery. Europe: 4–7 working days. Rest of world: 7–12 working days."
            ),
          },
          {
            question: loc(
              "E se a minha peça chegar danificada?",
              "What if my piece arrives damaged?"
            ),
            answer: loc(
              "Avise-nos em 7 dias. Cada peça é embalada à mão numa caixa de madeira personalizada e segurada de ponta a ponta. Substituímos ou reparamos a nosso custo, e recolhemos no seu endereço.",
              "Tell us within 7 days. Each piece is hand-packed in a custom wooden crate and insured end-to-end. We replace or repair at our cost, and we collect from your address."
            ),
          },
          {
            question: loc("As peças são reeditadas?", "Are pieces ever reissued?"),
            answer: loc(
              "Não. Cada tesouro Sildel é numerado dentro da sua edição e a série encerra quando a edição encerra. O número que recebe é o único do seu género.",
              "No. Each Sildel treasure is numbered within its edition and the run closes when the edition closes. The number you receive is the only one of its kind."
            ),
          },
        ],
      },
    },
  ];
}

async function main() {
  console.log("→ Connecting to MongoDB…");
  await connectDb();
  console.log("✓ Connected.");

  /* -------- SiteSettings -------- */
  console.log("→ Upserting SiteSettings…");
  const d = DEFAULT_SITE_SETTINGS;
  const nav = d.nav.map((n) => ({ id: n.id ?? randomUUID(), label: n.label, href: n.href }));
  const columns = d.footer.columns.map((c) => ({
    id: c.id ?? randomUUID(),
    heading: c.heading,
    links: c.links.map((l) => ({ id: l.id ?? randomUUID(), label: l.label, href: l.href })),
  }));
  await SiteSettingsModel.findOneAndUpdate(
    { singletonKey: "main" },
    {
      singletonKey: "main",
      brand: d.brand,
      nav,
      footer: { ...d.footer, columns },
      social: d.social,
      contact: {
        ...d.contact,
        email: d.contact.email || "sildel@sildel.pt",
        phone: d.contact.phone || "+351 911 015 388",
      },
      brandVideo: d.brandVideo,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log("✓ SiteSettings ready.");

  /* -------- Page blocks (idempotent: per-page skip-if-exists) -------- */
  await seedPage("home", "Home", 7, buildHomeBlocks);
  await seedPage("our-story", "Our Story", 8, buildOurStoryBlocks);
  await seedPage("authentic-cork", "Authentic Cork", 6, buildAuthenticCorkBlocks);
  await seedPage("you-think-cork", "You Think Cork", 6, buildYouThinkCorkBlocks);
  await seedPage("treasures", "Treasures", 5, buildTreasuresBlocks);
  await seedPage("blog", "Blog (Journal)", 3, buildBlogBlocks);
  await seedPage("contact", "Contact", 4, buildContactBlocks);

  console.log("\n📊 You can now sign in at /admin and edit every section of every page:");
  console.log("   • Pages          /admin/pages       (Home + Our Story + Authentic Cork + You Think Cork + Treasures + Blog + Contact)");
  console.log("   • Media library  /admin/media       (upload images & video)");
  console.log("   • Site settings  /admin/settings    (logo, nav, footer, social, contact)");
  console.log("\nAlso run `npm run seed` to populate the product catalog if you haven't.");

  process.exit(0);
}

async function seedPage(
  pageKey: string,
  label: string,
  expectedCount: number,
  builder: () => unknown[]
) {
  const existing = await PageContentModel.findOne({ pageKey }).lean();
  if (existing && Array.isArray(existing.blocks) && existing.blocks.length > 0) {
    console.log(`→ ${label} already has ${existing.blocks.length} block(s) — skipping (preserves admin edits).`);
    return;
  }
  console.log(`→ Seeding ${label} with ${expectedCount} preset blocks (PT + EN)…`);
  await PageContentModel.findOneAndUpdate(
    { pageKey },
    { pageKey, blocks: builder() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log(`✓ ${label} seeded.`);
}

main().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
