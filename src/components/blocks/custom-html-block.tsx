import type { Block, Locale } from "@/lib/blocks/types";
import { loc } from "./block-utils";

export function CustomHtmlBlock({ block, locale }: { block: Block; locale: Locale }) {
  const html = loc(block, "html", locale);
  if (!html.trim()) return null;
  return (
    <section className="bg-background">
      <div
        className="mx-auto max-w-5xl px-6 py-12 lg:px-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}