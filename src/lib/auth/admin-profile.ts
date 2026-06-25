/**
 * Helper to fetch (and lazily upsert) the current admin's profile row.
 * Used by the admin layout to feed avatar/displayName into the topbar.
 */
import "server-only";
import { prisma } from "@/lib/db/prisma";

export type AdminProfileView = {
  email: string;
  displayName: string;
  avatarUrl: string;
};

export async function getAdminProfile(email: string): Promise<AdminProfileView> {
  const normalized = email.toLowerCase();
  try {
    const row = await prisma.adminProfile.upsert({
      where: { email: normalized },
      update: {},
      create: { email: normalized },
    });
    return {
      email,
      displayName: row.displayName,
      avatarUrl: row.avatarUrl,
    };
  } catch {
    return { email, displayName: "", avatarUrl: "" };
  }
}