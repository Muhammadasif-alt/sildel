import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { EDITORIAL_SCHEMAS } from "@/lib/editorial/registry";
import { listEditorialEditedPages } from "./actions";

export const dynamic = "force-dynamic";

/**
 * Editorial-pages index. Each card opens the schema-driven editor
 * for that page. "Edited" badge appears once founder has saved at
 * least one revision; before that the page reads from its TS file.
 */
export default async function AdminEditorialIndex() {
  const edited = await listEditorialEditedPages();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">
          Editorial pages
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Edit the rich, image-heavy pages — Our Story, Authentic Cork, You
          Think Cork and so on. Each page shows you exactly the text and
          images that appear on the live site, side-by-side for English and
          Portuguese.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EDITORIAL_SCHEMAS.map((s) => {
          const wasEdited = edited.has(s.pageKey);
          return (
            <Link
              key={s.pageKey}
              href={`/admin/editorial/${s.pageKey}`}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-medium text-foreground">{s.title}</h2>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                    strokeWidth={1.6}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s.description}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                  {wasEdited ? "Edited · " : "Default content · "}
                  {s.publicPath}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}