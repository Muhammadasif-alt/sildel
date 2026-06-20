import type { Locale } from "@/lib/i18n/config";

/**
 * Default content for the editorial /you-think-cork rebuild.
 * Separate file from `you-think-cork.ts` because the older TS
 * content is still consumed by legacy CMS block presets and
 * shouldn't be reshaped.
 *
 * Used by:
 *   - the public route as a fallback when the founder hasn't
 *     edited the page in admin yet
 *   - the admin seed builder so the first open shows live content
 */

const HERO_IMAGE =
  "/Slidel/Nano Banana 2 - Close-up of hands selecting a piece of fine even amadia cork bark from a stack_ warm_1.webp";
const BLOCK_IMAGE =
  "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_1.webp";
const BARK_IMAGE =
  "/Slidel/Nano Banana 2 - Extreme macro photograph of authentic Portuguese cork bark texture_ intricate ridged.webp";
const ATELIER_DOOR_IMAGE =
  "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp";
const PEDESTAL_IMAGE =
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_4.webp";

const en = {
  hero: {
    eyebrow: "Sildel × Material Bank",
    image: HERO_IMAGE,
    imageAlt: "Hands selecting a piece of fine amadia cork bark.",
  },
  intro: {
    eyebrow: "Sildel × Material Bank",
    title: "You Think",
    titleAccent: "cork.",
    body: [
      "As a proud member of Material Bank, SILDEL is committed to fostering a collaborative environment where brands and companies can come together to innovate and create. “You Think Cork” is not just about partnering with us — it's about building a network of forward-thinking companies dedicated to pushing the boundaries of what's possible with authentic cork.",
    ],
    image: BARK_IMAGE,
    imageAlt: "Macro detail of Portuguese cork bark.",
  },
  bleed: {
    src: BLOCK_IMAGE,
    alt: "Stacks of Portuguese cork curing in the open air.",
  },
  innovate: {
    eyebrow: "Invitation",
    title: "Let's innovate",
    titleAccent: "together.",
    body: [
      "We believe in the power of collaboration to drive innovation and create extraordinary pieces. Our dedication for authentic cork has shown us the limitless potential of this sustainable material. We want to take our passion a step further and invite you to join us in exploring new horizons.",
    ],
    image: ATELIER_DOOR_IMAGE,
    imageAlt: "Weathered Sildel atelier doorway at golden hour.",
  },
  banner: { line: "TOGETHER WE CAN DEVELOP GROUNDBREAKING SOLUTIONS" },
  pillars: {
    eyebrow: "Three paths",
    title: "Where our work",
    titleAccent: "meets yours.",
    body: "Three fronts of collaboration — each an open invitation to brands, studios and makers who see more than a material in cork.",
    image: PEDESTAL_IMAGE,
    imageAlt:
      "A sculptural cork piece on a marble pedestal — minimalist silhouette.",
    items: [
      {
        title: "Product development",
        body: "Collaborate with our team to create innovative products that leverage the unique benefits of cork.",
      },
      {
        title: "Sustainable solutions",
        body: "Work together to develop eco-friendly alternatives to traditional materials.",
      },
      {
        title: "Customised projects",
        body: "Bring your unique ideas to life with tailored cork solutions designed to meet your specific needs.",
      },
    ],
  },
  contactCta: {
    eyebrow: "Do you think cork?",
    heading: "Reach out and join us in shaping the future.",
  },
};

const pt: typeof en = {
  hero: {
    eyebrow: "Sildel × Material Bank",
    image: HERO_IMAGE,
    imageAlt: "Mãos a seleccionar uma peça de cortiça amadia fina.",
  },
  intro: {
    eyebrow: "Sildel × Material Bank",
    title: "Pensa em",
    titleAccent: "cortiça.",
    body: [
      "Como orgulhoso membro do Material Bank, a SILDEL está empenhada em fomentar um ambiente colaborativo onde marcas e empresas se encontrem para inovar e criar. “You Think Cork” não é apenas sobre fazer parcerias connosco — é sobre construir uma rede de empresas com visão de futuro, dedicadas a expandir os limites do que é possível com cortiça autêntica.",
    ],
    image: BARK_IMAGE,
    imageAlt: "Pormenor macro da casca de cortiça portuguesa.",
  },
  bleed: {
    src: BLOCK_IMAGE,
    alt: "Pilhas de cortiça portuguesa a curar ao ar livre.",
  },
  innovate: {
    eyebrow: "Convite",
    title: "Vamos inovar",
    titleAccent: "juntos.",
    body: [
      "Acreditamos no poder da colaboração para impulsionar a inovação e criar peças extraordinárias. A nossa dedicação à cortiça autêntica mostrou-nos o potencial ilimitado deste material sustentável. Queremos levar a nossa paixão um passo mais longe e convidamo-lo a juntar-se a nós na exploração de novos horizontes.",
    ],
    image: ATELIER_DOOR_IMAGE,
    imageAlt: "Porta envelhecida do atelier Sildel ao pôr-do-sol.",
  },
  banner: { line: "JUNTOS PODEMOS DESENVOLVER SOLUÇÕES REVOLUCIONÁRIAS" },
  pillars: {
    eyebrow: "Três caminhos",
    title: "Onde se cruzam",
    titleAccent: "os nossos caminhos.",
    body: "Três frentes de colaboração — cada uma um convite aberto às marcas, estúdios e fabricantes que vêem na cortiça mais do que um material.",
    image: PEDESTAL_IMAGE,
    imageAlt:
      "Peça escultórica em cortiça sobre pedestal de mármore — silhueta minimalista.",
    items: [
      {
        title: "Desenvolvimento de produto",
        body: "Colabore com a nossa equipa para criar produtos inovadores que tirem partido dos benefícios únicos da cortiça.",
      },
      {
        title: "Soluções sustentáveis",
        body: "Trabalhemos lado a lado para desenvolver alternativas ecológicas a materiais tradicionais.",
      },
      {
        title: "Projetos personalizados",
        body: "Dê vida às suas ideias com soluções em cortiça desenhadas à medida das suas necessidades.",
      },
    ],
  },
  contactCta: {
    eyebrow: "Pensa em cortiça?",
    heading: "Fale connosco e ajude-nos a moldar o futuro.",
  },
};

export type YouThinkCorkEditorial = typeof en;

export function getYouThinkCorkEditorial(
  locale: Locale,
): YouThinkCorkEditorial {
  return locale === "pt" ? pt : en;
}

export const youThinkCorkEditorialEn = en;
export const youThinkCorkEditorialPt = pt;