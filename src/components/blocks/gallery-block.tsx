import Image from "next/image";
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, list, itemStr, pickFromItem, renderParagraphs } from "./block-utils";

export function GalleryBlock({ block, locale }: { block: Block; locale: Locale }) {
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const columns = str(block, "columns", "3");
  const items = list(block, "items").filter((it) => itemStr(it, "image"));

  const colsCls =
    columns === "2"
      ? "sm:grid-cols-2"
      : columns === "4"
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-10">
        {(heading || body) && (
          <div className="mb-10 max-w-3xl">
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
          <div className={"grid grid-cols-1 gap-4 " + colsCls}>
            {items.map((it, i) => {
              const url = itemStr(it, "image");
              const alt = pickFromItem(it, "alt", locale) || pickFromItem(it, "caption", locale);
              const caption = pickFromItem(it, "caption", locale);
              return (
                <figure key={i} className="overflow-hidden rounded-xl">
                  <div className="relative aspect-[4/5] w-full bg-muted">
                    <Image src={url} alt={alt} fill className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" />
                  </div>
                  {caption && (
                    <figcaption className="mt-2 text-xs text-muted-foreground">{caption}</figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
