import Link from "next/link";
import { Plus, Newspaper, Star } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { DeleteBlogButton } from "@/components/admin/delete-blog-button";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground md:text-4xl">Blogs</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage journal posts shown at /blog.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New post
        </Link>
      </header>

      {blogs.length === 0 ? (
        <div className="rounded-none border border-dashed border-border bg-card p-12 text-center">
          <Newspaper className="mx-auto mb-3 h-8 w-8 text-muted-foreground" strokeWidth={1.4} />
          <p className="text-sm text-muted-foreground">
            No blog posts yet — create your first one.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-none border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Tag</th>
                <th className="px-6 py-3 font-medium">Author</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blogs.map((b) => (
                <tr key={b.slug} className="text-foreground hover:bg-accent/40">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/blogs/${b.slug}`}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {b.title}
                    </Link>
                    {b.featured && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                        <Star className="h-2.5 w-2.5 fill-current" />
                        Featured
                      </span>
                    )}
                    <div className="mt-1 font-mono text-xs text-muted-foreground">
                      /{b.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{b.tag}</td>
                  <td className="px-6 py-4 text-muted-foreground">{b.author}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {b.date ? new Date(b.date).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        "rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider ring-1 " +
                        (b.published
                          ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300"
                          : "bg-muted text-muted-foreground ring-border")
                      }
                    >
                      {b.published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${b.slug}`}
                        className="rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                      >
                        Edit
                      </Link>
                      <DeleteBlogButton slug={b.slug} title={b.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}