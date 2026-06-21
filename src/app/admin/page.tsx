import Link from "next/link";
import { Package, Newspaper, Images, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/db/prisma";

/**
 * Admin dashboard — scope reduced (June 2026) to the three surfaces the
 * founder actually uses: Products, Blogs, Media. Orders/Subscribers/
 * editorial stats were dropped along with the corresponding nav links
 * once we moved off MongoDB and into MySQL.
 */
export default async function AdminDashboardPage() {
  const [productCount, blogCount, mediaCount] = await Promise.all([
    prisma.product.count(),
    prisma.blog.count(),
    prisma.mediaAsset.count(),
  ]);

  const stats = [
    { label: "Products", value: productCount, icon: Package, href: "/admin/products" },
    { label: "Blog posts", value: blogCount, icon: Newspaper, href: "/admin/blogs" },
    { label: "Media files", value: mediaCount, icon: Images, href: "/admin/media" },
  ];

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage the Sildel catalogue, journal and media library.
        </p>
      </header>

      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group rounded-none border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                  strokeWidth={1.6}
                />
              </div>
              <p className="text-3xl font-light tabular-nums text-foreground">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </p>
            </Link>
          );
        })}
      </div>

      <section className="rounded-none border border-border bg-card p-8">
        <h2 className="font-serif text-xl text-foreground">Quick actions</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a new treasure to the catalogue, publish a journal post, or
          upload images to the media library.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Package className="h-4 w-4" strokeWidth={1.6} />
            New product
          </Link>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/40"
          >
            <Newspaper className="h-4 w-4" strokeWidth={1.6} />
            New blog post
          </Link>
          <Link
            href="/admin/media"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/40"
          >
            <Images className="h-4 w-4" strokeWidth={1.6} />
            Open media library
          </Link>
        </div>
      </section>
    </div>
  );
}