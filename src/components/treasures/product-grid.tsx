"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  isWideTreasure,
  type Product,
} from "@/content/treasures";
import { useTreasures } from "@/content/treasures-provider";

/**
 * Treasures index — magazine-style layout inspired by the old sildel.pt
 *
 * Pattern (per Isabel's feedback): products marked as "wide" in the catalog
 * get a full-width row with the name large beside the image. Everything else
 * pairs up two-per-row. Pagination is dropped — visitors scroll the whole
 * collection in one column, which matches the old site and reads more
 * like a magazine than a search results page.
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

  // Pre-bake the row pattern: wide products take a row alone, narrow
  // products pair up. If a narrow product has no narrow neighbour to its
  // right, it occupies a full row too.
  const rows = useMemo<Product[][]>(() => {
    const out: Product[][] = [];
    let i = 0;
    while (i < filtered.length) {
      const cur = filtered[i];
      if (isWideTreasure(cur.slug)) {
        out.push([cur]);
        i++;
        continue;
      }
      const next = filtered[i + 1];
      if (next && !isWideTreasure(next.slug)) {
        out.push([cur, next]);
        i += 2;
      } else {
        out.push([cur]);
        i++;
      }
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
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
            {rows.map((row, rowIdx) =>
              row.length === 1 ? (
                <WideRow
                  key={row[0].slug}
                  product={row[0]}
                  // Alternate label side on full-width rows so consecutive
                  // wide pieces feel composed rather than stacked.
                  labelSide={rowIdx % 2 === 0 ? "right" : "left"}
                />
              ) : (
                <PairRow key={row.map((r) => r.slug).join("-")} pair={row} />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────── Wide (single-column) row ────────────────── */

function WideRow({
  product,
  labelSide,
}: {
  product: Product;
  labelSide: "left" | "right";
}) {
  return (
    <Link
      href={`/treasures/${product.slug}`}
      aria-label={`${product.name} — ${product.tagline}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {/* Card frame — soft tonal background + hairline border so the
          image + text below clearly belong together. */}
      <article className="rounded-md border border-border/60 bg-card/60 p-6 md:p-10 lg:p-14 transition-all duration-500 ease-out group-hover:border-foreground/40 group-hover:bg-card/80">
        <div
          className={cn(
            "flex flex-col items-center gap-8 md:gap-12 lg:gap-16",
            labelSide === "left" ? "md:flex-row-reverse" : "md:flex-row",
          )}
        >
          <div className="relative w-full md:w-2/3 aspect-[16/10] overflow-hidden bg-white rounded-sm">
            <Image
              src={product.image}
              alt={`${product.name} — ${product.tagline}`}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-contain transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]"
            />
          </div>

          <div
            className={cn(
              "w-full md:w-1/3",
              labelSide === "left" ? "md:text-right" : "md:text-left",
            )}
          >
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-foreground">
              {product.name}
            </h3>
            {product.badge && (
              <p className="mt-4 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                {product.badge}
              </p>
            )}
            <p className="mt-6 text-base text-muted-foreground">
              {product.tagline}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ────────────────── Paired (two-column) row ────────────────── */

function PairRow({ pair }: { pair: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
      {pair.map((product) => (
        <Link
          key={product.slug}
          href={`/treasures/${product.slug}`}
          aria-label={`${product.name} — ${product.tagline}`}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          {/* Card frame — same treatment as wide rows so the listing
              reads as a single visual rhythm. */}
          <article className="h-full rounded-md border border-border/60 bg-card/60 p-6 md:p-8 transition-all duration-500 ease-out group-hover:border-foreground/40 group-hover:bg-card/80">
            <div className="relative aspect-square w-full overflow-hidden bg-white rounded-sm">
              <Image
                src={product.image}
                alt={`${product.name} — ${product.tagline}`}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-contain transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
              />
            </div>

            <div className="mt-8 text-center">
              <h3 className="font-serif text-3xl md:text-4xl font-light leading-tight text-foreground">
                {product.name}
              </h3>
              {product.badge && (
                <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  {product.badge}
                </p>
              )}
              <p className="mt-3 text-sm text-muted-foreground">
                {product.tagline}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}