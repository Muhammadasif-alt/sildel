"use client";

import { useState } from "react";
import { ImageIcon, Plus, Trash2, GripVertical, X } from "lucide-react";
import { MediaPicker } from "@/app/admin/pages/[key]/media-picker";

type Block =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string; author?: string }
  | { kind: "image"; src: string; alt: string; caption?: string };

const TAGS = ["Atelier", "Forest", "Craft", "Material", "Collectors"] as const;

export type BlogFormInitial = {
  slug?: string;
  title?: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  author?: string;
  authorRole?: string;
  date?: string;
  readMinutes?: number;
  tag?: string;
  featured?: boolean;
  published?: boolean;
  body?: Block[];
};

/** Where the media picker should write the URL on confirm. */
type PickerTarget =
  | { kind: "cover" }
  | { kind: "block"; index: number };

export function BlogForm({
  initial,
  action,
  submitLabel,
}: {
  initial?: BlogFormInitial;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  const [image, setImage] = useState<string>(initial?.image ?? "");
  const [blocks, setBlocks] = useState<Block[]>(
    initial?.body ?? [{ kind: "paragraph", text: "" }]
  );
  const [picker, setPicker] = useState<PickerTarget | null>(null);

  function update(i: number, patch: Partial<Block>) {
    setBlocks((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch } as Block;
      return next;
    });
  }
  function remove(i: number) {
    setBlocks((prev) => prev.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    setBlocks((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }
  function add(kind: Block["kind"]) {
    setBlocks((prev) => [
      ...prev,
      kind === "image"
        ? { kind: "image", src: "", alt: "" }
        : kind === "quote"
        ? { kind: "quote", text: "" }
        : { kind, text: "" },
    ]);
  }

  function handlePicked(url: string) {
    if (!picker) return;
    if (picker.kind === "cover") {
      setImage(url);
    } else {
      update(picker.index, { src: url });
    }
    setPicker(null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set("image", image);
    form.set("body", JSON.stringify(blocks));
    await action(form);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Meta */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Slug *" hint="URL part — lowercase, dashes only">
          <input
            name="slug"
            required
            defaultValue={initial?.slug ?? ""}
            placeholder="nine-year-rhythm"
            className={inputClass}
          />
        </Field>

        <Field label="Title *">
          <input
            name="title"
            required
            defaultValue={initial?.title ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Excerpt *" className="md:col-span-2">
          <textarea
            name="excerpt"
            required
            rows={3}
            defaultValue={initial?.excerpt ?? ""}
            className={inputClass}
          />
        </Field>

        {/* Cover image — visual picker */}
        <div className="md:col-span-2">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Cover image *
          </span>
          <div className="flex items-start gap-4 rounded-lg border border-border bg-background p-3">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
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
                  onClick={() => setPicker({ kind: "cover" })}
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

        <Field label="Image alt text" className="md:col-span-2">
          <input
            name="imageAlt"
            defaultValue={initial?.imageAlt ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Author *">
          <input
            name="author"
            required
            defaultValue={initial?.author ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Author role">
          <input
            name="authorRole"
            defaultValue={initial?.authorRole ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Date *">
          <input
            name="date"
            type="date"
            required
            defaultValue={initial?.date ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Read minutes">
          <input
            name="readMinutes"
            type="number"
            min={1}
            defaultValue={initial?.readMinutes ?? 5}
            className={inputClass}
          />
        </Field>

        <Field label="Tag *">
          <select
            name="tag"
            defaultValue={initial?.tag ?? "Atelier"}
            className={inputClass}
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <div className="flex items-center gap-6 md:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initial?.featured ?? false}
              className="h-4 w-4 rounded border-border accent-[var(--primary)]"
            />
            Featured (shown big on /blog)
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="published"
              defaultChecked={initial?.published ?? true}
              className="h-4 w-4 rounded border-border accent-[var(--primary)]"
            />
            Published
          </label>
        </div>
      </div>

      {/* Body blocks */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-foreground">Body</h2>
          <div className="flex gap-2">
            {(["paragraph", "heading", "quote", "image"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => add(k)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Plus className="h-3 w-3" strokeWidth={2} />
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {blocks.map((b, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <GripVertical className="h-3.5 w-3.5" />
                  {b.kind}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === blocks.length - 1}
                    className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {b.kind === "image" ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                      {b.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={b.src}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                        />
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
                          onClick={() => setPicker({ kind: "block", index: i })}
                          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <ImageIcon className="h-3.5 w-3.5" />
                          {b.src ? "Replace image" : "Pick / upload image"}
                        </button>
                        {b.src && (
                          <button
                            type="button"
                            onClick={() => update(i, { src: "" })}
                            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-3.5 w-3.5" /> Remove
                          </button>
                        )}
                      </div>
                      <input
                        placeholder="or paste a URL or path"
                        value={b.src}
                        onChange={(e) => update(i, { src: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <input
                    placeholder="Alt text"
                    value={b.alt}
                    onChange={(e) => update(i, { alt: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Caption (optional)"
                    value={b.caption ?? ""}
                    onChange={(e) => update(i, { caption: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ) : b.kind === "quote" ? (
                <div className="space-y-2">
                  <textarea
                    placeholder="Quote text"
                    rows={2}
                    value={b.text}
                    onChange={(e) => update(i, { text: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Attribution (optional)"
                    value={b.author ?? ""}
                    onChange={(e) => update(i, { author: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ) : (
                <textarea
                  placeholder={b.kind === "heading" ? "Heading text" : "Paragraph"}
                  rows={b.kind === "heading" ? 1 : 4}
                  value={b.text}
                  onChange={(e) => update(i, { text: e.target.value })}
                  className={inputClass}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          {submitLabel}
        </button>
      </div>

      <MediaPicker
        open={picker !== null}
        onClose={() => setPicker(null)}
        onPick={handlePicked}
        accept="image"
      />
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-muted-foreground/80">{hint}</p>}
    </div>
  );
}