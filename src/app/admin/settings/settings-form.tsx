"use client";

import { useState, useTransition } from "react";
import { Save, Loader2, Check, X, Plus, Trash2, ChevronUp, ChevronDown, Image as ImageIcon } from "lucide-react";
import type { SiteSettingsData, NavLink, FooterColumn } from "@/lib/content/site-settings";
import type { Locale, Localized } from "@/lib/blocks/types";
import { LOCALES } from "@/lib/blocks/types";
import { saveSiteSettings } from "./actions";
import { MediaPicker } from "../pages/[key]/media-picker";

const labelCls = "mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground";
const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

export function SettingsForm({ initial }: { initial: SiteSettingsData }) {
  const [data, setData] = useState<SiteSettingsData>(initial);
  const [locale, setLocale] = useState<Locale>("pt");
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function save() {
    setSaveState("idle");
    startTransition(async () => {
      try {
        await saveSiteSettings(data);
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2500);
      } catch {
        setSaveState("error");
      }
    });
  }

  return (
    <div>
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-40 -mx-6 mb-6 flex flex-wrap items-center gap-3 border-b border-border bg-background/95 px-6 py-3 backdrop-blur lg:-mx-10 lg:px-10">
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-card p-0.5">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={
                "rounded px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors " +
                (locale === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
              }
            >
              {l}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          Editing {locale === "pt" ? "Portuguese" : "English"} content
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
            onClick={save}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <Card title="Brand">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>Brand name</label>
              <input
                value={data.brand.name}
                onChange={(e) => setData((p) => ({ ...p, brand: { ...p.brand, name: e.target.value } }))}
                className={inputCls}
              />
            </div>
            <LocalizedField
              label="Tagline"
              value={data.brand.tagline}
              locale={locale}
              onChange={(v) => setData((p) => ({ ...p, brand: { ...p.brand, tagline: v } }))}
            />
            <MediaField
              label="Logo (dark — for light theme)"
              value={data.brand.logoDarkUrl}
              onChange={(v) => setData((p) => ({ ...p, brand: { ...p.brand, logoDarkUrl: v } }))}
            />
            <MediaField
              label="Logo (light — for dark theme)"
              value={data.brand.logoLightUrl}
              onChange={(v) => setData((p) => ({ ...p, brand: { ...p.brand, logoLightUrl: v } }))}
            />
          </div>
        </Card>

        <Card title="Header navigation">
          <p className="mb-4 text-xs text-muted-foreground">
            Links shown in the main site header (left to right).
          </p>
          <LinkList
            links={data.nav}
            locale={locale}
            onChange={(next) => setData((p) => ({ ...p, nav: next }))}
            addLabel="Add link"
          />
        </Card>

        <Card title="Footer columns">
          <p className="mb-4 text-xs text-muted-foreground">
            Add as many columns of links as you like. If empty, the footer falls back to the default columns.
          </p>
          {data.footer.columns.map((col, ci) => (
            <div key={col.id} className="mb-4 rounded-md border border-border bg-background p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <LocalizedField
                    label={`Column #${ci + 1} heading`}
                    value={col.heading}
                    locale={locale}
                    onChange={(v) =>
                      setData((p) => ({
                        ...p,
                        footer: {
                          ...p.footer,
                          columns: p.footer.columns.map((c, i) => (i === ci ? { ...c, heading: v } : c)),
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-1">
                  <IconBtn
                    title="Move up"
                    disabled={ci === 0}
                    onClick={() =>
                      setData((p) => {
                        const next = [...p.footer.columns];
                        [next[ci - 1], next[ci]] = [next[ci], next[ci - 1]];
                        return { ...p, footer: { ...p.footer, columns: next } };
                      })
                    }
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </IconBtn>
                  <IconBtn
                    title="Move down"
                    disabled={ci === data.footer.columns.length - 1}
                    onClick={() =>
                      setData((p) => {
                        const next = [...p.footer.columns];
                        [next[ci + 1], next[ci]] = [next[ci], next[ci + 1]];
                        return { ...p, footer: { ...p.footer, columns: next } };
                      })
                    }
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </IconBtn>
                  <IconBtn
                    title="Delete column"
                    variant="danger"
                    onClick={() =>
                      setData((p) => ({
                        ...p,
                        footer: { ...p.footer, columns: p.footer.columns.filter((_, i) => i !== ci) },
                      }))
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconBtn>
                </div>
              </div>
              <LinkList
                links={col.links}
                locale={locale}
                onChange={(next) =>
                  setData((p) => ({
                    ...p,
                    footer: {
                      ...p.footer,
                      columns: p.footer.columns.map((c, i) => (i === ci ? { ...c, links: next } : c)),
                    },
                  }))
                }
                addLabel="Add link"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setData((p) => ({
                ...p,
                footer: {
                  ...p.footer,
                  columns: [
                    ...p.footer.columns,
                    { id: uid(), heading: { pt: "", en: "" }, links: [] } as FooterColumn,
                  ],
                },
              }))
            }
            className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-3 py-2 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add column
          </button>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <LocalizedField
              label="Footer tagline"
              value={data.footer.tagline}
              locale={locale}
              multiline
              onChange={(v) => setData((p) => ({ ...p, footer: { ...p.footer, tagline: v } }))}
            />
            <LocalizedField
              label="Copyright line"
              value={data.footer.copyright}
              locale={locale}
              onChange={(v) => setData((p) => ({ ...p, footer: { ...p.footer, copyright: v } }))}
            />
          </div>
        </Card>

        <Card title="Social">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(["instagram", "facebook", "youtube", "linkedin", "pinterest", "tiktok"] as const).map((k) => (
              <div key={k}>
                <label className={labelCls}>{k.charAt(0).toUpperCase() + k.slice(1)} URL</label>
                <input
                  value={data.social[k]}
                  onChange={(e) => setData((p) => ({ ...p, social: { ...p.social, [k]: e.target.value } }))}
                  placeholder={`https://www.${k}.com/…`}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Contact">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>Email</label>
              <input
                value={data.contact.email}
                onChange={(e) => setData((p) => ({ ...p, contact: { ...p.contact, email: e.target.value } }))}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input
                value={data.contact.phone}
                onChange={(e) => setData((p) => ({ ...p, contact: { ...p.contact, phone: e.target.value } }))}
                className={inputCls}
              />
            </div>
            <LocalizedField
              label="Address"
              value={data.contact.address}
              locale={locale}
              multiline
              onChange={(v) => setData((p) => ({ ...p, contact: { ...p.contact, address: v } }))}
            />
            <LocalizedField
              label="Opening hours"
              value={data.contact.hours}
              locale={locale}
              multiline
              onChange={(v) => setData((p) => ({ ...p, contact: { ...p.contact, hours: v } }))}
            />
          </div>
        </Card>

        <Card title="Brand video">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>Video URL</label>
              <input
                value={data.brandVideo.url}
                onChange={(e) => setData((p) => ({ ...p, brandVideo: { ...p.brandVideo, url: e.target.value } }))}
                placeholder="YouTube URL or .mp4"
                className={inputCls}
              />
            </div>
            <LocalizedField
              label="Title"
              value={data.brandVideo.title}
              locale={locale}
              onChange={(v) => setData((p) => ({ ...p, brandVideo: { ...p.brandVideo, title: v } }))}
            />
            <MediaField
              label="Poster image"
              value={data.brandVideo.poster}
              onChange={(v) => setData((p) => ({ ...p, brandVideo: { ...p.brandVideo, poster: v } }))}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 font-serif text-lg text-foreground">{title}</h2>
      {children}
    </section>
  );
}

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

function LocalizedField({
  label,
  value,
  locale,
  onChange,
  multiline,
}: {
  label: string;
  value: Localized;
  locale: Locale;
  onChange: (v: Localized) => void;
  multiline?: boolean;
}) {
  const v = value ?? {};
  return (
    <div>
      <label className={labelCls}>
        {label} <span className="ml-1 rounded bg-primary/15 px-1 py-0.5 text-[8px] text-primary">{locale.toUpperCase()}</span>
      </label>
      {multiline ? (
        <textarea
          rows={2}
          value={v[locale] ?? ""}
          onChange={(e) => onChange({ ...v, [locale]: e.target.value })}
          className={inputCls}
        />
      ) : (
        <input
          value={v[locale] ?? ""}
          onChange={(e) => onChange({ ...v, [locale]: e.target.value })}
          className={inputCls}
        />
      )}
    </div>
  );
}

function MediaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex items-start gap-3">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
          >
            <ImageIcon className="h-3.5 w-3.5" /> Pick from library
          </button>
        </div>
      </div>
      <MediaPicker open={open} onClose={() => setOpen(false)} onPick={(u) => onChange(u)} accept="image" />
    </div>
  );
}

function LinkList({
  links,
  locale,
  onChange,
  addLabel,
}: {
  links: NavLink[];
  locale: Locale;
  onChange: (next: NavLink[]) => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={link.id} className="flex flex-wrap items-end gap-2 rounded-md border border-border bg-card p-3">
          <div className="min-w-[180px] flex-1">
            <LocalizedField
              label="Label"
              value={link.label}
              locale={locale}
              onChange={(v) => onChange(links.map((l, idx) => (idx === i ? { ...l, label: v } : l)))}
            />
          </div>
          <div className="min-w-[200px] flex-1">
            <label className={labelCls}>Link</label>
            <input
              value={link.href}
              onChange={(e) => onChange(links.map((l, idx) => (idx === i ? { ...l, href: e.target.value } : l)))}
              placeholder="/our-story or https://…"
              className={inputCls}
            />
          </div>
          <div className="flex items-center gap-1 self-end pb-1">
            <IconBtn
              title="Move up"
              disabled={i === 0}
              onClick={() => {
                const next = [...links];
                [next[i - 1], next[i]] = [next[i], next[i - 1]];
                onChange(next);
              }}
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </IconBtn>
            <IconBtn
              title="Move down"
              disabled={i === links.length - 1}
              onClick={() => {
                const next = [...links];
                [next[i + 1], next[i]] = [next[i], next[i + 1]];
                onChange(next);
              }}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </IconBtn>
            <IconBtn
              title="Delete"
              variant="danger"
              onClick={() => onChange(links.filter((_, idx) => idx !== i))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </IconBtn>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...links,
            { id: uid(), label: { pt: "", en: "" }, href: "" } as NavLink,
          ])
        }
        className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </div>
  );
}
