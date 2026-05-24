import type { Block, Locale } from "@/lib/blocks/types";
import { loc, list, itemStr, pickFromItem, renderParagraphs } from "./block-utils";

export function StatsBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const heading = loc(block, "heading", locale);
  const items = list(block, "items");

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-10">
        {(eyebrow || heading) && (
          <div className="mb-12 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-primary/80">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl">
                {renderParagraphs(heading)}
              </h2>
            )}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {items.map((it, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 md:p-8">
                <p className="font-serif text-3xl tracking-tight text-foreground md:text-5xl">
                  {itemStr(it, "value")}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {pickFromItem(it, "label", locale)}
                </p>
                {pickFromItem(it, "hint", locale) && (
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {pickFromItem(it, "hint", locale)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
