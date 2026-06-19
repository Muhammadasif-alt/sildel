/**
 * Schema descriptors for the editorial admin forms. A page schema is
 * a list of sections; each section has fields. The admin renderer walks
 * this tree to build the form, and the server action walks the same
 * tree on save to whitelist what's written to Mongo.
 *
 * Locale-aware text fields (`localized: true`) are stored as
 * `{ pt: string, en: string }`. Paragraphs (`type: "paragraphs"`) are
 * stored as `{ pt: string[], en: string[] }`.
 */

export type EditorialFieldType =
  | "text"
  | "textarea"
  | "paragraphs"
  | "image";

export type EditorialField = {
  key: string;
  label: string;
  type: EditorialFieldType;
  localized?: boolean;
  hint?: string;
};

export type EditorialSection = {
  key: string;
  label: string;
  description?: string;
  fields: EditorialField[];
};

export type EditorialSchema = {
  pageKey: string;
  title: string;
  description: string;
  publicPath: string;
  sections: EditorialSection[];
};

/**
 * Locale-aware value for a single text field.
 */
export type LocalizedText = { pt: string; en: string };

/**
 * Locale-aware value for a paragraphs field.
 */
export type LocalizedParagraphs = { pt: string[]; en: string[] };

/**
 * Stored value for one field — depends on type + localized.
 */
export type FieldValue =
  | string
  | string[]
  | LocalizedText
  | LocalizedParagraphs
  | undefined;

/**
 * Stored content document — section key → field key → value.
 */
export type EditorialContentDoc = Record<string, Record<string, FieldValue>>;