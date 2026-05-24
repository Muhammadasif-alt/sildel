/**
 * Server-side reader for site-wide settings (header/footer/nav/social/contact).
 * Returns a defaults object when the DB is empty so the public site keeps
 * rendering before anything is configured.
 *
 * The plain defaults / types live in `./site-settings-defaults` so they can be
 * loaded from non-Next contexts (seed scripts).
 */
import "server-only";
import { connectDb } from "@/lib/db/connect";
import { SiteSettingsModel } from "@/lib/models/site-settings.model";
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
    await connectDb();
    const doc = await SiteSettingsModel.findOne({ singletonKey: "main" }).lean();
    if (!doc) return DEFAULT_SITE_SETTINGS;

    const d = DEFAULT_SITE_SETTINGS;
    return {
      brand: {
        name: doc.brand?.name || d.brand.name,
        tagline: mergeLocalized(doc.brand?.tagline, d.brand.tagline),
        logoDarkUrl: doc.brand?.logoDarkUrl || d.brand.logoDarkUrl,
        logoLightUrl: doc.brand?.logoLightUrl || d.brand.logoLightUrl,
      },
      nav: Array.isArray(doc.nav) && doc.nav.length
        ? doc.nav.map((n, i) => ({
            id: n.id || `nav-${i}`,
            label: mergeLocalized(n.label, { pt: "", en: "" }),
            href: n.href || "",
          }))
        : d.nav,
      footer: {
        tagline: mergeLocalized(doc.footer?.tagline, d.footer.tagline),
        columns: Array.isArray(doc.footer?.columns)
          ? doc.footer.columns.map((c, i) => ({
              id: c.id || `col-${i}`,
              heading: mergeLocalized(c.heading, { pt: "", en: "" }),
              links: Array.isArray(c.links)
                ? c.links.map((l, j) => ({
                    id: l.id || `${c.id}-${j}`,
                    label: mergeLocalized(l.label, { pt: "", en: "" }),
                    href: l.href || "",
                  }))
                : [],
            }))
          : d.footer.columns,
        copyright: mergeLocalized(doc.footer?.copyright, d.footer.copyright),
      },
      social: { ...d.social, ...(doc.social ?? {}) },
      contact: {
        email: doc.contact?.email || d.contact.email,
        phone: doc.contact?.phone || d.contact.phone,
        address: mergeLocalized(doc.contact?.address, d.contact.address),
        hours: mergeLocalized(doc.contact?.hours, d.contact.hours),
      },
      brandVideo: {
        url: doc.brandVideo?.url || d.brandVideo.url,
        title: mergeLocalized(doc.brandVideo?.title, d.brandVideo.title),
        poster: doc.brandVideo?.poster || d.brandVideo.poster,
      },
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
