import "server-only";
import { ourStoryEn } from "@/content/our-story.en";
import { ourStoryPt } from "@/content/our-story.pt";
import type { EditorialContentDoc } from "./types";

type Story = typeof ourStoryEn;

/**
 * Convert the file-based TS content into the locale-paired shape the
 * editor expects, so the FIRST time the founder opens an editorial
 * page in admin she sees the live content pre-filled, not blank
 * fields. After she hits Save once, the DB doc becomes the source
 * of truth.
 */
export function buildInitialOurStory(): EditorialContentDoc {
  const en = ourStoryEn;
  const pt = ourStoryPt as Story;

  return {
    hero: {
      eyebrow: pair(en.hero.eyebrow, pt.hero.eyebrow),
      image: en.hero.image,
      imageAlt: pair(en.hero.imageAlt, pt.hero.imageAlt),
    },
    origin: {
      eyebrow: pair(en.origin.eyebrow, pt.origin.eyebrow),
      title: pair(en.origin.title, pt.origin.title),
      titleAccent: pair(en.origin.titleAccent, pt.origin.titleAccent),
      body: paragraphPair(en.origin.body, pt.origin.body),
      image: en.origin.image,
      imageAlt: pair(en.origin.imageAlt, pt.origin.imageAlt),
    },
    heritageOak: {
      eyebrow: pair(
        en.heritage.images[0].eyebrow,
        pt.heritage.images[0].eyebrow,
      ),
      title: pair(en.heritage.images[0].title, pt.heritage.images[0].title),
      body: paragraphPair(
        [en.heritage.body, en.heritage.images[0].body],
        [pt.heritage.body, pt.heritage.images[0].body],
      ),
      image: en.heritage.images[0].src,
      imageAlt: pair(en.heritage.images[0].alt, pt.heritage.images[0].alt),
    },
    heritageHands: {
      eyebrow: pair(
        en.heritage.images[1].eyebrow,
        pt.heritage.images[1].eyebrow,
      ),
      title: pair(en.heritage.images[1].title, pt.heritage.images[1].title),
      body: paragraphPair(
        [en.heritage.images[1].body],
        [pt.heritage.images[1].body],
      ),
      image: en.heritage.images[1].src,
      imageAlt: pair(en.heritage.images[1].alt, pt.heritage.images[1].alt),
    },
    atelier: {
      eyebrow: pair(en.atelier.eyebrow, pt.atelier.eyebrow),
      title: pair(en.atelier.title, pt.atelier.title),
      titleAccent: pair(en.atelier.titleAccent, pt.atelier.titleAccent),
      body: paragraphPair(
        [en.atelier.body, en.atelier.images[1].body],
        [pt.atelier.body, pt.atelier.images[1].body],
      ),
      image: en.atelier.images[1].src,
      imageAlt: pair(en.atelier.images[1].alt, pt.atelier.images[1].alt),
    },
    symbol: {
      eyebrow: pair(en.symbol.eyebrow, pt.symbol.eyebrow),
      title: pair(en.symbol.title, pt.symbol.title),
      titleAccent: pair(en.symbol.titleAccent, pt.symbol.titleAccent),
      body: paragraphPair(en.symbol.body, pt.symbol.body),
      image: en.symbol.image,
      imageAlt: pair(en.symbol.imageAlt, pt.symbol.imageAlt),
    },
    bleedAfterOrigin: {
      src: en.heritage.images[2].src,
      alt: pair(en.heritage.images[2].alt, pt.heritage.images[2].alt),
    },
    bleedBeforeAtelier: {
      src: en.atelier.images[0].src,
      alt: pair(en.atelier.images[0].alt, pt.atelier.images[0].alt),
    },
    founder: {
      eyebrow: pair(en.founder.eyebrow, pt.founder.eyebrow),
      pullQuote: pair(en.founder.pullQuote, pt.founder.pullQuote),
      body: paragraphPair(en.founder.body, pt.founder.body),
      closing: pair(en.founder.closing, pt.founder.closing),
      signatureName: en.founder.signature.name,
      signatureRole: pair(
        en.founder.signature.role,
        pt.founder.signature.role,
      ),
      image: en.founder.image,
      imageAlt: pair(en.founder.imageAlt, pt.founder.imageAlt),
    },
    cta: {
      eyebrow: pair(en.cta.eyebrow, pt.cta.eyebrow),
      title: pair(en.cta.title, pt.cta.title),
      titleAccent: pair(en.cta.titleAccent, pt.cta.titleAccent),
      body: pair(en.cta.body, pt.cta.body),
      ctaLabel: pair(
        en.cta.destinations[0].cta,
        pt.cta.destinations[0].cta,
      ),
      ctaHref: en.cta.destinations[0].href,
      backgroundImage:
        en.cta.destinations[1]?.image ?? en.cta.destinations[0].image,
      closingLine: pair(
        en.cta.closingLine ?? "",
        pt.cta.closingLine ?? "",
      ),
    },
  };
}

function pair(en: string, pt: string) {
  return { en, pt };
}

function paragraphPair(en: string[], pt: string[]) {
  return { en, pt };
}