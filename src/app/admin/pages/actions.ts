"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/db/prisma";
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

  const blocks = (payload.blocks ?? [])
    .filter((b) => findBlockType(b.type))
    .map((b, i) => ({
      id: b.id || randomUUID(),
      type: b.type,
      order: i,
      hidden: b.hidden === true,
      content: b.content && typeof b.content === "object" ? b.content : {},
    }));

  const seo = payload.seo ?? {
    title: { pt: "", en: "" },
    description: { pt: "", en: "" },
  };

  await prisma.pageContent.upsert({
    where: { pageKey },
    update: {
      blocks: blocks as never,
      seo: seo as never,
    },
    create: {
      pageKey,
      blocks: blocks as never,
      seo: seo as never,
    },
  });

  revalidateForPage(pageKey);
  return { ok: true };
}

/**
 * Save all fields for a page in one shot. The simple editor sends the full
 * sections/fields tree on each save.
 *
 * Shape: { [sectionKey]: { [fieldKey]: string } }
 */
export async function savePageContentAction(
  pageKey: string,
  values: Record<string, Record<string, string>>,
): Promise<{ ok: true }> {
  await requireAdmin();
  if (!findPage(pageKey)) throw new Error(`Unknown page: ${pageKey}`);

  const sections: Record<string, { fields: Record<string, string> }> = {};
  for (const [sectionKey, fields] of Object.entries(values ?? {})) {
    if (!fields || typeof fields !== "object") continue;
    const clean: Record<string, string> = {};
    for (const [fk, fv] of Object.entries(fields)) {
      if (typeof fv === "string") clean[fk] = fv;
    }
    sections[sectionKey] = { fields: clean };
  }

  await prisma.pageContent.upsert({
    where: { pageKey },
    update: { sections },
    create: { pageKey, sections },
  });

  revalidateForPage(pageKey);
  return { ok: true };
}
