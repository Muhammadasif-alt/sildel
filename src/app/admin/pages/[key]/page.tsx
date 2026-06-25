import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { findPage } from "@/lib/content/page-list";
import { findPageSchema, getPageContent } from "@/lib/content/pages";
import { SimplePageEditor } from "./simple-page-editor";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ key: string }> };

export default async function EditPagePage({ params }: Params) {
  const { key } = await params;
  const def = findPage(key);
  const schema = findPageSchema(key);
  if (!def || !schema) notFound();

  const content = await getPageContent(key);
  const initial: Record<string, Record<string, string>> = {};
  for (const section of schema.sections) {
    initial[section.key] = {};
    for (const field of section.fields) {
      initial[section.key][field.key] = content[section.key]?.fields?.[field.key] ?? "";
    }
  }

  return (
    <div>
      <Link
        href="/admin/pages"
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All pages
      </Link>

      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-foreground sm:text-3xl md:text-4xl">{def.label}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{def.description}</p>
        </div>
        <Link
          href={def.publicPath}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          View live
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.6} />
        </Link>
      </header>

      <SimplePageEditor pageKey={key} schema={schema} initial={initial} />
    </div>
  );
}