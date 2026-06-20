import type { Locale } from "@/lib/i18n/config";
import { getFaqs } from "@/content/legal";

/**
 * Default editorial content for /faq — hero, title block and the
 * closing CTA. The Q&A items come from `getFaqs(locale)` in
 * src/content/legal.ts so we don't duplicate the curated list.
 */

const HERO_IMAGE =
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_4.webp";

const en = {
  hero: {
    eyebrow: "Help",
    image: HERO_IMAGE,
    imageAlt:
      "Sculptural cork piece on a marble pedestal — minimalist silhouette.",
  },
  intro: {
    eyebrow: "Help",
    title: "Frequently asked",
    titleAccent: "questions.",
    intro:
      "Everything we're usually asked about buying, shipping, returns and authentic cork. If you don't find your answer here, just reach out — we'd love to hear from you.",
  },
  cta: {
    eyebrow: "Still have a question?",
    body: "Talk to us directly — we reply with care.",
    ctaLabel: "Contact us",
    ctaHref: "/contact",
  },
};

const pt: typeof en = {
  hero: {
    eyebrow: "Apoio",
    image: HERO_IMAGE,
    imageAlt:
      "Peça escultórica em cortiça sobre pedestal de mármore — silhueta minimalista.",
  },
  intro: {
    eyebrow: "Apoio",
    title: "Perguntas",
    titleAccent: "frequentes.",
    intro:
      "Tudo o que normalmente nos perguntam sobre comprar, envios, devoluções e cortiça autêntica. Se algo aqui não responder à sua dúvida, fale connosco — temos todo o gosto.",
  },
  cta: {
    eyebrow: "Ainda com dúvidas?",
    body: "Fale connosco diretamente — respondemos com calma e dedicação.",
    ctaLabel: "Contacte-nos",
    ctaHref: "/contact",
  },
};

export type FaqEditorial = typeof en;

export function getFaqEditorial(locale: Locale): FaqEditorial {
  return locale === "pt" ? pt : en;
}

export const faqEditorialEn = en;
export const faqEditorialPt = pt;
export { getFaqs };