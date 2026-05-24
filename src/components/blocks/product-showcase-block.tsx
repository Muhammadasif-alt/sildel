import Link from "next/link";
import Image from "next/image";
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, renderParagraphs } from "./block-utils";

export type ShowcaseProduct = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  priceCents: number;
  currency: string;
};

function formatPrice(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  } catch {
    return `${currency} ${(cents / 100).toFixed(0)}`;
  }
}

export function ProductShowcaseBlock({
  block,
  locale,
  products,
}: {
  block: Block;
  locale: Locale;
  products: Map<string, ShowcaseProduct>;
}) {
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const slugs = str(block, "productSlugs")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const picked = slugs.map((s) => products.get(s)).filter(Boolean) as ShowcaseProduct[];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-10">
        {(heading || body) && (
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              {heading && (
                <h2 className="font-serif text-3xl text-foreground md:text-4xl lg:text-5xl">{heading}</h2>
              )}
              {body && (
                <div className="mt-4 space-y-3 text-base text-muted-foreground md:text-lg">
                  {renderParagraphs(body)}
                </div>
              )}
            </div>
            <Link
              href="/treasures"
              className="text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
            >
              View all →
            </Link>
          </div>
        )}

        {picked.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No products selected. Add slugs (comma-separated) in the admin.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {picked.map((p) => (
              <Link
                key={p.slug}
                href={`/treasures/${p.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 25vw, 50vw"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-serif text-base text-foreground">{p.name}</h3>
                    {p.tagline && (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.tagline}</p>
                    )}
                  </div>
                  <p className="shrink-0 text-sm font-medium text-foreground">
                    {formatPrice(p.priceCents, p.currency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
