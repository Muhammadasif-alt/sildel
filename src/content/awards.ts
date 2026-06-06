/**
 * Awards & Recognition content.
 *
 * Three international distinctions awarded to Sildel — We Think Cork.
 * Sources (forwarded by Isabel Silva, founder):
 *  - Corporate LiveWire — Innovation & Excellence Awards 2026
 *    ("Unique Design Brand of the Year"), confirmed 5 May 2026.
 *  - LUXlife (AI Publishing) — Home & Garden Awards 2026
 *    ("Sustainable Cork Design & Craftsmanship Company of the Year — Portugal"),
 *    confirmed 7 April 2026.
 *  - Luxuri Magazine — Awards 2025
 *    ("Iberian Cork Artistry Brand of the Year — Porto 2025"),
 *    public listing at luxurimag.com/award-winner-2025/sildel-we-think-cork/,
 *    confirmed 12 February 2026.
 *
 * Isabel took the complimentary / free package for all three — no purchased
 * trophies — so the on-site framing stays factual: "named", "recognised",
 * "featured". The CLW and LUXlife public announcements are still pending
 * (LUXlife June 2026; CLW with the next Global Awards Winners Guide), so
 * those two cards currently reference the email-confirmed category titles
 * only. The Luxuri card links out to the publicly live listing.
 */

import type { Locale } from "@/lib/i18n/config";

export type Award = {
  slug: string;
  year: string;
  title: string;
  org: string;
  issuer: string;
  image?: string;
  imageAlt?: string;
  link?: string;
};

export type AwardsContent = {
  section: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
  };
  awards: Award[];
  viewListing: string;
};

const awardsEn: AwardsContent = {
  section: {
    eyebrow: "Recognition",
    title: "Awarded for",
    titleAccent: "our craft.",
    body:
      "International juries have recognised Sildel's work with authentic Portuguese cork — sculpture, lighting and fine art shaped by hand in Esmoriz.",
  },
  awards: [
    {
      slug: "iea-2026",
      year: "2026",
      title: "Unique Design Brand of the Year",
      org: "Innovation & Excellence Awards",
      issuer: "Corporate LiveWire",
      image: "/Award/image001.jpg",
      imageAlt:
        "Corporate LiveWire Innovation & Excellence Awards — 2026 Winner badge.",
    },
    {
      slug: "luxlife-2026",
      year: "2026",
      title:
        "Sustainable Cork Design & Craftsmanship Company of the Year — Portugal",
      org: "Home & Garden Awards",
      issuer: "LUXlife",
      image: "/Award/unnamed.jpg",
      imageAlt: "LUXlife Home & Garden Awards 2026 — congratulations banner.",
    },
    {
      slug: "luxuri-2025",
      year: "2025",
      title: "Iberian Cork Artistry Brand of the Year",
      org: "Luxuri Awards — Porto 2025",
      issuer: "Luxuri Magazine",
      link: "https://www.luxurimag.com/award-winner-2025/sildel-we-think-cork/",
    },
  ],
  viewListing: "View listing",
};

const awardsPt: AwardsContent = {
  section: {
    eyebrow: "Distinções",
    title: "Premiados pelo",
    titleAccent: "nosso ofício.",
    body:
      "Júris internacionais reconheceram o trabalho da Sildel com cortiça portuguesa autêntica — escultura, iluminação e belas artes moldadas à mão em Esmoriz.",
  },
  awards: [
    {
      slug: "iea-2026",
      year: "2026",
      title: "Marca de Design Único do Ano",
      org: "Innovation & Excellence Awards",
      issuer: "Corporate LiveWire",
      image: "/Award/image001.jpg",
      imageAlt:
        "Selo de vencedor Corporate LiveWire Innovation & Excellence Awards 2026.",
    },
    {
      slug: "luxlife-2026",
      year: "2026",
      title:
        "Empresa do Ano em Design e Artesanato Sustentável em Cortiça — Portugal",
      org: "Home & Garden Awards",
      issuer: "LUXlife",
      image: "/Award/unnamed.jpg",
      imageAlt:
        "LUXlife Home & Garden Awards 2026 — faixa de felicitações.",
    },
    {
      slug: "luxuri-2025",
      year: "2025",
      title: "Marca do Ano em Arte da Cortiça Ibérica",
      org: "Luxuri Awards — Porto 2025",
      issuer: "Luxuri Magazine",
      link: "https://www.luxurimag.com/award-winner-2025/sildel-we-think-cork/",
    },
  ],
  viewListing: "Ver listagem",
};

export function getAwards(locale: Locale): AwardsContent {
  return locale === "pt" ? awardsPt : awardsEn;
}