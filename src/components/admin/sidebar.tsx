"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  LogOut,
  Newspaper,
  Images,
  X,
  FileText,
  Settings as SettingsIcon,
  UserCircle,
  Mail,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  exact?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

// Admin nav (June 2026 — expanded back per founder ask for page editing):
// Catalogue = the day-to-day product/blog work. Content = marketing pages
// CMS + global header/footer settings. Account = the admin's own profile.
const GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: "Catalogue",
    items: [
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
      { href: "/admin/media", label: "Media library", icon: Images },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/pages", label: "Pages", icon: FileText },
      { href: "/admin/settings", label: "Site settings", icon: SettingsIcon },
      { href: "/admin/subscribers", label: "Newsletter", icon: Mail },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/admin/profile", label: "Profile", icon: UserCircle },
    ],
  },
];

export function AdminSidebar({
  adminEmail: _adminEmail,
  mobileOpen = false,
  onMobileClose,
}: {
  adminEmail: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const navInner = (
    <>
      {/* Brand */}
      <div className="flex h-20 items-center justify-between border-b border-border px-6 py-3">
        <Link
          href="/admin"
          className="relative block h-12 w-[160px]"
          aria-label="Sildel admin"
        >
          <Image
            src="/images/og/sildel-logo-dark.png"
            alt="Sildel"
            fill
            sizes="160px"
            priority
            className="object-contain object-left dark:hidden"
          />
          <Image
            src="/images/og/sildel-logo-light.webp"
            alt="Sildel"
            fill
            sizes="160px"
            priority
            className="hidden object-contain object-left dark:block"
          />
        </Link>
        {/* Close button — mobile drawer only */}
        {onMobileClose && (
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close menu"
            className="-mr-2 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        )}
      </div>

      {/* Nav (scrollable) */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {GROUPS.map((group, gi) => (
          <div key={group.title} className={gi > 0 ? "mt-6" : ""}>
            <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground/70">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? pathname === item.href
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors " +
                      (active
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground")
                    }
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom — logout only (profile/email is in topbar now) */}
      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.6} />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar — static column */}
      <aside className="hidden border-r border-border bg-card text-card-foreground md:flex md:w-64 md:flex-col">
        {navInner}
      </aside>

      {/* Mobile drawer — overlay + sliding panel */}
      <div
        className={
          "fixed inset-0 z-[60] md:hidden " +
          (mobileOpen ? "pointer-events-auto" : "pointer-events-none")
        }
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          onClick={onMobileClose}
          className={
            "absolute inset-0 bg-black/50 transition-opacity duration-200 " +
            (mobileOpen ? "opacity-100" : "opacity-0")
          }
        />
        {/* Panel */}
        <aside
          role="dialog"
          aria-label="Admin navigation"
          className={
            "absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-border bg-card text-card-foreground shadow-xl transition-transform duration-200 ease-out " +
            (mobileOpen ? "translate-x-0" : "-translate-x-full")
          }
        >
          {navInner}
        </aside>
      </div>
    </>
  );
}