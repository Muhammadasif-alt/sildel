/**
 * Admin layout — sidebar + topbar shell. The login page bypasses the shell by
 * checking the pathname header set by proxy.ts.
 */
import { cookies, headers } from "next/headers";
import { requireAdmin } from "@/lib/auth/admin";
import { getAdminProfile } from "@/lib/auth/admin-profile";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
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

  const themeCookie = (await cookies()).get("sildel-admin-theme")?.value;
  const theme: "light" | "dark" = themeCookie === "light" ? "light" : "dark";

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
      <div className="flex min-h-dvh bg-background text-foreground">
        <AdminSidebar adminEmail={session.email} />
        <div className="flex min-h-dvh flex-1 flex-col overflow-x-hidden">
          <AdminTopbar
            adminEmail={session.email}
            displayName={profile.displayName}
            avatarUrl={profile.avatarUrl}
          />
          <main className="flex-1">
            <div className="mx-auto max-w-[1700px] px-6 py-8 lg:px-10 lg:py-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminThemeProvider>
  );
}