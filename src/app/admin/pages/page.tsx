import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { PAGES } from "@/lib/content/page-list";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

type SectionsShape = Record<string, { fields?: Record<string, string> }>;

async function loadEditedCounts(): Promise<Record<string, number>> {
  try {
    const rows = await prisma.pageContent.findMany({
      select: { pageKey: true, sections: true },
    });
    const out: Record<string, number> = {};
    for (const r of rows) {
      let count = 0;
      const sections =
        r.sections && typeof r.sections === "object" && !Array.isArray(r.sections)
          ? (r.sections as SectionsShape)
          : {};
      for (const s of Object.values(sections)) {
        for (const v of Object.values(s.fields ?? {})) {
          if (typeof v === "string" && v.trim().length > 0) count++;
        }
      }
      out[r.pageKey] = count;
    }
    return out;
  } catch {
    return {};
  }
}

export default async function AdminPagesIndex() {
  const counts = await loadEditedCounts();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-2xl text-foreground sm:text-3xl md:text-4xl">Pages</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Pick a page to edit its text content and images. Changes save per
          field and update the live site immediately.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((p) => {
          const count = counts[p.key] ?? 0;
          return (
            <Link
              key={p.key}
              href={`/admin/pages/${p.key}`}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-medium text-foreground">{p.label}</h2>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" strokeWidth={1.6} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                  {count} edited · {p.publicPath}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}