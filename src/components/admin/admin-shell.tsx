"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./sidebar";
import { AdminTopbar } from "./topbar";

/**
 * Client wrapper that owns the mobile-drawer state and hands it to the
 * sidebar (as `mobileOpen` / `onMobileClose`) and the topbar (as
 * `onMenuClick`). Server layout cannot hold useState so this shell
 * lives between the layout and the chrome components.
 */
export function AdminShell({
  adminEmail,
  displayName,
  avatarUrl,
  children,
}: {
  adminEmail: string;
  displayName?: string;
  avatarUrl?: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close the drawer on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <AdminSidebar
        adminEmail={adminEmail}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-h-dvh flex-1 flex-col overflow-x-hidden">
        <AdminTopbar
          adminEmail={adminEmail}
          displayName={displayName}
          avatarUrl={avatarUrl}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}