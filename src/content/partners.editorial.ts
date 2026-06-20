import type { Locale } from "@/lib/i18n/config";

/**
 * Default content for the editorial /partners page (hero, intro
 * narrative row and closing parallax CTA). The PartnersSection
 * cards themselves live elsewhere and aren't seeded here.
 */

const HERO_IMAGE =
  "/products/EQUILIBRIUM_Equilibrium_Gibraltar_foto-ambiente-d561909279.webp";
const INTRO_IMAGE = "/partners-web/porcel/porcel-1.webp";
const CLOSING_BG =
  "/products/GIBRALTAR_Equilibrium_Gibraltar_foto-ambiente-0f37be0423.webp";

const en = {
  hero: {
    eyebrow: "Collaborations",
    image: HERO_IMAGE,
    imageAlt:
      "Portuguese atelier at golden hour — warm sunlight crossing the workshop.",
  },
  intro: {
    eyebrow: "Collaborations",
    title: "In",
    titleAccent: "dialogue.",
    body: [
      "Cork is at its best in dialogue. From porcelain to lighting to the trophy of a festival, these are the Portuguese houses and projects Sildel builds alongside.",
    ],
    image: INTRO_IMAGE,
    imageAlt: "Porcel × Sildel — Portuguese porcelain and authentic cork.",
  },
  cta: {
    eyebrow: "Do you think cork?",
    title: "Let's create",
    titleAccent: "something together.",
    body: "If you see cork as more than a material, there's room for a conversation. SILDEL builds every partnership slowly — one piece, one project, one idea at a time.",
    ctaLabel: "You Think Cork",
    ctaHref: "/you-think-cork",
    backgroundImage: CLOSING_BG,
    closingLine: "Designed in Portugal · Handmade",
  },
};

const pt: typeof en = {
  hero: {
    eyebrow: "Parcerias",
    image: HERO_IMAGE,
    imageAlt: "Atelier português ao pôr-do-sol — luz quente a percorrer a oficina.",
  },
  intro: {
    eyebrow: "Parcerias",
    title: "Em",
    titleAccent: "diálogo.",
    body: [
      "A cortiça dá o seu melhor em diálogo. Da porcelana à iluminação ao troféu de um festival, estas são as casas e projectos portugueses com quem a Sildel constrói lado a lado.",
    ],
    image: INTRO_IMAGE,
    imageAlt: "Porcel × Sildel — porcelana portuguesa e cortiça autêntica.",
  },
  cta: {
    eyebrow: "Pensa em cortiça?",
    title: "Vamos criar",
    titleAccent: "algo juntos.",
    body: "Se vê a cortiça como mais do que um material, há lugar para uma conversa. A SILDEL constrói cada parceria devagar — uma peça, um projecto, uma ideia de cada vez.",
    ctaLabel: "Pensa em Cortiça",
    ctaHref: "/you-think-cork",
    backgroundImage: CLOSING_BG,
    closingLine: "Desenhado em Portugal · Feito à mão",
  },
};

export type PartnersEditorial = typeof en;

export function getPartnersEditorial(locale: Locale): PartnersEditorial {
  return locale === "pt" ? pt : en;
}

export const partnersEditorialEn = en;
export const partnersEditorialPt = pt;