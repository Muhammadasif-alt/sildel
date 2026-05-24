/**
 * Server-side readers for the block-based CMS.
 *
 *   getPage(pageKey)        -> full StoredPage (blocks + seo + legacy sections)
 *   getPageBlocks(pageKey)  -> sorted, visible blocks for the public renderer
 *
 * Both connect to MongoDB and gracefully return empty results if the DB is
 * unreachable so the build / dev server never hard-fails for content alone.
 */
import "server-only";
import { randomUUID } from "crypto";
import { connectDb } from "@/lib/db/connect";
import { PageContentModel } from "@/lib/models/page-content.model";
import type { Block, StoredPage } from "@/lib/blocks/types";

const EMPTY: StoredPage = { pageKey: "", blocks: [] };

/**
 * Deep-strip non-serializable shapes from Mongoose-leaned Mixed content:
 * - Map / Set → not used here but handled
 * - Objects with null prototype (Mongoose Mixed sub-docs) → plain {}
 * - Buffers, BSON types → coerced via JSON
 * The result is safe to pass from server components to client components.
 */
function toPlain(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(toPlain);
  // Date stays as a string (client components can't receive Date instances)
  if (value instanceof Date) return value.toISOString();
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) out[k] = toPlain(v);
  return out;
}

function normalizeBlock(raw: unknown, idx: number): Block | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const type = typeof r.type === "string" ? r.type : "";
  if (!type) return null;
  const content =
    r.content && typeof r.content === "object"
      ? (toPlain(r.content) as Record<string, unknown>)
      : {};
  return {
    id: typeof r.id === "string" && r.id ? r.id : randomUUID(),
    type,
    order: typeof r.order === "number" ? r.order : idx,
    hidden: r.hidden === true,
    content,
  };
}

export async function getPage(pageKey: string): Promise<StoredPage> {
  try {
    await connectDb();
    const doc = await PageContentModel.findOne({ pageKey }).lean();
    if (!doc) return { ...EMPTY, pageKey };

    const blocks = Array.isArray(doc.blocks)
      ? (doc.blocks
          .map((b, i) => normalizeBlock(b, i))
          .filter(Boolean) as Block[])
      : [];
    blocks.sort((a, b) => a.order - b.order);

    return {
      pageKey,
      blocks,
      seo: doc.seo
        ? {
            title: doc.seo.title ?? undefined,
            description: doc.seo.description ?? undefined,
          }
        : undefined,
    };
  } catch {
    return { ...EMPTY, pageKey };
  }
}

export async function getPageBlocks(pageKey: string): Promise<Block[]> {
  const page = await getPage(pageKey);
  return page.blocks.filter((b) => !b.hidden);
}
