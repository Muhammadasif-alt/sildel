import { Mail, Shield, Check } from "lucide-react";
import { requireAdmin } from "@/lib/auth/admin";
import { getAdminProfile } from "@/lib/auth/admin-profile";
import { AvatarUpload } from "@/components/admin/avatar-upload";
import { saveProfile } from "./actions";

type Params = { searchParams: Promise<{ saved?: string }> };

export default async function AdminProfilePage({ searchParams }: Params) {
  const session = await requireAdmin();
  const profile = await getAdminProfile(session.email);
  const sp = await searchParams;

  const initials = (profile.displayName || session.email).slice(0, 2).toUpperCase();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">Profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Update your photo and display name — they appear in the topbar.
        </p>
      </header>

      {sp.saved && (
        <div className="mb-6 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-700 dark:text-emerald-300">
          <Check className="h-4 w-4" />
          Profile saved.
        </div>
      )}

      <form action={saveProfile} className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]">
        {/* Avatar + meta */}
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground">Photo</h2>
          <AvatarUpload currentUrl={profile.avatarUrl} initials={initials} />
        </div>

        {/* Editable details */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-5 font-serif text-xl text-foreground">Account</h2>

          <div className="mb-5">
            <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Display name
            </label>
            <input
              name="displayName"
              defaultValue={profile.displayName}
              placeholder="e.g. Asif Riyasat"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1 text-[11px] text-muted-foreground/80">
              Shown in the topbar &amp; profile dropdown.
            </p>
          </div>

          <dl className="divide-y divide-border border-t border-border pt-3">
            <div className="grid grid-cols-3 gap-4 py-3">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                Email
              </dt>
              <dd className="col-span-2 text-sm text-foreground">{session.email}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3">
              <dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Role
              </dt>
              <dd className="col-span-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary">
                  <Shield className="h-3 w-3" />
                  Owner
                </span>
              </dd>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3">
              <dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Password
              </dt>
              <dd className="col-span-2 text-sm text-muted-foreground">
                Set in <code className="rounded bg-muted px-1.5 py-0.5 text-xs">.env.local</code>{" "}
                — restart the server after editing.
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}