import type { Block, Locale } from "@/lib/blocks/types";
import { loc, list, pickFromItem, renderParagraphs } from "./block-utils";

export function FaqBlock({ block, locale }: { block: Block; locale: Locale }) {
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const items = list(block, "items").filter((it) => pickFromItem(it, "question", locale));

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-24 lg:px-10">
        {(heading || body) && (
          <div className="mb-10">
            {heading && (
              <h2 className="font-serif text-3xl text-foreground md:text-4xl">
                {heading}
              </h2>
            )}
            {body && (
              <div className="mt-4 space-y-3 text-base text-muted-foreground md:text-lg">
                {renderParagraphs(body)}
              </div>
            )}
          </div>
        )}

        {items.length > 0 && (
          <div className="divide-y divide-border/60 rounded-none border border-border bg-card">
            {items.map((it, i) => (
              <details key={i} className="group p-5">
                <summary className="cursor-pointer list-none font-medium text-foreground transition-colors hover:text-primary">
                  <span className="flex items-center justify-between gap-4">
                    <span>{pickFromItem(it, "question", locale)}</span>
                    <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <div className="mt-3 space-y-3 text-sm text-muted-foreground md:text-base">
                  {renderParagraphs(pickFromItem(it, "answer", locale))}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}