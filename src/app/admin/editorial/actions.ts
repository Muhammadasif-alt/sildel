"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { EditorialContentModel } from "@/lib/models/editorial-content.model";
import {
  EDITORIAL_SCHEMAS,
  findEditorialSchema,
} from "@/lib/editorial/registry";
import type {
  EditorialContentDoc,
  EditorialField,
  FieldValue,
  TitledListItem,
} from "@/lib/editorial/types";

/**
 * Whitelist the payload against the schema so unknown fields can't be
 * written to Mongo. Walks every section + field declared in the schema
 * and copies the matching value out of the incoming payload, coercing
 * to the right shape (text → string, paragraphs → string[], localised
 * → { pt, en }).
 */
function sanitise(
  pageKey: string,
  payload: EditorialContentDoc,
): EditorialContentDoc {
  const schema = findEditorialSchema(pageKey);
  if (!schema) throw new Error(`Unknown editorial page: ${pageKey}`);

  const out: EditorialContentDoc = {};

  for (const section of schema.sections) {
    const incoming = payload[section.key] ?? {};
    const cleaned: Record<string, FieldValue> = {};

    for (const field of section.fields) {
      cleaned[field.key] = cleanField(field, incoming[field.key]);
    }
    out[section.key] = cleaned;
  }

  return out;
}

function cleanField(field: EditorialField, value: FieldValue): FieldValue {
  if (field.type === "paragraphs") {
    if (field.localized) {
      const v = (value && typeof value === "object" && !Array.isArray(value)
        ? (value as Record<string, unknown>)
        : {}) as { pt?: unknown; en?: unknown };
      return {
        pt: toStringArray(v.pt),
        en: toStringArray(v.en),
      };
    }
    return toStringArray(value);
  }

  if (field.type === "image") {
    return typeof value === "string" ? value : "";
  }

  if (field.type === "titledList") {
    if (!Array.isArray(value)) return [];
    return value
      .map((row): TitledListItem | null => {
        if (!row || typeof row !== "object") return null;
        const r = row as Record<string, unknown>;
        const title = readLocalised(r.title);
        const body = readLocalised(r.body);
        if (!title.en && !title.pt && !body.en && !body.pt) return null;
        return { title, body };
      })
      .filter((x): x is TitledListItem => x !== null);
  }

  // text / textarea
  if (field.localized) {
    const v = (value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {}) as { pt?: unknown; en?: unknown };
    return {
      pt: typeof v.pt === "string" ? v.pt : "",
      en: typeof v.en === "string" ? v.en : "",
    };
  }
  return typeof value === "string" ? value : "";
}

function readLocalised(v: unknown): { pt: string; en: string } {
  const o =
    v && typeof v === "object" && !Array.isArray(v)
      ? (v as Record<string, unknown>)
      : {};
  return {
    pt: typeof o.pt === "string" ? o.pt : "",
    en: typeof o.en === "string" ? o.en : "",
  };
}

function toStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => (typeof x === "string" ? x : ""))
    .filter((x) => x.length > 0);
}

/**
 * Save the editorial content for a page. Replaces the entire content
 * blob in one round-trip (the editor sends full state on every save).
 */
export async function saveEditorialContent(
  pageKey: string,
  content: EditorialContentDoc,
): Promise<{ ok: true }> {
  await requireAdmin();
  const schema = findEditorialSchema(pageKey);
  if (!schema) throw new Error(`Unknown editorial page: ${pageKey}`);

  const sanitised = sanitise(pageKey, content);

  await connectDb();
  await EditorialContentModel.findOneAndUpdate(
    { pageKey },
    { pageKey, content: sanitised },
    { upsert: true, new: true },
  );

  revalidatePath(`/admin/editorial/${pageKey}`);
  revalidatePath(schema.publicPath);

  return { ok: true };
}

/**
 * Server-side helper for the admin index — returns the count of
 * editorial pages that have at least one saved revision.
 */
export async function listEditorialEditedPages(): Promise<Set<string>> {
  try {
    await connectDb();
    const docs = await EditorialContentModel.find(
      { pageKey: { $in: EDITORIAL_SCHEMAS.map((s) => s.pageKey) } },
      { pageKey: 1 },
    ).lean();
    return new Set(docs.map((d) => d.pageKey));
  } catch {
    return new Set();
  }
}