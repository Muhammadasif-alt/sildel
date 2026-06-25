"use client";

import { useState } from "react";
import { ImageIcon, X, Plus } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/db/product-category";
import { MediaPicker } from "@/app/admin/pages/[key]/media-picker";

type FormValues = {
  slug: string;
  name: string;
  tagline?: string;
  category: string;
  priceCents: number;
  badge?: string;
  material?: string;
  description: string;
  image: string;
  gallery?: string[];
  inStock?: boolean;
};

export function ProductForm({
  action,
  initial,
  submitLabel,
}: {
  action: (form: FormData) => void | Promise<void>;
  initial?: Partial<FormValues>;
  submitLabel: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string>(initial?.image ?? "");
  const [gallery, setGallery] = useState<string[]>(initial?.gallery ?? []);
  const [pickerFor, setPickerFor] = useState<null | "image" | "gallery">(null);

  const priceEuros = initial?.priceCents ? (initial.priceCents / 100).toFixed(2) : "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const form = new FormData(e.currentTarget);
      form.set("image", image);
      // Remove any existing gallery entries and append the fresh list.
      form.delete("gallery");
      for (const url of gallery) form.append("gallery", url);
      await action(form);
    } catch (err) {
      // Server actions throw a special NEXT_REDIRECT error on `redirect()`.
      // That's not a real failure — let it bubble so Next handles navigation.
      if (
        err &&
        typeof err === "object" &&
        "digest" in err &&
        typeof (err as { digest: unknown }).digest === "string" &&
        (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
      ) {
        throw err;
      }
      setError(err instanceof Error ? err.message : "Save failed");
      setSubmitting(false);
    }
  }

  function handlePicked(url: string) {
    if (pickerFor === "image") setImage(url);
    else if (pickerFor === "gallery") setGallery((prev) => [...prev, url]);
    setPickerFor(null);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-none border border-border bg-card p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Slug *" name="slug" defaultValue={initial?.slug} placeholder="shell" />
        <Field label="Name *" name="name" defaultValue={initial?.name} placeholder="Shell" />
        <Field label="Tagline" name="tagline" defaultValue={initial?.tagline} placeholder="A dance between nature and art" />
        <SelectField label="Category *" name="category" defaultValue={initial?.category} />
        <Field label="Price (EUR) *" name="priceEuros" type="number" step="0.01" defaultValue={priceEuros} placeholder="2875.00" />
        <Field label="Badge" name="badge" defaultValue={initial?.badge} placeholder="Unique & Exclusive" />
        <Field label="Material" name="material" defaultValue={initial?.material} placeholder="Authentic Cork and White Marble" />
      </div>

      {/* Main image */}
      <div>
        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Main image *
        </span>
        <div className="flex items-start gap-4 rounded-lg border border-border bg-background p-3">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <ImageIcon className="h-7 w-7" strokeWidth={1.4} />
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPickerFor("image")}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ImageIcon className="h-3.5 w-3.5" />
                {image ? "Replace image" : "Pick / upload image"}
              </button>
              {image && (
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" /> Remove
                </button>
              )}
            </div>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="or paste a URL or path"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <span className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span>Gallery (additional images)</span>
          <span className="text-[10px] normal-case tracking-normal text-muted-foreground/70">
            {gallery.length} image{gallery.length === 1 ? "" : "s"}
          </span>
        </span>
        <div className="rounded-lg border border-border bg-background p-3">
          {gallery.length > 0 && (
            <ul className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {gallery.map((url, i) => (
                <li key={`${url}-${i}`} className="group relative">
                  <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setGallery((prev) => prev.filter((_, j) => j !== i))
                    }
                    title="Remove"
                    className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setPickerFor("gallery")}
            className="inline-flex items-center gap-2 rounded-md border border-dashed border-border bg-card px-3 py-2 text-xs text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <Plus className="h-3.5 w-3.5" />
            Add gallery image
          </button>
        </div>
      </div>

      <TextArea label="Description *" name="description" defaultValue={initial?.description} />

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          name="inStock"
          defaultChecked={initial?.inStock ?? true}
          className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary/30"
        />
        In stock
      </label>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Saving…" : submitLabel}
      </button>

      <MediaPicker
        open={pickerFor !== null}
        onClose={() => setPickerFor(null)}
        onPick={handlePicked}
        accept="image"
      />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        name={name}
        step={step}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      >
        <option value="" disabled>
          Select a category
        </option>
        {PRODUCT_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <textarea
        name={name}
        rows={4}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}