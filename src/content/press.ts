import type { Locale } from "@/lib/i18n/config";

/**
 * /press content — Sildel in the international press. Eight magazines
 * and design publications that have featured the atelier. Each entry
 * carries a thumbnail (the magazine cover or the spread itself) that
 * the page surfaces inside an accordion: collapsed by default, expanded
 * shows the full magazine spread.
 *
 * Images point at sildel.pt's WordPress uploads (allowed in
 * next.config remotePatterns). Founder will hand over higher-res
 * versions for /public/Slidel/press/ — swap paths then.
 */

export type PressFeature = {
  id: string;
  publication: string;
  date: string;
  thumbnail: string;
  spread: string;
  alt: string;
};

const wp = (file: string) =>
  `https://sildel.pt/wp-content/uploads/2024/07/${file}`;

const FEATURES: PressFeature[] = [
  {
    id: "men-march-april-2023",
    publication: "Mobiliário em Notícia",
    date: "March / April '23",
    thumbnail: wp("Mobiliario-em-noticia-1024x1024.webp"),
    spread: wp("Mobiliario-em-noticia-1024x1024.webp"),
    alt: "Sildel featured in Mobiliário em Notícia magazine, March / April 2023.",
  },
  {
    id: "camden-house-january-2023",
    publication: "Camden House",
    date: "January '23",
    thumbnail: wp("camden-house-1024x1024.webp"),
    spread: wp("camden-house-1024x1024.webp"),
    alt: "Sildel featured in Camden House, January 2023.",
  },
  {
    id: "vogue-october-2022",
    publication: "Vogue",
    date: "October '22",
    thumbnail: wp("vogue-october-2-1024x1024.webp"),
    spread: wp("vogue-october-2-1024x1024.webp"),
    alt: "Sildel featured in Vogue magazine, October 2022.",
  },
  {
    id: "men-october-2022",
    publication: "Mobiliário em Notícia",
    date: "October '22",
    thumbnail: wp("Mobiliario-em-Noticia-1-1024x1024.webp"),
    spread: wp("Mobiliario-em-Noticia-1-1024x1024.webp"),
    alt: "Sildel featured in Mobiliário em Notícia magazine, October 2022.",
  },
  {
    id: "vogue-september-2022",
    publication: "Vogue",
    date: "September '22",
    thumbnail: wp("vogue-september-1024x1024.webp"),
    spread: wp("vogue-september-1024x1024.webp"),
    alt: "Sildel featured in Vogue magazine, September 2022.",
  },
  {
    id: "vogue-august-2022",
    publication: "Vogue",
    date: "August '22",
    thumbnail: wp("vogue_-august-1024x1024.webp"),
    spread: wp("vogue_-august-1024x1024.webp"),
    alt: "Sildel featured in Vogue magazine, August 2022.",
  },
  {
    id: "men-june-2022",
    publication: "Mobiliário em Notícia",
    date: "June '22",
    thumbnail: wp("Mobiliario-em-Noticia-June-1024x1024.webp"),
    spread: wp("Mobiliario-em-Noticia-June-1024x1024.webp"),
    alt: "Sildel featured in Mobiliário em Notícia magazine, June 2022.",
  },
  {
    id: "men-april-2022",
    publication: "Mobiliário em Notícia",
    date: "April '22",
    thumbnail: wp("Mobiliario-em-Noticia-April-1024x1024.webp"),
    spread: wp("Mobiliario-em-Noticia-April-1024x1024.webp"),
    alt: "Sildel featured in Mobiliário em Notícia magazine, April 2022.",
  },
  {
    id: "men-february-2022",
    publication: "Mobiliário em Notícia",
    date: "February '22",
    thumbnail: wp("Mobiliario-em-Noticia-February-1024x1024.webp"),
    spread: wp("Mobiliario-em-Noticia-February-1024x1024.webp"),
    alt: "Sildel featured in Mobiliário em Notícia magazine, February 2022.",
  },
];

const PT_FEATURES: PressFeature[] = FEATURES.map((f) => {
  const ptDate = f.date
    .replace("March / April", "Março / Abril")
    .replace("January", "Janeiro")
    .replace("February", "Fevereiro")
    .replace("April", "Abril")
    .replace("June", "Junho")
    .replace("August", "Agosto")
    .replace("September", "Setembro")
    .replace("October", "Outubro");
  return {
    ...f,
    date: ptDate,
    alt: f.alt
      .replace(
        "Sildel featured in",
        "A Sildel em destaque na revista",
      )
      .replace(" magazine,", ",")
      .replace("March / April", "Março / Abril")
      .replace("January", "Janeiro")
      .replace("February", "Fevereiro")
      .replace("April", "Abril")
      .replace("June", "Junho")
      .replace("August", "Agosto")
      .replace("September", "Setembro")
      .replace("October", "Outubro"),
  };
});

export const pressEn = {
  hero: {
    eyebrow: "Press",
    title: "Sildel",
    titleAccent: "in print.",
    intro:
      "Eight design and interiors magazines that have written about Sildel — the atelier, the pieces, and the slow practice behind the cork.",
    image:
      "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1521-e8190a09d3.webp",
    imageAlt:
      "A Sildel cork piece displayed in editorial light — the atelier's signature silhouette.",
  },
  features: FEATURES,
  cta: {
    eyebrow: "Press enquiries",
    title: "Writing about",
    titleAccent: "Sildel?",
    body:
      "Higher-resolution images, samples and quotes for press features are available on request. Write to us and we'll come back the same day.",
    label: "Contact us",
    href: "/contact",
    closingLine: "Designed in Portugal · Hand-finished",
  },
};

const pressPt = {
  hero: {
    eyebrow: "Imprensa",
    title: "A Sildel",
    titleAccent: "na imprensa.",
    intro:
      "Oito revistas de design e decoração que escreveram sobre a Sildel — o atelier, as peças e o ritmo lento por trás da cortiça.",
    image: pressEn.hero.image,
    imageAlt:
      "Peça em cortiça da Sildel sob luz editorial — silhueta característica do atelier.",
  },
  features: PT_FEATURES,
  cta: {
    eyebrow: "Pedidos de imprensa",
    title: "Escrever sobre",
    titleAccent: "a Sildel?",
    body:
      "Imagens em alta resolução, amostras e citações para artigos de imprensa disponíveis a pedido. Escreva-nos e respondemos no próprio dia.",
    label: "Fale connosco",
    href: "/contact",
    closingLine: "Desenhado em Portugal · Feito à mão",
  },
};

export type PressContent = typeof pressEn;

export function getPress(locale: Locale): PressContent {
  return locale === "pt" ? (pressPt as PressContent) : pressEn;
}