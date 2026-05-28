import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, renderParagraphs } from "./block-utils";

export function PageHeaderBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const image = str(block, "image");
  const imageAltField = loc(block, "imageAlt", locale);
  const imageAlt = imageAltField || heading.replace(/\n/g, " ").trim() || "Sildel";

  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-10">
        {eyebrow && (
          <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-primary/80">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {heading.split("\n").map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h1>
        )}
        {body && (
          <div className="mt-6 max-w-3xl space-y-3 text-base text-muted-foreground md:text-lg">
            {renderParagraphs(body)}
          </div>
        )}
        {image && (
          <div className="mt-10 overflow-hidden rounded-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt} className="h-auto w-full" />
          </div>
        )}
      </div>
    </section>
  );
}
