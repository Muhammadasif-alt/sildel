import type { EditorialSchema } from "./types";
import { ourStorySchema } from "./schemas/our-story.schema";
import { authenticCorkSchema } from "./schemas/authentic-cork.schema";
import { youThinkCorkSchema } from "./schemas/you-think-cork.schema";
import { partnersSchema } from "./schemas/partners.schema";
import { treasuresSchema } from "./schemas/treasures.schema";
import { contactSchema } from "./schemas/contact.schema";
import { faqSchema } from "./schemas/faq.schema";
import { pressSchema } from "./schemas/press.schema";

/**
 * Registry of all editorial-page schemas. Drives the admin sidebar /
 * index list and the /admin/editorial/[pageKey] route resolver.
 *
 * All eight editorial pages are wired — add new ones here.
 */
export const EDITORIAL_SCHEMAS: EditorialSchema[] = [
  ourStorySchema,
  authenticCorkSchema,
  youThinkCorkSchema,
  partnersSchema,
  treasuresSchema,
  contactSchema,
  faqSchema,
  pressSchema,
];

export function findEditorialSchema(
  pageKey: string,
): EditorialSchema | undefined {
  return EDITORIAL_SCHEMAS.find((s) => s.pageKey === pageKey);
}