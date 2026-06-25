"use client";

import { useState, useTransition } from "react";
import { ImageIcon, X, CheckCircle2, Loader2 } from "lucide-react";
import type { PageSchema } from "@/lib/content/pages";
import { MediaPicker } from "@/app/admin/pages/[key]/media-picker";
import { savePageContentAction } from "../actions";

type Values = Record<string /* sectionKey */, Record<string /* fieldKey */, string>>;

export function SimplePageEditor({
  pageKey,
  schema,
  initial,
}: {
  pageKey: string;
  schema: PageSchema;
  initial: Values;
}) {
  const [values, setValues] = useState<Values>(() => {
    const out: Values = {};
    for (const section of schema.sections) {
      out[section.key] = {};
      for (const field of section.fields) {
        out[section.key][field.key] = initial[section.key]?.[field.key] ?? "";
      }
    }
    return out;
  });
  const [pickerFor, setPickerFor] = useState<{ section: string; field: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function update(sectionKey: string, fieldKey: string, value: string) {
    setSaved(false);
    setValues((prev) => ({
      ...prev,
      [sectionKey]: { ...(prev[sectionKey] ?? {}), [fieldKey]: value },
    }));
  }

  function onSave() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        await savePageContentAction(pageKey, values);
        setSaved(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {schema.sections.map((section) => (
        <section
          key={section.key}
          className="rounded-xl border border-border bg-card p-5 sm:p-6"
        >
          <h2 className="mb-1 font-serif text-xl text-foreground">{section.label}</h2>
          <p className="mb-5 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {section.key}
          </p>

          <div className="space-y-5">
            {section.fields.map((field) => {
              const value = values[section.key]?.[field.key] ?? "";
              return (
                <div key={field.key}>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {field.label}
                  </label>
                  {field.type === "image" ? (
                    <ImageField
                      value={value}
                      onChange={(v) => update(section.key, field.key, v)}
                      onPick={() =>
                        setPickerFor({ section: section.key, field: field.key })
                      }
                    />
                  ) : field.type === "textarea" ? (
                    <textarea
                      rows={4}
                      value={value}
                      onChange={(e) =>
                        update(section.key, field.key, e.target.value)
                      }
                      className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        update(section.key, field.key, e.target.value)
                      }
                      className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                    />
                  )}
                  {field.hint && (
                    <p className="mt-1.5 text-xs text-muted-foreground">{field.hint}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Sticky save bar */}
      <div className="sticky bottom-4 z-30 mt-8 flex items-center justify-between gap-4 rounded-xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
        <div className="min-w-0 flex-1 text-sm">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : saved ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Saved — changes are live.
            </span>
          ) : (
            <span className="text-muted-foreground">Click Save to publish.</span>
          )}
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
          ) : (
            <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
          )}
          {pending ? "Saving…" : "Save changes"}
        </button>
      </div>

      <MediaPicker
        open={pickerFor !== null}
        onClose={() => setPickerFor(null)}
        onPick={(url) => {
          if (pickerFor) update(pickerFor.section, pickerFor.field, url);
          setPickerFor(null);
        }}
        accept="image"
      />
    </div>
  );
}

function ImageField({
  value,
  onChange,
  onPick,
}: {
  value: string;
  onChange: (v: string) => void;
  onPick: () => void;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-border bg-background p-3">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <ImageIcon className="h-6 w-6" strokeWidth={1.4} />
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onPick}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            {value ? "Replace image" : "Pick / upload image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or paste a URL / path"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}

// silence unused warnings for the auxiliary import
export const _next = Image;