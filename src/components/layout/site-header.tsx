import { getLocale } from "@/lib/i18n/get-locale";
import { getUi } from "@/lib/i18n/ui";
import { getSiteSettings } from "@/lib/content/site-settings";
import { pickLocalized } from "@/lib/blocks/types";
import { HeaderShell } from "./header-shell";

/**
 * Server entry point — fetches locale, UI strings, and site settings,
 * then hands the rendered shell (with all interactive bits) over to the
 * client component HeaderShell. The shell tracks scroll position and
 * route so it can switch between transparent (over the home hero) and
 * solid (everywhere else).
 */
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

  const logoDark = settings.brand.logoDarkUrl || "/brand/sildel-logo-dark-trim.webp";
  // logoLight was wired here for the old transparent-on-home header
  // variant. The shell is now always solid (dark glyph on warm paper),
  // so the light logo is no longer used. The CMS field stays — admins
  // can still upload one for future light-bg surfaces — it's just not
  // referenced from this entry point any more.

  return (
    <HeaderShell
      navItems={navItems}
      logoDark={logoDark}
      accountLabel={ui.header.account}
      homeLabel={ui.nav.home}
    />
  );
}