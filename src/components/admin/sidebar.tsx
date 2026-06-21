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

// Founder direction (June 2026): admin scope reduced to "bas product
// add krna hai, image change krni add krni delted krni, blogs add
// krna ho gay, baki ni krna kuch b". Editorial pages, settings,
// CMS block pages, orders + subscribers stay implemented under
// src/app/admin/* (and routes still resolve if linked directly) but
// the nav only exposes the three surfaces the founder actually uses.
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
];

export function AdminSidebar({ adminEmail: _adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="hidden border-r border-border bg-card text-card-foreground md:flex md:w-64 md:flex-col">
      {/* Brand */}
      <div className="flex h-20 items-center border-b border-border px-6 py-3">
        <Link href="/admin" className="relative block h-12 w-[160px]" aria-label="Sildel admin">
          {/* Dark-ink logo: visible in light mode */}
          <Image
            src="/images/og/sildel-logo-dark.png"
            alt="Sildel"
            fill
            sizes="160px"
            priority
            className="object-contain object-left dark:hidden"
          />
          {/* Light-ink logo: visible in dark mode */}
          <Image
            src="/images/og/sildel-logo-light.webp"
            alt="Sildel"
            fill
            sizes="160px"
            priority
            className="hidden object-contain object-left dark:block"
          />
        </Link>
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
    </aside>
  );
}