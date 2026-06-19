import "server-only";
import { connectDb } from "@/lib/db/connect";
import { EditorialContentModel } from "@/lib/models/editorial-content.model";
import type { EditorialContentDoc } from "./types";

/**
 * Load the stored editorial content for a page. Returns `null` if the
 * page hasn't been edited in admin yet (in which case the public route
 * should fall back to its TS file).
 */
export async function loadEditorialContent(
  pageKey: string,
): Promise<EditorialContentDoc | null> {
  try {
    await connectDb();
    const doc = await EditorialContentModel.findOne({ pageKey }).lean();
    if (!doc || !doc.content) return null;
    return doc.content as EditorialContentDoc;
  } catch {
    return null;
  }
}