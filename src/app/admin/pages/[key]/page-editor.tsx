"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Save,
  Loader2,
  Check,
  X,
  ExternalLink,
  Monitor,
  RefreshCw,
} from "lucide-react";
import type { Block, BlockTypeDef, Locale, StoredPage } from "@/lib/blocks/types";
import { LOCALES } from "@/lib/blocks/types";
import { defaultContentFor, findBlockType } from "@/lib/blocks/registry";
import { savePageBlocks } from "../actions";
import { FieldInput } from "./field-input";

type Props = {
  pageKey: string;
  publicPath: string;
  initialBlocks: Block[];
  initialSeo: NonNullable<StoredPage["seo"]>;
  blockTypes: BlockTypeDef[];
};

export function PageEditor({ pageKey, publicPath, initialBlocks, initialSeo, blockTypes }: Props) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [seo, setSeo] = useState(initialSeo);
  const [locale, setLocale] = useState<Locale>("pt");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerIdx, setPickerIdx] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();
  const [previewOpen, setPreviewOpen] = useState(true);
  const [previewVersion, setPreviewVersion] = useState(0);
  const previewRef = useRef<HTMLIFrameElement>(null);

  function refreshPreview() {
    setPreviewVersion((v) => v + 1);
  }

  function toggleOpen(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addBlock(type: string, atIndex?: number) {
    const insertAt = atIndex ?? blocks.length;
    const id = crypto.randomUUID();
    const newBlock: Block = {
      id,
      type,
      order: insertAt,
      hidden: false,
      content: defaultContentFor(type),
    };
    const next = [...blocks];
    next.splice(insertAt, 0, newBlock);
    setBlocks(next.map((b, i) => ({ ...b, order: i })));
    setOpenIds((prev) => new Set(prev).add(id));
    setPickerOpen(false);
    setPickerIdx(null);
  }

  function updateBlock(id: string, next: Partial<Block>) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...next } : b)));
  }
  function updateContent(id: string, key: string, value: unknown) {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, content: { ...b.content, [key]: value } } : b
      )
    );
  }
  function removeBlock(id: string) {
    if (!confirm("Delete this block?")) return;
    setBlocks((prev) => prev.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i })));
  }
  function duplicateBlock(id: string) {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      const src = prev[idx];
      const copy: Block = {
        ...src,
        id: crypto.randomUUID(),
        content: JSON.parse(JSON.stringify(src.content ?? {})),
      };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next.map((b, i) => ({ ...b, order: i }));
    });
  }
  function moveBlock(id: string, dir: -1 | 1) {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      const j = idx + dir;
      if (idx === -1 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[j]] = [next[j], next[idx]];
      return next.map((b, i) => ({ ...b, order: i }));
    });
  }
  function toggleHidden(id: string) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, hidden: !b.hidden } : b)));
  }

  function save() {
    setSaveState("idle");
    startTransition(async () => {
      try {
        await savePageBlocks(pageKey, { blocks, seo });
        setSaveState("saved");
        // Auto-refresh the live-preview iframe so changes show immediately.
        refreshPreview();
        setTimeout(() => setSaveState("idle"), 2500);
      } catch {
        setSaveState("error");
      }
    });
  }

  return (
    <div>
      {/* Sticky toolbar — sits below the admin topbar (h-20) */}
      <div className="sticky top-20 z-20 -mx-6 mb-6 flex flex-wrap items-center gap-3 border-b border-border bg-background/95 px-6 py-3 backdrop-blur lg:-mx-10 lg:px-10">
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-card p-0.5">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={
                "rounded px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors " +
                (locale === l
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {l}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          Editing {locale === "pt" ? "Portuguese" : "English"} content · {blocks.length} block{blocks.length === 1 ? "" : "s"}
        </span>

        <div className="ml-auto flex items-center gap-2">
          {saveState === "saved" && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          )}
          {saveState === "error" && (
            <span className="inline-flex items-center gap-1 text-xs text-destructive">
              <X className="h-3.5 w-3.5" /> Save failed
            </span>
          )}
          <button
            type="button"
            onClick={() => setPreviewOpen((v) => !v)}
            title={previewOpen ? "Hide live preview" : "Show live preview"}
            className={
              "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium uppercase tracking-wider transition-colors " +
              (previewOpen
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground")
            }
          >
            <Monitor className="h-3.5 w-3.5" />
            {previewOpen ? "Hide preview" : "Show preview"}
          </button>
          <a
            href={publicPath}
            target="_blank"
            rel="noopener noreferrer"
            title="Open the live page in a new tab"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Open in tab</span>
          </a>
          <button
            type="button"
            onClick={save}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      {/* Two-column layout: editor on the left, live-site preview on the right.
          The preview iframe loads the public page and refreshes after every save. */}
      <div
        className={
          previewOpen
            ? "grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            : ""
        }
      >
        <div className="min-w-0">

      {/* SEO block */}
      <section className="mb-6 rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 font-serif text-base text-foreground">SEO & Meta</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              SEO Title ({locale.toUpperCase()})
            </label>
            <input
              value={(seo.title as Record<string, string> | undefined)?.[locale] ?? ""}
              onChange={(e) =>
                setSeo((p) => ({
                  ...p,
                  title: { ...(p.title ?? {}), [locale]: e.target.value },
                }))
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Meta description ({locale.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={(seo.description as Record<string, string> | undefined)?.[locale] ?? ""}
              onChange={(e) =>
                setSeo((p) => ({
                  ...p,
                  description: { ...(p.description ?? {}), [locale]: e.target.value },
                }))
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60"
            />
          </div>
        </div>
      </section>

      {/* Blocks */}
      <div className="space-y-3">
        {blocks.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center text-sm text-muted-foreground">
            No sections yet. Click <b>Add section</b> below to build this page.
          </div>
        )}

        {blocks.map((block, i) => {
          const def = findBlockType(block.type);
          const isOpen = openIds.has(block.id);
          return (
            <div key={block.id}>
              {/* Insert-here button (visible between blocks) */}
              {i === 0 && (
                <InsertButton
                  onClick={() => {
                    setPickerIdx(0);
                    setPickerOpen(true);
                  }}
                />
              )}

              <article
                className={
                  "rounded-xl border bg-card transition-colors " +
                  (block.hidden ? "border-border/50 opacity-60" : "border-border")
                }
              >
                <header className="flex items-center gap-2 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggleOpen(block.id)}
                    className="flex flex-1 items-center gap-2 text-left"
                  >
                    <ChevronRight
                      className={
                        "h-4 w-4 text-muted-foreground transition-transform " +
                        (isOpen ? "rotate-90" : "")
                      }
                    />
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                      {def?.label ?? block.type}
                    </span>
                    <span className="truncate text-sm text-foreground">
                      {blockSummary(block, locale)}
                    </span>
                  </button>

                  <div className="flex items-center gap-1">
                    <IconBtn title="Move up" onClick={() => moveBlock(block.id, -1)} disabled={i === 0}>
                      <ChevronUp className="h-3.5 w-3.5" />
                    </IconBtn>
                    <IconBtn title="Move down" onClick={() => moveBlock(block.id, 1)} disabled={i === blocks.length - 1}>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </IconBtn>
                    <IconBtn title={block.hidden ? "Show on site" : "Hide on site"} onClick={() => toggleHidden(block.id)}>
                      {block.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </IconBtn>
                    <IconBtn title="Duplicate" onClick={() => duplicateBlock(block.id)}>
                      <Copy className="h-3.5 w-3.5" />
                    </IconBtn>
                    <IconBtn title="Delete" onClick={() => removeBlock(block.id)} variant="danger">
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconBtn>
                  </div>
                </header>

                {isOpen && def && (
                  <div className="border-t border-border px-5 py-5">
                    <p className="mb-4 text-xs text-muted-foreground">{def.description}</p>
                    <div className="space-y-5">
                      {def.fields.map((f) => (
                        <FieldInput
                          key={f.key}
                          field={f}
                          value={block.content?.[f.key]}
                          onChange={(v) => updateContent(block.id, f.key, v)}
                          locale={locale}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {isOpen && !def && (
                  <div className="border-t border-border px-5 py-5 text-sm text-destructive">
                    Unknown block type: <code>{block.type}</code>. Remove it or restore the type definition.
                  </div>
                )}
              </article>

              {/* Insert-here button after each block */}
              <InsertButton
                onClick={() => {
                  setPickerIdx(i + 1);
                  setPickerOpen(true);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Big add-at-bottom button when there are no blocks (otherwise inline insert handles it) */}
      {blocks.length === 0 && (
        <button
          type="button"
          onClick={() => {
            setPickerIdx(0);
            setPickerOpen(true);
          }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card/40 px-6 py-6 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5"
        >
          <Plus className="h-4 w-4" /> Add your first section
        </button>
      )}

      {/* Block picker modal */}
      {pickerOpen && (
        <BlockPicker
          pageKey={pageKey}
          blockTypes={blockTypes}
          onPick={(t) => addBlock(t, pickerIdx ?? blocks.length)}
          onClose={() => {
            setPickerOpen(false);
            setPickerIdx(null);
          }}
        />
      )}
        </div>

        {/* Live preview pane — visible only when preview is on. Sticky so it
            stays in view while scrolling the editor on the left. */}
        {previewOpen && (
          <aside className="min-w-0">
            <div className="sticky top-36 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Live preview
                  </span>
                  <code className="text-xs text-foreground">{publicPath}</code>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={refreshPreview}
                    title="Reload preview"
                    className="inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                  <a
                    href={publicPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    className="inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <iframe
                key={previewVersion}
                ref={previewRef}
                src={`${publicPath}?previewLocale=${locale}`}
                className="block h-[calc(100vh-220px)] w-full bg-background"
                title="Live preview"
              />
              <p className="border-t border-border bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
                Save changes to refresh the preview, or click ⟳ to reload manually.
              </p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

/* ---------- small bits ---------- */

function IconBtn({
  children,
  onClick,
  title,
  disabled,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  variant?: "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={
        "rounded p-1.5 transition-colors disabled:opacity-30 " +
        (variant === "danger"
          ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          : "text-muted-foreground hover:bg-accent hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

function InsertButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="group relative h-3">
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
      >
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-primary/40" />
        <span className="relative inline-flex items-center gap-1 rounded-full bg-primary px-3 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground shadow-sm">
          <Plus className="h-2.5 w-2.5" /> Add section
        </span>
      </button>
    </div>
  );
}

/** Map page keys → block type namespace prefixes shown FIRST in the picker. */
const PAGE_NAMESPACE: Record<string, string> = {
  home: "home.",
  "our-story": "ourStory.",
  "authentic-cork": "authenticCork.",
  "you-think-cork": "youThinkCork.",
  treasures: "treasures.",
  blog: "blog.",
  contact: "contact.",
};

/** Generic block types — available on every page in a second tab. */
const GENERIC_TYPES = new Set([
  "hero",
  "pageHeader",
  "imageText",
  "richText",
  "stats",
  "gallery",
  "faq",
  "testimonials",
  "videoEmbed",
  "ctaBanner",
  "processSteps",
  "productShowcase",
  "spacer",
  "customHtml",
]);

function BlockPicker({
  pageKey,
  blockTypes,
  onPick,
  onClose,
}: {
  pageKey: string;
  blockTypes: BlockTypeDef[];
  onPick: (type: string) => void;
  onClose: () => void;
}) {
  const namespace = PAGE_NAMESPACE[pageKey];
  const pageSpecific = namespace
    ? blockTypes.filter((b) => b.type.startsWith(namespace))
    : [];
  const generic = blockTypes.filter((b) => GENERIC_TYPES.has(b.type));

  const [tab, setTab] = useState<"page" | "generic">(
    pageSpecific.length > 0 ? "page" : "generic"
  );
  const [q, setQ] = useState("");

  const source = tab === "page" ? pageSpecific : generic;
  const filtered = q
    ? source.filter(
        (b) =>
          b.label.toLowerCase().includes(q.toLowerCase()) ||
          b.description.toLowerCase().includes(q.toLowerCase())
      )
    : source;

  const pageLabel = pageKey
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Portal to <body> so the picker escapes the editor toolbar's stacking
  // context (the toolbar uses `backdrop-blur` which creates its own stacking
  // context, otherwise the toolbar would render in front of the modal).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const overlay = (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-none border border-border bg-card text-card-foreground shadow-2xl">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="font-serif text-xl text-foreground">Add a section</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Pick a section type — edit, reorder, hide or delete it later.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Tabs + search */}
        <div className="flex flex-wrap items-center gap-3 border-b border-border bg-muted/30 px-6 py-3">
          <div className="flex items-center gap-1 rounded-md border border-border bg-card p-0.5">
            {pageSpecific.length > 0 && (
              <button
                type="button"
                onClick={() => setTab("page")}
                className={
                  "rounded px-3 py-1.5 text-xs font-medium transition-colors " +
                  (tab === "page"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {pageLabel} sections ({pageSpecific.length})
              </button>
            )}
            <button
              type="button"
              onClick={() => setTab("generic")}
              className={
                "rounded px-3 py-1.5 text-xs font-medium transition-colors " +
                (tab === "generic"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              Generic blocks ({generic.length})
            </button>
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sections…"
            className="ml-auto w-64 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              {q ? `No sections match "${q}".` : "No sections available for this page."}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((b) => (
                <button
                  key={b.type}
                  type="button"
                  onClick={() => onPick(b.type)}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 text-left transition-colors hover:border-primary/50 hover:bg-accent/40"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Plus className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground">{b.label}</h3>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {b.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

/* ---------- block summary helper (for the collapsed row) ---------- */

function pickStr(value: unknown, locale: Locale): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    const own = v[locale];
    if (typeof own === "string" && own.trim()) return own;
    const other = locale === "pt" ? v.en : v.pt;
    if (typeof other === "string" && other.trim()) return other;
  }
  return "";
}

function blockSummary(block: Block, locale: Locale): string {
  const c = block.content ?? {};
  const candidates = ["heading", "title", "label", "question", "eyebrow"];
  for (const k of candidates) {
    const s = pickStr((c as Record<string, unknown>)[k], locale);
    if (s.trim()) return s.split("\n")[0];
  }
  return "(untitled section)";
}
