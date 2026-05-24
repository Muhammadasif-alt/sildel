"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { SiteSettingsModel } from "@/lib/models/site-settings.model";
import type { SiteSettingsData } from "@/lib/content/site-settings";

export async function saveSiteSettings(payload: SiteSettingsData): Promise<{ ok: true }> {
  await requireAdmin();
  await connectDb();

  // Ensure every nav/footer entry has a stable id so the form re-render is stable.
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

  await SiteSettingsModel.findOneAndUpdate(
    { singletonKey: "main" },
    {
      singletonKey: "main",
      brand: payload.brand,
      nav,
      footer: { ...payload.footer, columns },
      social: payload.social,
      contact: payload.contact,
      brandVideo: payload.brandVideo,
    },
    { upsert: true, new: true }
  );

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { ok: true };
}
