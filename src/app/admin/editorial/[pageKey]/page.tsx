import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { findEditorialSchema } from "@/lib/editorial/registry";
import { loadEditorialContent } from "@/lib/editorial/load";
import {
  buildInitialOurStory,
  buildInitialAuthenticCork,
} from "@/lib/editorial/seed";
import { EditorialForm } from "@/components/admin/editorial-form";
import type { EditorialContentDoc } from "@/lib/editorial/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ pageKey: string }> };

/**
 * Resolve the initial form state for a page — DB doc if the founder
 * has saved before, otherwise the live TS content seeded via
 * `buildInitial…` so opening the editor never shows blank fields.
 */
async function resolveInitial(
  pageKey: string,
): Promise<EditorialContentDoc> {
  const stored = await loadEditorialContent(pageKey);
  if (stored) return stored;

  switch (pageKey) {
    case "our-story":
      return buildInitialOurStory();
    case "authentic-cork":
      return buildInitialAuthenticCork();
    default:
      return {};
  }
}

export default async function AdminEditorialPage({ params }: Params) {
  const { pageKey } = await params;
  const schema = findEditorialSchema(pageKey);
  if (!schema) notFound();

  const initial = await resolveInitial(pageKey);

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/editorial"
            className="mb-3 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All editorial pages
          </Link>
          <h1 className="font-serif text-3xl text-foreground md:text-4xl">
            {schema.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {schema.description}
          </p>
        </div>
        <a
          href={schema.publicPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40"
        >
          View live page
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </header>

      <EditorialForm schema={schema} initial={initial} />
    </div>
  );
}