"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { readLocale } from "@/lib/i18n/use-locale";
import { getUi } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<Locale>("pt");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLocale(readLocale());
  }, [open]);

  const ui = getUi(locale);
  const navItems = [
    { label: ui.nav.ourStory, href: "/our-story" },
    { label: ui.nav.authenticCork, href: "/authentic-cork" },
    { label: ui.nav.youThinkCork, href: "/you-think-cork" },
    { label: ui.nav.treasures, href: "/treasures" },
    { label: ui.nav.blog, href: "/blog" },
    { label: ui.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // The panel needs to escape SiteHeader's stacking context
  // (the header uses `backdrop-blur` which becomes the containing block for
  // fixed descendants). Portal to document.body so `fixed inset-0` covers
  // the full viewport.
  const overlay = (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[200] bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Panel — full-viewport, solid background */}
      <aside
        className={cn(
          "fixed inset-0 z-[210] flex flex-col bg-background transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-border bg-background px-6 py-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="inline-flex items-center"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/brand/sildel-logo-dark-trim.webp"
              alt={siteConfig.name}
              width={197}
              height={200}
              priority
              quality={95}
              className="h-10 w-auto dark:hidden"
            />
            <Image
              src="/brand/sildel-logo-light-trim.webp"
              alt={siteConfig.name}
              width={197}
              height={200}
              priority
              quality={95}
              className="hidden h-10 w-auto dark:block"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav
          className="flex-1 min-h-0 overflow-y-auto bg-background px-6 py-8"
          aria-label="Primary"
        >
          <p className="mb-6 text-[10px] tracking-[0.4em] uppercase text-primary">
            {locale === "pt" ? "Navegar" : "Browse"}
          </p>
          <ul className="space-y-0">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className="border-b border-border/40 last:border-b-0"
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-4 py-5 font-serif text-2xl text-foreground hover:text-primary transition-colors"
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden
                    className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/treasures"
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary text-primary-foreground px-6 py-4 text-xs tracking-[0.35em] uppercase font-medium hover:bg-primary/90 transition-colors"
          >
            {ui.common.shopTreasures}
          </Link>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-border bg-background px-6 py-6 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          {siteConfig.contact.email && (
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {siteConfig.contact.email}
            </a>
          )}
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex h-10 w-10 items-center justify-center text-foreground hover:text-primary transition-colors"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}