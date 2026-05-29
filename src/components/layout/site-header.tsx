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
import { WhatsAppLink } from "./whatsapp-link";

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

  // Single tan theme → the black-glyph logo sits on the warm cork header,
  // exactly like the Instagram identity (black logo on camel). No themed
  // variant swap needed.
  const logo = settings.brand.logoDarkUrl || "/brand/sildel-logo-dark-trim.webp";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-[1600px] items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="group flex items-center"
          aria-label={`${siteConfig.name} ${ui.nav.home}`}
        >
          {/* Black-glyph logo on the warm cork header — the Instagram look. */}
          <Image
            src={logo}
            alt={`${siteConfig.name} — ${siteConfig.tagline}`}
            width={197}
            height={200}
            priority
            fetchPriority="high"
            quality={82}
            className="h-12 w-auto md:h-14 transition-opacity group-hover:opacity-75"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10 lg:gap-12" aria-label="Main">
          {navItems.map((item, i) => (
            <Link
              key={`${item.href}-${i}`}
              href={item.href}
              className="text-[11px] tracking-[0.32em] uppercase text-foreground/75 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <WhatsAppLink locale={locale} />

          <LanguageToggle className="hidden md:flex" />

          <Link
            href="/account"
            aria-label={ui.header.account}
            className="hidden md:inline-flex h-10 w-10 items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}