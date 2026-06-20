import type { Locale } from "@/lib/i18n/config";

/**
 * Default content for the editorial /contact page chrome — hero,
 * intro row and contact form heading. The form fields, NAP block
 * and map come from ContactForm / ContactMap / siteConfig.
 */

const HERO_IMAGE =
  "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp";
const INTRO_IMAGE =
  "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp";

const en = {
  hero: {
    eyebrow: "Contact",
    image: HERO_IMAGE,
    imageAlt:
      "Weathered Sildel atelier doorway at golden hour with the hand-painted sign.",
  },
  intro: {
    eyebrow: "Contact",
    title: "Talk",
    titleAccent: "to us.",
    body: [
      "Bespoke commissions, atelier visits, press, partnerships — write to us. We reply within one business day, with care.",
    ],
    image: INTRO_IMAGE,
    imageAlt: "Sildel atelier in Esmoriz — interior at golden hour.",
  },
  form: {
    eyebrow: "Write to us",
    heading: "Tell us what you're thinking about.",
    body: "We reply within one business day. You can also write to us directly at sildel@sildel.pt.",
  },
};

const pt: typeof en = {
  hero: {
    eyebrow: "Contacto",
    image: HERO_IMAGE,
    imageAlt:
      "Porta envelhecida do atelier Sildel ao pôr-do-sol, com placa pintada à mão.",
  },
  intro: {
    eyebrow: "Contacto",
    title: "Fale",
    titleAccent: "connosco.",
    body: [
      "Encomendas personalizadas, visitas ao atelier, imprensa, parcerias — escreva-nos. Respondemos dentro de um dia útil, com calma e dedicação.",
    ],
    image: INTRO_IMAGE,
    imageAlt: "Atelier Sildel em Esmoriz — interior ao pôr-do-sol.",
  },
  form: {
    eyebrow: "Escreva-nos",
    heading: "Conte-nos no que está a pensar.",
    body: "Resposta dentro de um dia útil. Pode também escrever-nos directamente para sildel@sildel.pt.",
  },
};

export type ContactEditorial = typeof en;

export function getContactEditorial(locale: Locale): ContactEditorial {
  return locale === "pt" ? pt : en;
}

export const contactEditorialEn = en;
export const contactEditorialPt = pt;