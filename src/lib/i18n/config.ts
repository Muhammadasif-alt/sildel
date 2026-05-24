/**
 * i18n configuration — single source of truth for supported locales.
 *
 * Locale is stored in a cookie (`sildel-locale`). Server components read it
 * via `getLocale()` (server-only); client components via `useLocale()`.
 * Default is Portuguese because the client/owner is Portuguese and the shop
 * is registered in Portugal.
 */

export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";

export const LOCALE_COOKIE = "sildel-locale";

export function isLocale(v: string | undefined | null): v is Locale {
  return v === "en" || v === "pt";
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};
