/**
 * Server-side readers for the block-based CMS.
 *
 *   getPage(pageKey)        -> full StoredPage (blocks + seo)
 *   getPageBlocks(pageKey)  -> sorted, visible blocks for the public renderer
 *
 * Reads from Prisma `PageContent`. Falls back to an empty page when the DB
 * is unreachable so the build / dev server never hard-fails for content.
 */
import "server-only";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/db/prisma";
import type { Block, StoredPage } from "@/lib/blocks/types";

const EMPTY: StoredPage = { pageKey: "", blocks: [] };

function toPlain(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(toPlain);
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

type StoredSeo = {
  title?: { pt?: string; en?: string };
  description?: { pt?: string; en?: string };
};

export async function getPage(pageKey: string): Promise<StoredPage> {
  try {
    const row = await prisma.pageContent.findUnique({
      where: { pageKey },
      select: { blocks: true, seo: true },
    });
    if (!row) return { ...EMPTY, pageKey };

    const rawBlocks = Array.isArray(row.blocks) ? row.blocks : [];
    const blocks = (rawBlocks
      .map((b, i) => normalizeBlock(b, i))
      .filter(Boolean) as Block[]).sort((a, b) => a.order - b.order);

    const seoRaw = row.seo && typeof row.seo === "object" && !Array.isArray(row.seo)
      ? (row.seo as StoredSeo)
      : undefined;

    return {
      pageKey,
      blocks,
      seo: seoRaw
        ? {
            title: seoRaw.title,
            description: seoRaw.description,
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