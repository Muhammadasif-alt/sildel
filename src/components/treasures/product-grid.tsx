"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/content/treasures";
import { useTreasures } from "@/content/treasures-provider";

/**
 * Treasures index — uniform 3-column rounded card grid.
 *
 * Founder direction (June 2026): match the home page Shop Categories
 * design language — rounded-2xl cards, shadow, name + tagline below,
 * no button. Wider cards (aspect 5:4) so each piece reads bigger on
 * desktop without making the page feel cramped.
 *
 * The earlier magazine-style layout (wide rows for long pieces, paired
 * rows otherwise) is retired — every piece now uses the same card so
 * the listing reads as one calm rhythm.
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
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-20 lg:mb-24"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map((product) => (
              <TreasureCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────── Uniform treasure card ────────────────── */

function TreasureCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/treasures/${product.slug}`}
      aria-label={`${product.name} — ${product.tagline}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_10px_36px_-10px_rgba(0,0,0,0.22)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_72px_-16px_rgba(0,0,0,0.32)]">
        {/* Image — wider 5:4 frame so the piece reads bigger on desktop.
            Studio shots use object-contain on the existing white bg, so
            the product is always shown whole (never cropped). */}
        <div className="relative aspect-[5/4] w-full overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
            className="object-contain transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* Foot — name + small tagline, no button. */}
        <div className="flex flex-1 flex-col px-6 py-7 md:px-8 md:py-8">
          <h3 className="font-serif text-2xl font-light leading-tight text-foreground md:text-3xl">
            {product.name}
          </h3>
          {product.badge && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              {product.badge}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            {product.tagline}
          </p>
        </div>
      </article>
    </Link>
  );
}