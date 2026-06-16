"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

type NavItem = { label: string; href: string };

/**
 * Site header — single-row layout (founder direction, June 2026, seventh
 * pass). Logo flush left, nav inline in the centre, language + account on
 * the far right. Replaces the earlier two-row Quinta-style "logo on top,
 * nav beneath" because the centred-floating logo read as cramped and the
 * two-row chrome ate vertical space on every page.
 *
 *  - Transparent over the home hero (page is "/", scrollY < 60) — the
 *    dark hero image carries through and the header floats above it with
 *    white logo + nav. After 60px of scroll, the header gains a soft
 *    paper background so the rest of the page stays readable.
 *  - On every other route, the header is always solid (dark glyph on
 *    warm paper) because there's no full-bleed dark hero behind it.
 *  - Fixed positioning so the home hero reaches all the way up to the
 *    viewport edge. Non-home pages compensate with top padding in the
 *    root layout.
 */
export function HeaderShell({
  navItems,
  logoDark,
  logoLight,
  accountLabel,
  homeLabel,
}: {
  navItems: readonly NavItem[];
  logoDark: string;
  logoLight: string;
  accountLabel: string;
  homeLabel: string;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;
  const logo = transparent ? logoLight : logoDark;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-out",
        transparent
          ? "bg-transparent"
          : "border-b border-border/60 bg-background/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex h-20 items-center md:h-24">
          {/* Mobile hamburger on the left */}
          <div className="mr-3 md:hidden">
            <MobileNav transparent={transparent} />
          </div>

          {/* Logo — flush left, bigger glyph (founder direction). */}
          <Link
            href="/"
            className="group flex shrink-0 items-center"
            aria-label={`${siteConfig.name} ${homeLabel}`}
          >
            <Image
              src={logo}
              alt={`${siteConfig.name} — ${siteConfig.tagline}`}
              width={197}
              height={200}
              priority
              fetchPriority="high"
              quality={82}
              className="h-14 w-auto transition-opacity group-hover:opacity-75 md:h-16 lg:h-[68px]"
            />
          </Link>

          {/* Nav — inline, centred between logo and right controls.
              Slightly bolder type (font-medium) and a touch larger so it
              reads as the primary wayfinding, not a label row. */}
          <nav
            className="hidden flex-1 items-center justify-center gap-9 px-8 md:flex lg:gap-12"
            aria-label="Main"
          >
            {navItems.map((item, i) => (
              <Link
                key={`${item.href}-${i}`}
                href={item.href}
                className={cn(
                  "text-[13px] font-medium uppercase tracking-[0.28em] transition-colors",
                  transparent
                    ? "text-white/90 hover:text-white"
                    : "text-foreground/85 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right controls — language picker + account icon. */}
          <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-5">
            <LanguageToggle
              className={cn(
                "hidden md:flex",
                transparent && "text-white",
              )}
            />
            <Link
              href="/account"
              aria-label={accountLabel}
              className={cn(
                "hidden h-10 w-10 items-center justify-center transition-colors md:inline-flex",
                transparent
                  ? "text-white/90 hover:text-white"
                  : "text-foreground/80 hover:text-foreground",
              )}
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </Link>
            {/* Mobile-only filler — keeps mobile right edge balanced */}
            <div className="w-10 md:hidden" aria-hidden />
          </div>
        </div>
      </div>
    </header>
  );
}