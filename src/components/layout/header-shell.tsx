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
 * Quinta do Crasto-inspired centred header.
 *
 *  - Logo centred at the top, nav row centred directly beneath — bigger
 *    type than before (founder direction, June 2026).
 *  - Transparent over the home hero (page is "/", scrollY < 80) — the
 *    dark hero image carries through and the header floats above it
 *    with white logo + nav. After 80px of scroll, the header gains a
 *    soft warm-paper background so the rest of the page stays readable.
 *  - On every other route, the header is always solid (dark glyph on
 *    warm paper) because there's no full-bleed dark hero behind it.
 *  - Fixed positioning so the hero on home reaches all the way up to
 *    the viewport edge and the header overlays its top band. Non-home
 *    pages compensate with top padding in the layout.
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
        {/* Top row — logo absolute-centered, language + account flush right.
            Mobile gets a left-aligned hamburger trigger via MobileNav. */}
        <div className="relative flex h-20 items-center justify-between md:h-24">
          {/* Mobile hamburger sits on the left so the logo can stay centred */}
          <div className="md:hidden">
            <MobileNav transparent={transparent} />
          </div>

          {/* Centered logo. On md+ it's absolutely positioned so it sits
              dead-centre regardless of right-side controls width. */}
          <Link
            href="/"
            className="group flex items-center md:absolute md:left-1/2 md:-translate-x-1/2"
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
              className="h-12 w-auto transition-opacity group-hover:opacity-75 md:h-14"
            />
          </Link>

          {/* Right side — language picker + account */}
          <div className="ml-auto flex items-center gap-3 md:gap-5">
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
                  ? "text-white/85 hover:text-white"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>
            {/* Mobile hamburger placeholder (mobile hamburger is actually on
                the LEFT — this kept layout balanced when no left-side icon
                existed). With the left-side hamburger in place, this slot
                stays empty on mobile.*/}
            <div className="w-10 md:hidden" aria-hidden />
          </div>
        </div>

        {/* Nav row — centred horizontal list. Bigger type per founder
            (June 2026 direction): from 11px / 0.32em to 13px / 0.28em
            with extra padding. Hidden on mobile (mobile uses hamburger). */}
        <nav
          className="hidden items-center justify-center gap-10 pb-6 md:flex lg:gap-14"
          aria-label="Main"
        >
          {navItems.map((item, i) => (
            <Link
              key={`${item.href}-${i}`}
              href={item.href}
              className={cn(
                "text-[13px] uppercase tracking-[0.3em] transition-colors",
                transparent
                  ? "text-white/85 hover:text-white"
                  : "text-foreground/75 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}