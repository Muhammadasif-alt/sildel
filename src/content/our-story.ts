/**
 * Our Story content — locale-aware.
 *
 * Section components import `ourStory` for default English access. To deliver
 * localized content, the page wraps children in `OurStoryProvider data={...}`
 * (see provider file) — components that opt into the context get the
 * localized strings; the rest fall back to English.
 */
import type { Locale } from "@/lib/i18n/config";
import { ourStoryEn } from "./our-story.en";
import { ourStoryPt } from "./our-story.pt";

export type OurStoryContent = typeof ourStoryEn;

export function getOurStory(locale: Locale): OurStoryContent {
  return locale === "pt" ? ourStoryPt : ourStoryEn;
}

export const ourStory = ourStoryEn;
