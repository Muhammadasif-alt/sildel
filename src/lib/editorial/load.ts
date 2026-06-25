import "server-only";
import type { EditorialContentDoc } from "./types";

/**
 * Editorial overrides used to live in MongoDB. After the 2026-06-24 Mongo
 * cleanup the editorial-block CMS was retired in favour of the simpler
 * /admin/pages field editor backed by Prisma. Resolvers still call this
 * helper for forwards-compatibility — it just returns null so every
 * marketing page falls back to its TS-file content.
 */
export async function loadEditorialContent(
  _pageKey: string,
): Promise<EditorialContentDoc | null> {
  return null;
}