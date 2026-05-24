"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Image as ImageIcon, X } from "lucide-react";
import { MediaPicker } from "./media-picker";
import type { FieldDef, Locale } from "@/lib/blocks/types";
import { LOCALES } from "@/lib/blocks/types";

type Props = {
  field: FieldDef;
  value: unknown;
  onChange: (next: unknown) => void;
  locale: Locale;
};

const labelCls = "mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground";
const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

export function FieldInput({ field, value, onChange, locale }: Props) {
  const isLocalized = !!field.localized;

  if (field.type === "repeater") {
    return <RepeaterField field={field} value={value as unknown[]} onChange={(v) => onChange(v)} locale={locale} />;
  }

  if (field.type === "image" || field.type === "video") {
    return (
      <MediaField
        field={field}
        value={typeof value === "string" ? value : ""}
        onChange={(v) => onChange(v)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <label className={labelCls}>{field.label}</label>
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          {(field.options ?? []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {field.hint && <p className="mt-1 text-[11px] text-muted-foreground/80">{field.hint}</p>}
      </div>
    );
  }

  if (field.type === "boolean") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-border"
        />
        <label className="text-sm text-foreground">{field.label}</label>
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div>
        <label className={labelCls}>{field.label}</label>
        <input
          type="number"
          value={typeof value === "number" ? value : ""}
          min={field.min}
          max={field.max}
          onChange={(e) =>
            onChange(e.target.value === "" ? undefined : Number(e.target.value))
          }
          className={inputCls}
        />
        {field.hint && <p className="mt-1 text-[11px] text-muted-foreground/80">{field.hint}</p>}
      </div>
    );
  }

  // text / textarea / richText / url / color / products → string-like
  if (isLocalized) {
    return (
      <LocalizedStringField
        field={field}
        value={value as Record<string, string> | undefined}
        onChange={(v) => onChange(v)}
        locale={locale}
      />
    );
  }

  const isMulti = field.type === "textarea" || field.type === "richText";
  return (
    <div>
      <label className={labelCls}>{field.label}</label>
      {isMulti ? (
        <textarea
          rows={field.type === "richText" ? 6 : 3}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      ) : (
        <input
          type={field.type === "url" ? "text" : field.type === "color" ? "color" : "text"}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
      {field.hint && <p className="mt-1 text-[11px] text-muted-foreground/80">{field.hint}</p>}
    </div>
  );
}

/* ---------- localized string (PT/EN tabs) ---------- */

function LocalizedStringField({
  field,
  value,
  onChange,
  locale,
}: {
  field: FieldDef;
  value: Record<string, string> | undefined;
  onChange: (v: Record<string, string>) => void;
  locale: Locale;
}) {
  const current = value && typeof value === "object" ? value : {};
  const isMulti = field.type === "textarea" || field.type === "richText";

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className={labelCls + " mb-0"}>{field.label}</label>
        <div className="flex gap-1">
          {LOCALES.map((l) => (
            <span
              key={l}
              className={
                "rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider " +
                (l === locale
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground")
              }
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      {isMulti ? (
        <textarea
          rows={field.type === "richText" ? 6 : 3}
          value={current[locale] ?? ""}
          onChange={(e) => onChange({ ...current, [locale]: e.target.value })}
          className={inputCls}
          placeholder={locale === "pt" ? "Português" : "English"}
        />
      ) : (
        <input
          value={current[locale] ?? ""}
          onChange={(e) => onChange({ ...current, [locale]: e.target.value })}
          className={inputCls}
          placeholder={locale === "pt" ? "Português" : "English"}
        />
      )}
      {field.hint && <p className="mt-1 text-[11px] text-muted-foreground/80">{field.hint}</p>}
    </div>
  );
}

/* ---------- image / video picker ---------- */

function MediaField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const isImage = field.type === "image";

  return (
    <div>
      <label className={labelCls}>{field.label}</label>
      <div className="flex items-start gap-3">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          {value ? (
            isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            ) : (
              <video src={value} className="h-full w-full object-cover" muted />
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageIcon className="h-5 w-5" />
            </div>
          )}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white hover:bg-black"
              title="Remove"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={isImage ? "/uploads/… or https://…" : "MP4 URL or YouTube link"}
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            Pick from library
          </button>
        </div>
      </div>
      {field.hint && <p className="mt-1 text-[11px] text-muted-foreground/80">{field.hint}</p>}
      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={onChange}
        accept={isImage ? "image" : "video"}
      />
    </div>
  );
}

/* ---------- repeater (list of nested sub-forms) ---------- */

function RepeaterField({
  field,
  value,
  onChange,
  locale,
}: {
  field: FieldDef;
  value: unknown[] | undefined;
  onChange: (v: unknown[]) => void;
  locale: Locale;
}) {
  const items = Array.isArray(value) ? value : [];

  function update(i: number, next: Record<string, unknown>) {
    const copy = [...items];
    copy[i] = next;
    onChange(copy);
  }
  function add() {
    const empty: Record<string, unknown> = {};
    for (const f of field.itemFields ?? []) {
      if (f.defaultValue !== undefined) empty[f.key] = f.defaultValue;
      else if (f.type === "repeater") empty[f.key] = [];
      else if (f.type === "boolean") empty[f.key] = false;
      else if (f.localized) empty[f.key] = { pt: "", en: "" };
      else empty[f.key] = "";
    }
    onChange([...items, empty]);
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }

  return (
    <div className="rounded-lg border border-dashed border-border/70 bg-background/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {field.label}
        </label>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs text-primary hover:bg-primary/20"
        >
          <Plus className="h-3 w-3" />
          {field.itemLabel ? `Add ${field.itemLabel.toLowerCase()}` : "Add item"}
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-xs text-muted-foreground/70">No items yet.</p>
      )}

      <div className="space-y-3">
        {items.map((item, i) => {
          const itemObj = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
          return (
            <div key={i} className="rounded-md border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {field.itemLabel ?? "Item"} #{i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                    className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {(field.itemFields ?? []).map((sub) => (
                  <FieldInput
                    key={sub.key}
                    field={sub}
                    value={itemObj[sub.key]}
                    onChange={(v) => update(i, { ...itemObj, [sub.key]: v })}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
