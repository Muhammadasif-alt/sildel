/**
 * Helper to fetch (and lazily upsert) the current admin's profile doc.
 * Used by the admin layout to feed avatar/displayName into the topbar.
 */
import "server-only";
import { connectDb } from "@/lib/db/connect";
import { AdminProfileModel } from "@/lib/models/admin-profile.model";

export type AdminProfileView = {
  email: string;
  displayName: string;
  avatarUrl: string;
};

export async function getAdminProfile(email: string): Promise<AdminProfileView> {
  try {
    await connectDb();
    const doc = await AdminProfileModel.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $setOnInsert: { email: email.toLowerCase() } },
      { upsert: true, new: true }
    ).lean();
    return {
      email,
      displayName: doc?.displayName ?? "",
      avatarUrl: doc?.avatarUrl ?? "",
    };
  } catch {
    return { email, displayName: "", avatarUrl: "" };
  }
}