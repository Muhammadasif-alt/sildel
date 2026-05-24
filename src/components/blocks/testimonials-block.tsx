import type { Block, Locale } from "@/lib/blocks/types";
import { loc, list, itemStr, pickFromItem } from "./block-utils";

export function TestimonialsBlock({ block, locale }: { block: Block; locale: Locale }) {
  const heading = loc(block, "heading", locale);
  const items = list(block, "items").filter((it) => pickFromItem(it, "quote", locale));

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-10">
        {heading && (
          <h2 className="mb-12 max-w-3xl font-serif text-3xl text-foreground md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const avatar = itemStr(it, "avatar");
            return (
              <figure key={i} className="rounded-2xl border border-border bg-card p-6 md:p-7">
                <blockquote className="font-serif text-base italic leading-relaxed text-foreground md:text-lg">
                  &ldquo;{pickFromItem(it, "quote", locale)}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{itemStr(it, "author")}</p>
                    {pickFromItem(it, "role", locale) && (
                      <p className="truncate text-xs text-muted-foreground">
                        {pickFromItem(it, "role", locale)}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
