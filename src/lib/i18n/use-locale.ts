"use client";

import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";

/**
 * Read the current locale on the client by parsing document.cookie.
 *
 * Note: this is sync and only valid in the browser. Server components must
 * use `getLocale()` from `./get-locale` instead.
 */
export function readLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)`)
  );
  const v = match?.[1];
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

/** Persist the locale cookie (1 year). Caller is responsible for refresh. */
export function writeLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${oneYear}; samesite=lax`;
}
