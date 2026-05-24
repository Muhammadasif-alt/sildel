import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getUi } from "@/lib/i18n/ui";
import { getSiteSettings } from "@/lib/content/site-settings";
import { pickLocalized } from "@/lib/blocks/types";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { CartButton } from "./cart-button";

export async function SiteHeader() {
  const locale = await getLocale();
  const ui = getUi(locale);
  const settings = await getSiteSettings();

  const navItems = settings.nav.length
    ? settings.nav.map((n) => ({
        label: pickLocalized(n.label, locale),
        href: n.href || "#",
      }))
    : [
        { label: ui.nav.ourStory, href: "/our-story" },
        { label: ui.nav.authenticCork, href: "/authentic-cork" },
        { label: ui.nav.youThinkCork, href: "/you-think-cork" },
        { label: ui.nav.treasures, href: "/treasures" },
      ];

  const logoUrl = settings.brand.logoDarkUrl || "/images/og/sildel-logo-dark.png";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${siteConfig.name} ${ui.nav.home}`}
        >
          <Image
            src={logoUrl}
            alt={`${siteConfig.name} — ${siteConfig.tagline}`}
            width={160}
            height={64}
            priority
            className="h-8 w-auto md:h-10 transition-opacity group-hover:opacity-80 dark:invert"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {navItems.map((item, i) => (
            <Link
              key={`${item.href}-${i}`}
              href={item.href}
              className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-5">
          <LanguageToggle className="hidden md:flex" />

          <div className="hidden md:block h-5 w-px bg-border" aria-hidden />

          <ThemeToggle />

          <Link
            href="/account"
            aria-label={ui.header.account}
            className="hidden md:inline-flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <User className="h-4 w-4" />
          </Link>

          <CartButton />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}