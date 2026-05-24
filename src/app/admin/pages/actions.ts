"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { PageContentModel } from "@/lib/models/page-content.model";
import { findPage } from "@/lib/content/page-list";
import { findBlockType } from "@/lib/blocks/registry";
import type { Block, StoredPage } from "@/lib/blocks/types";

function revalidateForPage(pageKey: string) {
  const def = findPage(pageKey);
  revalidatePath(`/admin/pages/${pageKey}`);
  if (def) revalidatePath(def.publicPath);
}

/**
 * Replace the entire blocks + seo for a page. The editor sends the full state
 * on every save so there's a single round-trip per save.
 */
export async function savePageBlocks(
  pageKey: string,
  payload: { blocks: Block[]; seo?: StoredPage["seo"] }
): Promise<{ ok: true }> {
  await requireAdmin();
  if (!findPage(pageKey)) throw new Error(`Unknown page: ${pageKey}`);

  await connectDb();

  const blocks = (payload.blocks ?? [])
    .filter((b) => findBlockType(b.type))
    .map((b, i) => ({
      id: b.id || randomUUID(),
      type: b.type,
      order: i,
      hidden: b.hidden === true,
      content: b.content && typeof b.content === "object" ? b.content : {},
    }));

  await PageContentModel.findOneAndUpdate(
    { pageKey },
    {
      pageKey,
      blocks,
      seo: payload.seo ?? {
        title: { pt: "", en: "" },
        description: { pt: "", en: "" },
      },
    },
    { upsert: true, new: true }
  );

  revalidateForPage(pageKey);
  return { ok: true };
}
