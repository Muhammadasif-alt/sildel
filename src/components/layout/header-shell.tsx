"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

type NavItem = { label: string; href: string };

/**
 * Site header — single-row layout, always solid (founder direction,
 * June 2026, thirteenth pass: kill the transparent-on-home variant).
 *
 * The previous design floated the header transparently over the home
 * hero so the cinematic image could bleed all the way to the viewport
 * edge. Two issues kept recurring with that:
 *   - Light-toned hero slides made the white nav text disappear.
 *   - Navigating from another route to "/" reset scroll to 0 mid-frame,
 *     so the header rendered as transparent over whichever cream-toned
 *     image happened to be loading.
 *
 * Every patch (darkening scrim, dark section background fallback, etc.)
 * traded surprise legibility failures for ongoing maintenance cost.
 * The simpler, more luxury-correct decision is: header is always a
 * solid warm-paper bar with dark glyph + dark nav, on every route. The
 * home hero still fills the viewport beneath it — the bar is just
 * always present rather than ghosted.
 */
export function HeaderShell({
  navItems,
  logoDark,
  accountLabel,
  homeLabel,
}: {
  navItems: readonly NavItem[];
  /** Dark/full-colour logo glyph — used in every state now. */
  logoDark: string;
  /** Kept in the server wrapper's props but no longer wired here, since
   *  the always-solid header never renders the light variant. Removed
   *  from this signature so TypeScript stops asking what to do with it. */
  accountLabel: string;
  homeLabel: string;
}) {
  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-colors duration-300 ease-out"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex h-20 items-center md:h-24">
          {/* Logo — flush left on every viewport (founder direction
              June 2026: Quinta Nova reference — logo left, menu right). */}
          <Link
            href="/"
            className="group flex shrink-0 items-center"
            aria-label={`${siteConfig.name} ${homeLabel}`}
          >
            <Image
              src={logoDark}
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
                className="text-[13px] font-medium uppercase tracking-[0.28em] text-foreground/85 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right controls — language picker + account icon on desktop,
              hamburger on mobile (founder direction, June 2026 — Quinta
              Nova pattern: logo opposite menu). */}
          <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-5">
            <LanguageToggle className="hidden md:flex" />
            <Link
              href="/account"
              aria-label={accountLabel}
              className="hidden h-10 w-10 items-center justify-center text-foreground/80 transition-colors hover:text-foreground md:inline-flex"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </Link>
            {/* Mobile hamburger — right side, mirrors Quinta Nova. */}
            <div className="md:hidden">
              <MobileNav transparent={false} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}