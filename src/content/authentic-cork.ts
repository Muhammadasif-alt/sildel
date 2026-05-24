import type { Locale } from "@/lib/i18n/config";
import { authenticCorkEn } from "./authentic-cork.en";
import { authenticCorkPt } from "./authentic-cork.pt";

export type AuthenticCorkContent = typeof authenticCorkEn;

export function getAuthenticCork(locale: Locale): AuthenticCorkContent {
  return locale === "pt" ? authenticCorkPt : authenticCorkEn;
}

export const authenticCork = authenticCorkEn;
