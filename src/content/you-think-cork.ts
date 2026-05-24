import type { Locale } from "@/lib/i18n/config";
import { youThinkCorkEn } from "./you-think-cork.en";
import { youThinkCorkPt } from "./you-think-cork.pt";

export type YouThinkCorkContent = typeof youThinkCorkEn;

export function getYouThinkCork(locale: Locale): YouThinkCorkContent {
  return locale === "pt" ? youThinkCorkPt : youThinkCorkEn;
}

export const youThinkCork = youThinkCorkEn;
