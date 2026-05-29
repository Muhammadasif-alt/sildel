import type { Locale } from "@/lib/i18n/config";
import { partnersEn } from "./partners.en";
import { partnersPt } from "./partners.pt";

export type PartnerImage = { src: string; caption?: string };

export type Partner = {
  slug: string;
  name: string;
  kicker: string;
  intro: string;
  note?: string;
  layout: "split" | "products";
  transparent: boolean;
  paragraphs: string[];
  images: PartnerImage[];
};

export type PartnersContent = {
  section: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
  };
  partners: Partner[];
};

export function getPartners(locale: Locale): PartnersContent {
  return locale === "pt" ? partnersPt : partnersEn;
}