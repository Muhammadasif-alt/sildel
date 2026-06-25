"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/db/prisma";
import type { SiteSettingsData } from "@/lib/content/site-settings";

export async function saveSiteSettings(payload: SiteSettingsData): Promise<{ ok: true }> {
  await requireAdmin();

  const nav = (payload.nav ?? []).map((n) => ({
    id: n.id || randomUUID(),
    label: n.label ?? { pt: "", en: "" },
    href: n.href ?? "",
  }));

  const columns = (payload.footer?.columns ?? []).map((c) => ({
    id: c.id || randomUUID(),
    heading: c.heading ?? { pt: "", en: "" },
    links: (c.links ?? []).map((l) => ({
      id: l.id || randomUUID(),
      label: l.label ?? { pt: "", en: "" },
      href: l.href ?? "",
    })),
  }));

  const data = {
    brand: payload.brand,
    nav,
    footer: { ...payload.footer, columns },
    social: payload.social,
    contact: payload.contact,
    brandVideo: payload.brandVideo,
  };

  await prisma.siteSettings.upsert({
    where: { singletonKey: "main" },
    update: { data },
    create: { singletonKey: "main", data },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { ok: true };
}