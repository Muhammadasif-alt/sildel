"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { readLocale, writeLocale } from "@/lib/i18n/use-locale";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const router = useRouter();
  const [active, setActive] = useState<Locale>("pt");

  // Sync from cookie on mount (server already rendered with default).
  useEffect(() => {
    setActive(readLocale());
  }, []);

  function pick(locale: Locale) {
    if (locale === active) return;
    setActive(locale);
    writeLocale(locale);
    // Re-render server components with the new locale.
    router.refresh();
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs tracking-[0.2em]",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((locale, i) => (
        <div key={locale} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => pick(locale)}
            className={cn(
              "transition-colors px-1 py-0.5 uppercase",
              active === locale
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={active === locale}
          >
            {locale}
          </button>
          {i === 0 && <span className="text-muted-foreground/40">/</span>}
        </div>
      ))}
    </div>
  );
}
