import Link from "next/link";
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, renderParagraphs } from "./block-utils";

export function CtaBannerBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const ctaLabel = loc(block, "ctaLabel", locale);
  const ctaHref = str(block, "ctaHref");
  const ctaSecondaryLabel = loc(block, "ctaSecondaryLabel", locale);
  const ctaSecondaryHref = str(block, "ctaSecondaryHref");
  const image = str(block, "image");
  const imageAltField = loc(block, "imageAlt", locale);
  const imageAlt = imageAltField || heading.replace(/\n/g, " ").trim() || "Sildel";

  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {image && (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center md:py-24 lg:px-10">
        {eyebrow && (
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-primary">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="font-serif text-3xl leading-tight md:text-5xl">
            {heading.split("\n").map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h2>
        )}
        {body && (
          <div className="mx-auto mt-5 max-w-2xl space-y-3 text-base opacity-80 md:text-lg">
            {renderParagraphs(body)}
          </div>
        )}
        {(ctaLabel || ctaSecondaryLabel) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {ctaLabel && (
              <Link
                href={ctaHref || "#"}
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
              >
                {ctaLabel}
              </Link>
            )}
            {ctaSecondaryLabel && (
              <Link
                href={ctaSecondaryHref || "#"}
                className="inline-flex items-center rounded-md border border-white/30 bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-white/10"
              >
                {ctaSecondaryLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
