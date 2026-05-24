import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { PAGES } from "@/lib/content/page-list";
import { connectDb } from "@/lib/db/connect";
import { PageContentModel } from "@/lib/models/page-content.model";

export const dynamic = "force-dynamic";

async function loadBlockCounts(): Promise<Record<string, number>> {
  try {
    await connectDb();
    const docs = await PageContentModel.find({}, { pageKey: 1, blocks: 1 }).lean();
    const out: Record<string, number> = {};
    for (const d of docs) out[d.pageKey] = Array.isArray(d.blocks) ? d.blocks.length : 0;
    return out;
  } catch {
    return {};
  }
}

export default async function AdminPagesIndex() {
  const counts = await loadBlockCounts();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">Pages</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Edit any page on the website. Add, reorder, hide, or delete sections — all changes are saved per page.
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
                  {count} {count === 1 ? "block" : "blocks"} · {p.publicPath}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
