"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { User, LogOut, ChevronDown, UserCircle2 } from "lucide-react";

const PAGE_TITLES: { match: RegExp; title: string }[] = [
  { match: /^\/admin\/blogs\/new$/, title: "New blog post" },
  { match: /^\/admin\/blogs\/[^/]+$/, title: "Edit blog post" },
  { match: /^\/admin\/blogs$/, title: "Blogs" },
  { match: /^\/admin\/products\/new$/, title: "New product" },
  { match: /^\/admin\/products\/[^/]+$/, title: "Edit product" },
  { match: /^\/admin\/products$/, title: "Products" },
  { match: /^\/admin\/orders\/[^/]+$/, title: "Order detail" },
  { match: /^\/admin\/orders$/, title: "Orders" },
  { match: /^\/admin\/subscribers$/, title: "Subscribers" },
  { match: /^\/admin\/pages\/([^/]+)$/, title: "" }, // filled in dynamically below
  { match: /^\/admin\/pages$/, title: "Pages" },
  { match: /^\/admin\/profile$/, title: "Profile" },
  { match: /^\/admin$/, title: "Dashboard" },
];

function titleFromPath(pathname: string): string {
  for (const { match, title } of PAGE_TITLES) {
    const m = pathname.match(match);
    if (!m) continue;
    if (title) return title;
    const slug = m[1] ?? "";
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return "Admin";
}

export function AdminTopbar({
  adminEmail,
  displayName,
  avatarUrl,
}: {
  adminEmail: string;
  displayName?: string;
  avatarUrl?: string;
}) {
  const pathname = usePathname();
  const pageTitle = titleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const nameForInitials = (displayName?.trim() || adminEmail).trim();
  const initials = nameForInitials.slice(0, 2).toUpperCase();
  const labelName =
    displayName?.trim() ||
    adminEmail.split("@")[0].replace(/\./g, " ").replace(/^\w/, (c) => c.toUpperCase());

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="relative block h-10 w-[120px]" aria-label="Sildel">
          <Image
            src="/images/og/sildel-logo-dark.png"
            alt="Sildel"
            fill
            sizes="120px"
            priority
            className="object-contain object-left dark:hidden"
          />
          <Image
            src="/images/og/sildel-logo-light.webp"
            alt="Sildel"
            fill
            sizes="120px"
            priority
            className="hidden object-contain object-left dark:block"
          />
        </Link>
        <span aria-hidden className="hidden h-8 w-px bg-border md:block" />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Admin
          </span>
          <h1 className="font-serif text-lg text-foreground md:text-xl">
            {pageTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Profile dropdown */}
        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={labelName}
            title={labelName}
            className="inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-card pl-1 pr-2 text-foreground transition-colors hover:border-primary/50"
          >
            <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15 text-[12px] font-medium uppercase tracking-wider text-primary">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={labelName}
                  fill
                  sizes="36px"
                  className="object-cover"
                  unoptimized={avatarUrl.startsWith("data:")}
                />
              ) : (
                initials
              )}
            </span>
            <ChevronDown
              className={
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform " +
                (open ? "rotate-180" : "")
              }
              strokeWidth={1.8}
            />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl shadow-black/20"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15 text-sm font-medium uppercase text-primary">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={labelName}
                      fill
                      sizes="44px"
                      className="object-cover"
                      unoptimized={avatarUrl.startsWith("data:")}
                    />
                  ) : (
                    <UserCircle2 className="h-6 w-6" strokeWidth={1.6} />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{labelName}</p>
                  <p className="truncate text-xs text-muted-foreground" title={adminEmail}>
                    {adminEmail}
                  </p>
                </div>
              </div>

              <div className="py-1">
                <Link
                  href="/admin/profile"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} />
                  Profile
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  onClick={logout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.6} />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}