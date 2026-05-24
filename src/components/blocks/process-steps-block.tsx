import Image from "next/image";
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, list, itemStr, pickFromItem, renderParagraphs } from "./block-utils";

export function ProcessStepsBlock({ block, locale }: { block: Block; locale: Locale }) {
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const items = list(block, "items");

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-10">
        {(heading || body) && (
          <div className="mb-12 max-w-3xl">
            {heading && (
              <h2 className="font-serif text-3xl text-foreground md:text-4xl lg:text-5xl">{heading}</h2>
            )}
            {body && (
              <div className="mt-4 space-y-3 text-base text-muted-foreground md:text-lg">
                {renderParagraphs(body)}
              </div>
            )}
          </div>
        )}

        <ol className="space-y-12">
          {items.map((it, i) => {
            const img = itemStr(it, "image");
            const title = pickFromItem(it, "title", locale);
            const text = pickFromItem(it, "body", locale);
            const reverse = i % 2 === 1;
            return (
              <li
                key={i}
                className={
                  "grid items-center gap-8 lg:grid-cols-2 lg:gap-12 " +
                  (reverse ? "lg:[&>div:first-child]:order-2" : "")
                }
              >
                {img ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <Image src={img} alt={title} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-2xl bg-muted" />
                )}
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-primary/80">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  {title && (
                    <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">{title}</h3>
                  )}
                  {text && (
                    <div className="mt-3 space-y-3 text-base text-muted-foreground md:text-lg">
                      {renderParagraphs(text)}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
