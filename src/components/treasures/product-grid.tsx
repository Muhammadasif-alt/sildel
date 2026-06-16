"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/content/treasures";
import { useTreasures } from "@/content/treasures-provider";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Treasures index — editorial magazine rhythm.
 *
 * Founder direction (June 2026, fifth pass): client wants the catalogue
 * to read like a printed feature — BIG images, with some pieces given
 * a full-width spread and others paired two-up. Every block of three
 * products renders as one hero single + one paired row. The pattern
 * resets per block so the rhythm holds even when filters change the
 * total count.
 *
 *   [          FULL-WIDTH HERO          ]      (item 1)
 *   [  PAIR ITEM 2  ][  PAIR ITEM 3  ]
 *   [          FULL-WIDTH HERO          ]      (item 4)
 *   [  PAIR ITEM 5  ][  PAIR ITEM 6  ]
 *   ...
 *
 * No card wrapper, no rounded card frame, no shadow — image at full
 * bleed with plain inline name + category + arrow beneath.
 */
export function ProductGrid() {
  const { content, products } = useTreasures();
  const data = content.products;
  const categories = content.categories.items;
  const [activeSlug, setActiveSlug] = useState<string>("all");

  const filtered = useMemo<Product[]>(() => {
    if (activeSlug === "all") return products;
    return products.filter(
      (p) => p.category.toLowerCase() === activeSlug.replace(/-/g, " "),
    );
  }, [activeSlug, products]);

  // Group products into blocks of [single, pair...] for the magazine
  // rhythm. Each block starts with one full-width hero, then up to two
  // paired tiles beneath.
  const blocks = useMemo(() => {
    const out: Array<{ single: Product; pair: Product[] }> = [];
    for (let i = 0; i < filtered.length; i += 3) {
      out.push({
        single: filtered[i],
        pair: [filtered[i + 1], filtered[i + 2]].filter(
          (p): p is Product => Boolean(p),
        ),
      });
    }
    return out;
  }, [filtered]);

  return (
    <section
      id="product-grid"
      className="relative w-full bg-background"
      aria-labelledby="product-grid-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
            {data.eyebrow}
          </p>
          <h2
            id="product-grid-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1]"
          >
            {data.title} <span className="italic">{data.titleAccent}</span>
          </h2>
          <p className="mt-8 text-muted-foreground text-base md:text-lg leading-relaxed">
            {data.body}
          </p>
        </div>

        {/* Filter row — kept minimal so the catalogue itself is the focus. */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16 lg:mb-20"
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((cat) => {
            const active = activeSlug === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveSlug(cat.slug)}
                className={cn(
                  "inline-flex items-center rounded-full px-5 md:px-6 py-2.5 md:py-3",
                  "text-[11px] tracking-[0.32em] uppercase font-medium",
                  "border transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 cursor-pointer",
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground hover:bg-foreground hover:text-background",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            No treasures in this collection yet.
          </p>
        ) : (
          <div className="space-y-14 lg:space-y-20">
            {blocks.map((block) => (
              <div
                key={block.single.slug}
                className="space-y-14 lg:space-y-20"
              >
                <ScrollReveal>
                  <SingleTile product={block.single} />
                </ScrollReveal>

                {block.pair.length > 0 && (
                  <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
                    {block.pair.map((p, i) => (
                      <ScrollReveal key={p.slug} delay={0.1 + i * 0.08}>
                        <PairTile product={p} />
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────── Full-width hero tile ────────────────── */

function SingleTile({ product }: { product: Product }) {
  return (
    <Link
      href={`/treasures/${product.slug}`}
      aria-label={`${product.name} — ${product.category}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {/* Wide editorial frame — atelier renders are ~3:2 landscape, so a
          16:10 hero with object-cover fills edge-to-edge with only a
          whisper of horizontal crop. No padding, no blurred backdrop:
          the image IS the tile (founder direction, June 2026, seventh
          pass: kill all visible inner padding). */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-8 flex items-baseline justify-between gap-6 md:mt-10">
        <div>
          <h3 className="font-serif text-3xl font-light leading-tight text-foreground transition-colors group-hover:text-primary md:text-4xl lg:text-[2.75rem]">
            {product.name}
          </h3>
          <p className="mt-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            {product.category}
          </p>
        </div>
        <ArrowRight
          className="h-6 w-6 shrink-0 text-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
          strokeWidth={1.25}
        />
      </div>
    </Link>
  );
}

/* ────────────────── Paired tile (two per row) ────────────────── */

function PairTile({ product }: { product: Product }) {
  return (
    <Link
      href={`/treasures/${product.slug}`}
      aria-label={`${product.name} — ${product.category}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 48vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-6 md:mt-7">
        <div>
          <h3 className="font-serif text-2xl font-light leading-tight text-foreground transition-colors group-hover:text-primary md:text-[1.8rem] lg:text-[2rem]">
            {product.name}
          </h3>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {product.category}
          </p>
        </div>
        <ArrowRight
          className="h-5 w-5 shrink-0 text-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
          strokeWidth={1.25}
        />
      </div>
    </Link>
  );
}