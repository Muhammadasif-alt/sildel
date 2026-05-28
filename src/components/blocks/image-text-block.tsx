import Link from "next/link";
import Image from "next/image";
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, renderParagraphs } from "./block-utils";

export function ImageTextBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const ctaLabel = loc(block, "ctaLabel", locale);
  const ctaHref = str(block, "ctaHref");
  const image = str(block, "image");
  const imageAltField = loc(block, "imageAlt", locale);
  const side = str(block, "side", "left");
  const imageOnRight = side === "right";
  const imageAlt = imageAltField || heading.replace(/\n/g, " ").trim() || "Sildel";

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className={imageOnRight ? "order-1" : "order-1 lg:order-2"}>
          {image ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-muted">
              <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
          ) : (
            <div className="aspect-[4/5] w-full rounded-none bg-muted" />
          )}
        </div>
        <div className={imageOnRight ? "order-2" : "order-2 lg:order-1"}>
          {eyebrow && (
            <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-primary/80">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl">
              {heading.split("\n").map((l, i) => (
                <span key={i} className="block">{l}</span>
              ))}
            </h2>
          )}
          {body && (
            <div className="mt-5 space-y-4 text-base text-muted-foreground md:text-lg">
              {renderParagraphs(body)}
            </div>
          )}
          {ctaLabel && (
            <Link
              href={ctaHref || "#"}
              className="mt-7 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
