import type { EditorialSchema } from "./types";
import { ourStorySchema } from "./schemas/our-story.schema";

/**
 * Registry of all editorial-page schemas. Drives the admin sidebar /
 * index list and the /admin/editorial/[pageKey] route resolver.
 *
 * Other editorial pages (authentic-cork, you-think-cork, partners,
 * treasures, contact, faq, press) will be added incrementally.
 */
export const EDITORIAL_SCHEMAS: EditorialSchema[] = [ourStorySchema];

export function findEditorialSchema(
  pageKey: string,
): EditorialSchema | undefined {
  return EDITORIAL_SCHEMAS.find((s) => s.pageKey === pageKey);
}