import type { EditorialSchema } from "./types";
import { ourStorySchema } from "./schemas/our-story.schema";
import { authenticCorkSchema } from "./schemas/authentic-cork.schema";
import { youThinkCorkSchema } from "./schemas/you-think-cork.schema";
import { partnersSchema } from "./schemas/partners.schema";
import { treasuresSchema } from "./schemas/treasures.schema";

/**
 * Registry of all editorial-page schemas. Drives the admin sidebar /
 * index list and the /admin/editorial/[pageKey] route resolver.
 *
 * Remaining editorial pages (contact, faq, press) will be added one
 * at a time.
 */
export const EDITORIAL_SCHEMAS: EditorialSchema[] = [
  ourStorySchema,
  authenticCorkSchema,
  youThinkCorkSchema,
  partnersSchema,
  treasuresSchema,
];

export function findEditorialSchema(
  pageKey: string,
): EditorialSchema | undefined {
  return EDITORIAL_SCHEMAS.find((s) => s.pageKey === pageKey);
}