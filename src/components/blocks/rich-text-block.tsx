import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, renderParagraphs } from "./block-utils";

export function RichTextBlock({ block, locale }: { block: Block; locale: Locale }) {
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const align = str(block, "align", "left");
  const alignCls = align === "center" ? "text-center mx-auto" : "";

  return (
    <section className="bg-background">
      <div className={"mx-auto max-w-3xl px-6 py-16 md:py-20 lg:px-10 " + alignCls}>
        {heading && (
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            {heading}
          </h2>
        )}
        {body && (
          <div className="mt-5 space-y-4 text-base text-muted-foreground md:text-lg">
            {renderParagraphs(body)}
          </div>
        )}
      </div>
    </section>
  );
}
