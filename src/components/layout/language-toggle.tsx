"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config";
import { readLocale, writeLocale } from "@/lib/i18n/use-locale";
import { cn } from "@/lib/utils";

/**
 * Language picker — flag + full language name (matches sildel.pt).
 *
 * Renders a tiny inline SVG flag (no external CDN, no whitelisting in
 * next.config) next to the language name. Click opens a small dropdown
 * with both options; selecting one writes the locale cookie and refreshes
 * server components so the navbar + page copy switch in place.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const router = useRouter();
  const [active, setActive] = useState<Locale>("pt");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(readLocale());
  }, []);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(locale: Locale) {
    setOpen(false);
    if (locale === active) return;
    setActive(locale);
    writeLocale(locale);
    router.refresh();
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      data-language-toggle
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="inline-flex items-center gap-2 px-2 py-1.5 text-[13px] font-medium tracking-[0.18em] text-foreground/85 hover:text-foreground transition-colors"
      >
        <Flag locale={active} />
        <span>{LOCALE_LABELS[active]}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={1.6}
        />
      </button>

      {/* Dropdown */}
      <ul
        role="listbox"
        aria-label="Language"
        className={cn(
          "absolute right-0 mt-2 min-w-[160px] origin-top-right rounded-sm",
          "border border-border bg-popover text-popover-foreground shadow-xl",
          "transition-all duration-150 ease-out z-50",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none",
        )}
      >
        {LOCALES.map((locale) => {
          const selected = locale === active;
          return (
            <li key={locale}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => pick(locale)}
                className={cn(
                  "w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-left transition-colors",
                  selected
                    ? "bg-muted/60 text-foreground"
                    : "hover:bg-muted/40 text-foreground/85",
                )}
              >
                <Flag locale={locale} />
                <span className="flex-1">{LOCALE_LABELS[locale]}</span>
                {selected && (
                  <Check
                    className="h-3.5 w-3.5 text-foreground/70"
                    strokeWidth={2}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─────────── Inline flag SVGs ─────────── */

function Flag({ locale }: { locale: Locale }) {
  if (locale === "en") return <FlagUS />;
  return <FlagPT />;
}

function FlagUS() {
  return (
    <svg
      viewBox="0 0 60 30"
      className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-border/60"
      aria-hidden
    >
      {/* Field of 13 stripes (red + white). */}
      <rect width="60" height="30" fill="#b22234" />
      {[1, 3, 5, 7, 9, 11].map((i) => (
        <rect
          key={i}
          y={(i * 30) / 13}
          width="60"
          height={30 / 13}
          fill="#fff"
        />
      ))}
      {/* Blue canton (no stars — at this scale they would render as noise). */}
      <rect width="24" height={(30 * 7) / 13} fill="#3c3b6e" />
    </svg>
  );
}

function FlagPT() {
  return (
    <svg
      viewBox="0 0 60 40"
      className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-border/60"
      aria-hidden
    >
      <rect width="60" height="40" fill="#046a38" />
      <rect width="24" height="40" fill="#da291c" />
      {/* Tiny yellow armillary disk at the green/red join. */}
      <circle cx="24" cy="20" r="5" fill="#fcdc04" stroke="#000" strokeWidth="0.4" />
    </svg>
  );
}