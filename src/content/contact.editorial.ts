import type { Locale } from "@/lib/i18n/config";

/**
 * Default content for the editorial /contact page chrome — hero,
 * intro row and contact form heading. The form fields, NAP block
 * and map come from ContactForm / ContactMap / siteConfig.
 */

// Three DISTINCT images on /contact — the three slots used to share
// near-identical frames from the Equilibrium+Gibraltar atelier shoot,
// which read as a duplicated background. Each slot now gets its own
// look (founder feedback, June 2026 fourteenth pass).
const HERO_IMAGE =
  "/products/GIBRALTAR_Equilibrium_Gibraltar_foto-ambiente-0f37be0423.webp";
const INTRO_IMAGE =
  "/products/ALEXIS_MV_1040-a51cb78fea.webp";
const FORM_IMAGE =
  "/products/SHALE-COLLECTION_red_05_Ambiente-1a60456151.webp";

const en = {
  hero: {
    eyebrow: "Contact",
    image: HERO_IMAGE,
    imageAlt:
      "Sildel atelier in Esmoriz — Equilibrium and Gibraltar staged at golden hour.",
  },
  intro: {
    eyebrow: "Contact",
    title: "Talk",
    titleAccent: "to us.",
    body: [
      "Bespoke commissions, atelier visits, press, partnerships — write to us. We reply within one business day, with care.",
    ],
    image: INTRO_IMAGE,
    imageAlt: "Alexis low table — magazine-style flat-lay shot in the Sildel atelier.",
  },
  form: {
    eyebrow: "Write to us",
    heading: "Tell us what you're thinking about.",
    body: "We reply within one business day. You can also write to us directly at sildel@sildel.pt.",
    image: FORM_IMAGE,
    imageAlt:
      "Shale Collection red — warm cork sculpture in a candlelit interior corner.",
  },
};

const pt: typeof en = {
  hero: {
    eyebrow: "Contacto",
    image: HERO_IMAGE,
    imageAlt:
      "Atelier Sildel em Esmoriz — Equilibrium e Gibraltar dispostos ao pôr-do-sol.",
  },
  intro: {
    eyebrow: "Contacto",
    title: "Fale",
    titleAccent: "connosco.",
    body: [
      "Encomendas personalizadas, visitas ao atelier, imprensa, parcerias — escreva-nos. Respondemos dentro de um dia útil, com calma e dedicação.",
    ],
    image: INTRO_IMAGE,
    imageAlt: "Mesa baixa Alexis — flat-lay editorial no atelier Sildel.",
  },
  form: {
    eyebrow: "Escreva-nos",
    heading: "Conte-nos no que está a pensar.",
    body: "Resposta dentro de um dia útil. Pode também escrever-nos directamente para sildel@sildel.pt.",
    image: FORM_IMAGE,
    imageAlt:
      "Shale Collection vermelho — escultura de cortiça num canto interior à luz das velas.",
  },
};

export type ContactEditorial = typeof en;

export function getContactEditorial(locale: Locale): ContactEditorial {
  return locale === "pt" ? pt : en;
}

export const contactEditorialEn = en;
export const contactEditorialPt = pt;