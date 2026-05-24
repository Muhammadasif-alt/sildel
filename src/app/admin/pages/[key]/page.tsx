import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { findPage } from "@/lib/content/page-list";
import { getPage } from "@/lib/content/page-blocks";
import { BLOCK_TYPES } from "@/lib/blocks/registry";
import { PageEditor } from "./page-editor";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ key: string }> };

export default async function EditPagePage({ params }: Params) {
  const { key } = await params;
  const def = findPage(key);
  if (!def) notFound();

  const page = await getPage(key);

  return (
    <div>
      <Link
        href="/admin/pages"
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All pages
      </Link>

      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">{def.label}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{def.description}</p>
      </header>

      <PageEditor
        pageKey={key}
        publicPath={def.publicPath}
        initialBlocks={page.blocks}
        initialSeo={page.seo ?? { title: { pt: "", en: "" }, description: { pt: "", en: "" } }}
        blockTypes={BLOCK_TYPES}
      />
    </div>
  );
}
