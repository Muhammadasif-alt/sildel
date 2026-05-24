/**
 * Block + Page types shared between server (models, actions, renderers) and
 * client (admin editor). All field types are JSON-serializable so the same
 * registry can drive both the admin form and the public renderer.
 */

export type Locale = "pt" | "en";
export const LOCALES: Locale[] = ["pt", "en"];

/** A localized string holds one value per supported locale. */
export type Localized = Partial<Record<Locale, string>>;

/** Field types supported by the block editor. */
export type FieldType =
  | "text"
  | "textarea"
  | "richText"
  | "image"
  | "video"
  | "url"
  | "select"
  | "boolean"
  | "number"
  | "color"
  | "products"
  | "repeater";

export type SelectOption = { value: string; label: string };

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  /** Whether this field stores one value per locale (PT/EN). */
  localized?: boolean;
  /** For "select": dropdown options. */
  options?: SelectOption[];
  /** For "repeater": shape of each item. */
  itemFields?: FieldDef[];
  /** For "repeater": label of the "Add" button. */
  itemLabel?: string;
  /** For "number": min/max bounds. */
  min?: number;
  max?: number;
  /** Default value used when adding a new block / repeater row. */
  defaultValue?: unknown;
};

export type BlockTypeDef = {
  type: string;
  label: string;
  description: string;
  /** Lucide icon name used in the admin block-picker. */
  icon: string;
  fields: FieldDef[];
};

/**
 * A block as stored in the DB. `content` shape depends on `type` and matches
 * the registered FieldDef[] for that type. Localized fields are stored as
 * `{ pt: "...", en: "..." }`; non-localized fields hold the bare value.
 */
export type Block = {
  id: string;
  type: string;
  order: number;
  /** Hide on the public site without deleting. */
  hidden?: boolean;
  content: Record<string, unknown>;
};

/** A page as stored in the DB. */
export type StoredPage = {
  pageKey: string;
  blocks: Block[];
  seo?: {
    title?: Localized;
    description?: Localized;
  };
};

/* ----------------------------- helpers --------------------------------- */

/** Pick a localized string with fallback chain en -> pt -> "". */
export function pickLocalized(
  value: unknown,
  locale: Locale,
  fallback = ""
): string {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  if (typeof value !== "object") return fallback;
  const v = value as Record<string, unknown>;
  const own = v[locale];
  if (typeof own === "string" && own.trim()) return own;
  const other = locale === "pt" ? v.en : v.pt;
  if (typeof other === "string" && other.trim()) return other;
  return fallback;
}

/** Read a field from a block's content with a default fallback. */
export function readField<T = unknown>(
  block: Block,
  key: string,
  fallback: T
): T {
  const v = block.content?.[key];
  return (v === undefined || v === null ? fallback : v) as T;
}

/** Read a localized string field from a block's content. */
export function readLocalized(
  block: Block,
  key: string,
  locale: Locale,
  fallback = ""
): string {
  return pickLocalized(block.content?.[key], locale, fallback);
}
