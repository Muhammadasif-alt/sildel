/**
 * Server-side reader for site-wide settings (header/footer/nav/social/contact).
 * Reads from Prisma `SiteSettings.data` and merges with defaults so the
 * public site keeps rendering when nothing is configured yet.
 */
import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { Localized } from "@/lib/blocks/types";
import {
  DEFAULT_SITE_SETTINGS,
  type NavLink,
  type FooterColumn,
  type SiteSettingsData,
} from "./site-settings-defaults";

export { DEFAULT_SITE_SETTINGS };
export type { NavLink, FooterColumn, SiteSettingsData };

function mergeLocalized(value: unknown, fallback: Localized): Localized {
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    return {
      pt: typeof v.pt === "string" ? v.pt : fallback.pt ?? "",
      en: typeof v.en === "string" ? v.en : fallback.en ?? "",
    };
  }
  return fallback;
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { singletonKey: "main" },
      select: { data: true },
    });
    const doc =
      row?.data && typeof row.data === "object" && !Array.isArray(row.data)
        ? (row.data as Record<string, never>)
        : null;
    if (!doc) return DEFAULT_SITE_SETTINGS;

    const d = DEFAULT_SITE_SETTINGS;
    const brand = (doc as { brand?: Record<string, unknown> }).brand ?? {};
    const footer = (doc as { footer?: Record<string, unknown> }).footer ?? {};
    const social = (doc as { social?: Record<string, string> }).social ?? {};
    const contact = (doc as { contact?: Record<string, unknown> }).contact ?? {};
    const brandVideo = (doc as { brandVideo?: Record<string, unknown> }).brandVideo ?? {};
    const navArr = (doc as { nav?: unknown }).nav;
    const columnsArr = (footer as { columns?: unknown }).columns;

    return {
      brand: {
        name: (brand.name as string) || d.brand.name,
        tagline: mergeLocalized(brand.tagline, d.brand.tagline),
        logoDarkUrl: (brand.logoDarkUrl as string) || d.brand.logoDarkUrl,
        logoLightUrl: (brand.logoLightUrl as string) || d.brand.logoLightUrl,
      },
      nav: Array.isArray(navArr) && navArr.length
        ? navArr.map((n: Record<string, unknown>, i: number) => ({
            id: (n.id as string) || `nav-${i}`,
            label: mergeLocalized(n.label, { pt: "", en: "" }),
            href: (n.href as string) || "",
          }))
        : d.nav,
      footer: {
        tagline: mergeLocalized(
          (footer as { tagline?: unknown }).tagline,
          d.footer.tagline,
        ),
        columns: Array.isArray(columnsArr)
          ? columnsArr.map((c: Record<string, unknown>, i: number) => ({
              id: (c.id as string) || `col-${i}`,
              heading: mergeLocalized(c.heading, { pt: "", en: "" }),
              links: Array.isArray(c.links)
                ? (c.links as Record<string, unknown>[]).map((l, j) => ({
                    id: (l.id as string) || `${c.id}-${j}`,
                    label: mergeLocalized(l.label, { pt: "", en: "" }),
                    href: (l.href as string) || "",
                  }))
                : [],
            }))
          : d.footer.columns,
        copyright: mergeLocalized(
          (footer as { copyright?: unknown }).copyright,
          d.footer.copyright,
        ),
      },
      social: { ...d.social, ...social },
      contact: {
        email: (contact.email as string) || d.contact.email,
        phone: (contact.phone as string) || d.contact.phone,
        address: mergeLocalized(contact.address, d.contact.address),
        hours: mergeLocalized(contact.hours, d.contact.hours),
      },
      brandVideo: {
        url: (brandVideo.url as string) || d.brandVideo.url,
        title: mergeLocalized(brandVideo.title, d.brandVideo.title),
        poster: (brandVideo.poster as string) || d.brandVideo.poster,
      },
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}