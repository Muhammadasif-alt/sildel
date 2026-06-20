import "server-only";
import { ourStoryEn } from "@/content/our-story.en";
import { ourStoryPt } from "@/content/our-story.pt";
import { authenticCorkEn } from "@/content/authentic-cork.en";
import { authenticCorkPt } from "@/content/authentic-cork.pt";
import {
  youThinkCorkEditorialEn,
  youThinkCorkEditorialPt,
} from "@/content/you-think-cork.editorial";
import {
  partnersEditorialEn,
  partnersEditorialPt,
} from "@/content/partners.editorial";
import { treasures, treasuresPt } from "@/content/treasures";
import {
  contactEditorialEn,
  contactEditorialPt,
} from "@/content/contact.editorial";
import type { EditorialContentDoc } from "./types";

type Story = typeof ourStoryEn;
type Cork = typeof authenticCorkEn;
type Ytc = typeof youThinkCorkEditorialEn;
type Partners = typeof partnersEditorialEn;
type Contact = typeof contactEditorialEn;

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

export function buildInitialAuthenticCork(): EditorialContentDoc {
  const en = authenticCorkEn;
  const pt = authenticCorkPt as Cork;

  return {
    hero: {
      eyebrow: pair(en.hero.eyebrow, pt.hero.eyebrow),
      image: en.hero.image,
      imageAlt: pair(en.hero.imageAlt, pt.hero.imageAlt),
    },
    whatIsCork: {
      eyebrow: pair(en.whatIsCork.eyebrow, pt.whatIsCork.eyebrow),
      title: pair(en.whatIsCork.title, pt.whatIsCork.title),
      titleAccent: pair(en.whatIsCork.titleAccent, pt.whatIsCork.titleAccent),
      body: paragraphPair(en.whatIsCork.body, pt.whatIsCork.body),
      image: en.whatIsCork.image,
      imageAlt: pair(en.whatIsCork.imageAlt, pt.whatIsCork.imageAlt),
    },
    bleedAfterWhatIsCork: {
      src: en.harvest.images[0].src,
      alt: pair(en.harvest.images[0].alt, pt.harvest.images[0].alt),
    },
    harvest: {
      eyebrow: pair(en.harvest.eyebrow, pt.harvest.eyebrow),
      title: pair(en.harvest.title, pt.harvest.title),
      titleAccent: pair(en.harvest.titleAccent, pt.harvest.titleAccent),
      body: paragraphPair([en.harvest.body], [pt.harvest.body]),
      image: en.harvest.images[1].src,
      imageAlt: pair(en.harvest.images[1].alt, pt.harvest.images[1].alt),
    },
    bleedAfterHarvest: {
      src: en.harvest.images[2].src,
      alt: pair(en.harvest.images[2].alt, pt.harvest.images[2].alt),
    },
    properties: {
      eyebrow: pair(en.properties.eyebrow, pt.properties.eyebrow),
      title: pair(en.properties.title, pt.properties.title),
      titleAccent: pair(en.properties.titleAccent, pt.properties.titleAccent),
      body: pair(en.properties.body, pt.properties.body),
      image: en.cta.destinations[0].image,
      imageAlt: pair(
        en.cta.destinations[0].imageAlt,
        pt.cta.destinations[0].imageAlt,
      ),
      items: en.properties.items.map((item, i) => ({
        title: pair(item.title, pt.properties.items[i].title),
        body: pair(item.body, pt.properties.items[i].body),
      })),
    },
    bleedBeforeInSildel: {
      src: en.cta.destinations[1].image,
      alt: pair(
        en.cta.destinations[1].imageAlt,
        pt.cta.destinations[1].imageAlt,
      ),
    },
    inSildel: {
      eyebrow: pair(en.inSildel.eyebrow, pt.inSildel.eyebrow),
      title: pair(en.inSildel.title, pt.inSildel.title),
      titleAccent: pair(en.inSildel.titleAccent, pt.inSildel.titleAccent),
      body: paragraphPair(
        [en.inSildel.body, en.inSildel.points.join(". ") + "."],
        [pt.inSildel.body, pt.inSildel.points.join(". ") + "."],
      ),
      image: en.inSildel.image,
      imageAlt: pair(en.inSildel.imageAlt, pt.inSildel.imageAlt),
    },
    cta: {
      eyebrow: pair(en.cta.eyebrow, pt.cta.eyebrow),
      title: pair(en.cta.title, pt.cta.title),
      titleAccent: pair(en.cta.titleAccent, pt.cta.titleAccent),
      body: pair(en.cta.body, pt.cta.body),
      ctaLabel: pair(en.cta.destinations[0].cta, pt.cta.destinations[0].cta),
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

export function buildInitialYouThinkCork(): EditorialContentDoc {
  const en = youThinkCorkEditorialEn;
  const pt = youThinkCorkEditorialPt as Ytc;

  return {
    hero: {
      eyebrow: pair(en.hero.eyebrow, pt.hero.eyebrow),
      image: en.hero.image,
      imageAlt: pair(en.hero.imageAlt, pt.hero.imageAlt),
    },
    intro: {
      eyebrow: pair(en.intro.eyebrow, pt.intro.eyebrow),
      title: pair(en.intro.title, pt.intro.title),
      titleAccent: pair(en.intro.titleAccent, pt.intro.titleAccent),
      body: paragraphPair(en.intro.body, pt.intro.body),
      image: en.intro.image,
      imageAlt: pair(en.intro.imageAlt, pt.intro.imageAlt),
    },
    bleed: {
      src: en.bleed.src,
      alt: pair(en.bleed.alt, pt.bleed.alt),
    },
    innovate: {
      eyebrow: pair(en.innovate.eyebrow, pt.innovate.eyebrow),
      title: pair(en.innovate.title, pt.innovate.title),
      titleAccent: pair(en.innovate.titleAccent, pt.innovate.titleAccent),
      body: paragraphPair(en.innovate.body, pt.innovate.body),
      image: en.innovate.image,
      imageAlt: pair(en.innovate.imageAlt, pt.innovate.imageAlt),
    },
    banner: {
      line: pair(en.banner.line, pt.banner.line),
    },
    pillars: {
      eyebrow: pair(en.pillars.eyebrow, pt.pillars.eyebrow),
      title: pair(en.pillars.title, pt.pillars.title),
      titleAccent: pair(en.pillars.titleAccent, pt.pillars.titleAccent),
      body: pair(en.pillars.body, pt.pillars.body),
      image: en.pillars.image,
      imageAlt: pair(en.pillars.imageAlt, pt.pillars.imageAlt),
      items: en.pillars.items.map((item, i) => ({
        title: pair(item.title, pt.pillars.items[i].title),
        body: pair(item.body, pt.pillars.items[i].body),
      })),
    },
    contactCta: {
      eyebrow: pair(en.contactCta.eyebrow, pt.contactCta.eyebrow),
      heading: pair(en.contactCta.heading, pt.contactCta.heading),
    },
  };
}

export function buildInitialPartners(): EditorialContentDoc {
  const en = partnersEditorialEn;
  const pt = partnersEditorialPt as Partners;

  return {
    hero: {
      eyebrow: pair(en.hero.eyebrow, pt.hero.eyebrow),
      image: en.hero.image,
      imageAlt: pair(en.hero.imageAlt, pt.hero.imageAlt),
    },
    intro: {
      eyebrow: pair(en.intro.eyebrow, pt.intro.eyebrow),
      title: pair(en.intro.title, pt.intro.title),
      titleAccent: pair(en.intro.titleAccent, pt.intro.titleAccent),
      body: paragraphPair(en.intro.body, pt.intro.body),
      image: en.intro.image,
      imageAlt: pair(en.intro.imageAlt, pt.intro.imageAlt),
    },
    cta: {
      eyebrow: pair(en.cta.eyebrow, pt.cta.eyebrow),
      title: pair(en.cta.title, pt.cta.title),
      titleAccent: pair(en.cta.titleAccent, pt.cta.titleAccent),
      body: pair(en.cta.body, pt.cta.body),
      ctaLabel: pair(en.cta.ctaLabel, pt.cta.ctaLabel),
      ctaHref: en.cta.ctaHref,
      backgroundImage: en.cta.backgroundImage,
      closingLine: pair(en.cta.closingLine, pt.cta.closingLine),
    },
  };
}

export function buildInitialTreasures(): EditorialContentDoc {
  const en = treasures;
  const pt = treasuresPt as typeof treasures;

  return {
    hero: {
      eyebrow: pair(en.hero.eyebrow, pt.hero.eyebrow),
      image: en.hero.image,
      imageAlt: pair(en.hero.imageAlt, pt.hero.imageAlt),
    },
    intro: {
      eyebrow: pair(en.hero.eyebrow, pt.hero.eyebrow),
      title: pair(en.hero.title, pt.hero.title),
      titleAccent: pair(en.hero.titleAccent, pt.hero.titleAccent),
      intro: pair(en.hero.intro, pt.hero.intro),
    },
    cta: {
      eyebrow: pair(en.cta.eyebrow, pt.cta.eyebrow),
      title: pair(en.cta.title, pt.cta.title),
      titleAccent: pair(en.cta.titleAccent, pt.cta.titleAccent),
      body: pair(en.cta.body, pt.cta.body),
      ctaLabel: pair(en.cta.destinations[0].cta, pt.cta.destinations[0].cta),
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

export function buildInitialContact(): EditorialContentDoc {
  const en = contactEditorialEn;
  const pt = contactEditorialPt as Contact;

  return {
    hero: {
      eyebrow: pair(en.hero.eyebrow, pt.hero.eyebrow),
      image: en.hero.image,
      imageAlt: pair(en.hero.imageAlt, pt.hero.imageAlt),
    },
    intro: {
      eyebrow: pair(en.intro.eyebrow, pt.intro.eyebrow),
      title: pair(en.intro.title, pt.intro.title),
      titleAccent: pair(en.intro.titleAccent, pt.intro.titleAccent),
      body: paragraphPair(en.intro.body, pt.intro.body),
      image: en.intro.image,
      imageAlt: pair(en.intro.imageAlt, pt.intro.imageAlt),
    },
    form: {
      eyebrow: pair(en.form.eyebrow, pt.form.eyebrow),
      heading: pair(en.form.heading, pt.form.heading),
      body: pair(en.form.body, pt.form.body),
    },
  };
}

function pair(en: string, pt: string) {
  return { en, pt };
}

function paragraphPair(en: string[], pt: string[]) {
  return { en, pt };
}