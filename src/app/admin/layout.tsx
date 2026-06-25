/**
 * Admin layout — sidebar + topbar shell. The login page bypasses the shell by
 * checking the pathname header set by proxy.ts.
 */
import { headers } from "next/headers";
import { requireAdmin } from "@/lib/auth/admin";
import { getAdminProfile } from "@/lib/auth/admin-profile";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminThemeProvider } from "@/components/admin/theme-provider";

export const metadata = {
  title: "Sildel · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-sildel-pathname") ?? "";
  const isLoginPage = pathname === "/admin/login";

  // Single tan theme across the whole product — admin matches the public
  // site (warm cork + black ink), no dark mode.
  const theme = "light" as const;

  // Login page: themed shell, no sidebar/topbar.
  if (isLoginPage) {
    return (
      <AdminThemeProvider initial={theme}>
        <div className="min-h-dvh bg-background text-foreground">{children}</div>
      </AdminThemeProvider>
    );
  }

  const session = await requireAdmin();
  const profile = await getAdminProfile(session.email);

  return (
    <AdminThemeProvider initial={theme}>
      <AdminShell
        adminEmail={session.email}
        displayName={profile.displayName}
        avatarUrl={profile.avatarUrl}
      >
        {children}
      </AdminShell>
    </AdminThemeProvider>
  );
}