"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2, ChevronDown, Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  EditorialField,
  EditorialSchema,
  EditorialContentDoc,
  FieldValue,
  LocalizedText,
  LocalizedParagraphs,
} from "@/lib/editorial/types";
import { saveEditorialContent } from "@/app/admin/editorial/actions";

type Locale = "pt" | "en";

/**
 * Schema-driven editorial-page editor.
 *
 * Renders one collapsible section per schema section. Inside each
 * section, one input per field — text / textarea / paragraphs array /
 * image. Localised fields get a small PT / EN tab; the active locale
 * is shared across the whole form so the founder can switch and edit
 * everything in one language at a time without losing her place.
 */
export function EditorialForm({
  schema,
  initial,
}: {
  schema: EditorialSchema;
  initial: EditorialContentDoc;
}) {
  const [content, setContent] = useState<EditorialContentDoc>(initial);
  const [locale, setLocale] = useState<Locale>("en");
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [pending, startTransition] = useTransition();
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set([schema.sections[0]?.key].filter(Boolean) as string[]),
  );

  function setField(sectionKey: string, fieldKey: string, value: FieldValue) {
    setContent((prev) => ({
      ...prev,
      [sectionKey]: { ...(prev[sectionKey] ?? {}), [fieldKey]: value },
    }));
    setStatus("idle");
  }

  function toggleSection(key: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleSave() {
    setStatus("idle");
    startTransition(async () => {
      try {
        await saveEditorialContent(schema.pageKey, content);
        setStatus("saved");
      } catch {
        setStatus("error");
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-4 z-20 flex items-center justify-between gap-4 rounded-xl border border-border bg-card/95 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
              locale === "en"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLocale("pt")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
              locale === "pt"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Português
          </button>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" ? (
            <span className="text-xs text-emerald-700">Saved</span>
          ) : null}
          {status === "error" ? (
            <span className="text-xs text-red-700">Save failed</span>
          ) : null}
          <button
            type="button"
            onClick={handleSave}
            disabled={pending}
            className="inline-flex items-center gap-2 bg-[#5b6740] px-5 py-2 text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#4a5530] disabled:opacity-60"
          >
            {pending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {schema.sections.map((section) => {
        const open = openSections.has(section.key);
        return (
          <section
            key={section.key}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <button
              type="button"
              onClick={() => toggleSection(section.key)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/40"
            >
              <div>
                <h2 className="font-serif text-lg text-foreground">
                  {section.label}
                </h2>
                {section.description ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {section.description}
                  </p>
                ) : null}
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>
            {open ? (
              <div className="space-y-5 border-t border-border bg-background px-5 py-5">
                {section.fields.map((field) => (
                  <FieldEditor
                    key={field.key}
                    field={field}
                    value={content[section.key]?.[field.key]}
                    locale={locale}
                    onChange={(v) => setField(section.key, field.key, v)}
                  />
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

function FieldEditor({
  field,
  value,
  locale,
  onChange,
}: {
  field: EditorialField;
  value: FieldValue;
  locale: Locale;
  onChange: (v: FieldValue) => void;
}) {
  const labelId = `field-${field.key}`;

  return (
    <div>
      <label
        htmlFor={labelId}
        className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-foreground"
      >
        <span>{field.label}</span>
        {field.localized ? (
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {locale === "pt" ? "PT" : "EN"}
          </span>
        ) : null}
      </label>

      {field.type === "text" ? (
        <TextField
          id={labelId}
          field={field}
          value={value}
          locale={locale}
          onChange={onChange}
        />
      ) : null}

      {field.type === "textarea" ? (
        <TextField
          id={labelId}
          field={field}
          value={value}
          locale={locale}
          onChange={onChange}
          multiline
        />
      ) : null}

      {field.type === "paragraphs" ? (
        <ParagraphsField
          field={field}
          value={value}
          locale={locale}
          onChange={onChange}
        />
      ) : null}

      {field.type === "image" ? (
        <ImageField id={labelId} value={value} onChange={onChange} />
      ) : null}

      {field.hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{field.hint}</p>
      ) : null}
    </div>
  );
}

function TextField({
  id,
  field,
  value,
  locale,
  onChange,
  multiline = false,
}: {
  id: string;
  field: EditorialField;
  value: FieldValue;
  locale: Locale;
  onChange: (v: FieldValue) => void;
  multiline?: boolean;
}) {
  const current = readText(field, value, locale);

  function update(next: string) {
    if (field.localized) {
      const existing = (value as LocalizedText | undefined) ?? {
        pt: "",
        en: "",
      };
      onChange({ ...existing, [locale]: next });
    } else {
      onChange(next);
    }
  }

  const baseClasses =
    "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

  return multiline ? (
    <textarea
      id={id}
      value={current}
      onChange={(e) => update(e.target.value)}
      rows={3}
      className={cn(baseClasses, "min-h-[88px] resize-y")}
    />
  ) : (
    <input
      id={id}
      type="text"
      value={current}
      onChange={(e) => update(e.target.value)}
      className={baseClasses}
    />
  );
}

function ParagraphsField({
  field,
  value,
  locale,
  onChange,
}: {
  field: EditorialField;
  value: FieldValue;
  locale: Locale;
  onChange: (v: FieldValue) => void;
}) {
  const list = readParagraphs(field, value, locale);

  function setList(next: string[]) {
    if (field.localized) {
      const existing = (value as LocalizedParagraphs | undefined) ?? {
        pt: [],
        en: [],
      };
      onChange({ ...existing, [locale]: next });
    } else {
      onChange(next);
    }
  }

  function updateAt(i: number, next: string) {
    const copy = list.slice();
    copy[i] = next;
    setList(copy);
  }

  function removeAt(i: number) {
    setList(list.filter((_, j) => j !== i));
  }

  function add() {
    setList([...list, ""]);
  }

  return (
    <div className="space-y-3">
      {list.map((p, i) => (
        <div key={i} className="flex items-start gap-2">
          <textarea
            value={p}
            onChange={(e) => updateAt(i, e.target.value)}
            rows={3}
            className="min-h-[80px] flex-1 resize-y rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder={`Paragraph ${i + 1}`}
          />
          <button
            type="button"
            onClick={() => removeAt(i)}
            className="mt-1 rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-red-300 hover:text-red-600"
            aria-label="Remove paragraph"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 text-xs text-primary transition-colors hover:text-primary/80"
      >
        <Plus className="h-3.5 w-3.5" /> Add paragraph
      </button>
    </div>
  );
}

function ImageField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: FieldValue;
  onChange: (v: FieldValue) => void;
}) {
  const current = typeof value === "string" ? value : "";

  return (
    <div className="space-y-3">
      <input
        id={id}
        type="text"
        value={current}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/Slidel/… or full https://… URL"
        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      {current ? (
        <div className="relative aspect-[3/2] w-full max-w-md overflow-hidden rounded-md border border-border bg-muted">
          <Image
            src={current}
            alt="Preview"
            fill
            sizes="(min-width: 768px) 400px, 90vw"
            className="object-cover"
            unoptimized={current.startsWith("http")}
          />
        </div>
      ) : null}
      <p className="text-xs text-muted-foreground">
        Paste an image path from the media library, or a full URL.
      </p>
    </div>
  );
}

/* ---------- helpers ---------- */

function readText(
  field: EditorialField,
  value: FieldValue,
  locale: Locale,
): string {
  if (field.localized) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return (value as LocalizedText)[locale] ?? "";
    }
    return "";
  }
  return typeof value === "string" ? value : "";
}

function readParagraphs(
  field: EditorialField,
  value: FieldValue,
  locale: Locale,
): string[] {
  if (field.localized) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const list = (value as LocalizedParagraphs)[locale];
      return Array.isArray(list) ? list : [];
    }
    return [];
  }
  return Array.isArray(value) ? (value as string[]) : [];
}