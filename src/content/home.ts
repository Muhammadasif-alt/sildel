/**
 * Home content — locale-aware.
 *
 * Use `getHome(locale)` in server components after `await getLocale()`.
 * The legacy `home` export defaults to English and is kept so existing
 * client components keep working until they're wired through props.
 */
import type { Locale } from "@/lib/i18n/config";
import { homeEn } from "./home.en";
import { homePt } from "./home.pt";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: { label: string; href: string };
};

export type HomeContent = typeof homeEn;

export function getHome(locale: Locale): HomeContent {
  return locale === "pt" ? homePt : homeEn;
}

/** Back-compat export. New code should use `getHome(locale)`. */
export const home = homeEn;
