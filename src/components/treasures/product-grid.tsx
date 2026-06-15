"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/content/treasures";
import { useTreasures } from "@/content/treasures-provider";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Treasures index — Van Cleef-style museum grid.
 *
 * Founder direction (June 2026, fourth pass): retire the rounded-card +
 * shadow treatment. Each piece now sits on a warm-neutral square tile
 * with the product hero-shot centred and contained inside generous
 * padding — no card wrapper, no shadow, no rounded corners on the
 * image area. Below the tile sits the bare minimum: serif name + small
 * caps category. Nothing else.
 *
 * Two reasons:
 *  - The card+shadow language was reading as e-commerce, not maison.
 *  - The earlier object-cover frame was cropping every piece in half.
 *    object-contain on a warm-paper tile shows the FULL piece, and
 *    because the tile colour matches the section background there's no
 *    "white side gap" to worry about.
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
          // Van Cleef grid: tight gap, three across on desktop, two on
          // tablet, one on mobile. No rounded card, no shadow.
          <div className="grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {filtered.map((product, i) => (
              <ScrollReveal
                key={product.slug}
                delay={Math.min(0.5, (i % 6) * 0.08)}
              >
                <TreasureTile product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────── Van Cleef-style museum tile ────────────────── */

function TreasureTile({ product }: { product: Product }) {
  return (
    <Link
      href={`/treasures/${product.slug}`}
      aria-label={`${product.name} — ${product.category}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {/* Square warm-neutral tile. Same warm tone as the section bg so
          the tile reads as the page itself, not a card with edges.
          object-contain + generous padding so the FULL piece is visible
          with breathing room — no cropping, no half-pieces. */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f6f2eb]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
          className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.04] md:p-10"
        />
      </div>

      {/* Minimal foot — name + category. No tagline, no badge, no CTA.
          Whitespace and serif type carry the weight. */}
      <div className="mt-6 text-center">
        <h3 className="font-serif text-xl font-light leading-tight text-foreground transition-colors group-hover:text-primary md:text-[1.4rem]">
          {product.name}
        </h3>
        <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {product.category}
        </p>
      </div>
    </Link>
  );
}