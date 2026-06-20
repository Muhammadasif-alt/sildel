"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/treasures";
import { useTreasures } from "@/content/treasures-provider";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Treasures index — editorial magazine rhythm.
 *
 * Founder direction (June 2026, fifth pass): client wants the catalogue
 * to read like a printed feature — BIG images, with some pieces given
 * a full-width spread and others paired two-up. Every block of three
 * products renders as one hero single + one paired row.
 *
 *   [          FULL-WIDTH HERO          ]      (item 1)
 *   [  PAIR ITEM 2  ][  PAIR ITEM 3  ]
 *   [          FULL-WIDTH HERO          ]      (item 4)
 *   [  PAIR ITEM 5  ][  PAIR ITEM 6  ]
 *   ...
 *
 * No card wrapper, no rounded card frame, no shadow — image at full
 * bleed with plain inline name + category + arrow beneath.
 *
 * Founder direction (June 2026, fourteenth pass): the category filter
 * row was removed ("yh b khtm kr do") — small catalogue, the magazine
 * flow itself is the navigation. State + useMemo deleted with it.
 * Kept as a client component because the `useTreasures` provider
 * context is client-only.
 */
export function ProductGrid() {
  const { products } = useTreasures();

  const blocks: Array<{ single: Product; pair: Product[] }> = [];
  for (let i = 0; i < products.length; i += 3) {
    blocks.push({
      single: products[i],
      pair: [products[i + 1], products[i + 2]].filter(
        (p): p is Product => Boolean(p),
      ),
    });
  }

  return (
    <section
      id="product-grid"
      className="relative w-full bg-background"
      aria-label="Treasures catalogue"
    >
      <div className="w-full px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
        {products.length === 0 ? (
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
      {/* Big bold full-bleed hero tile, 4:3 portrait-friendly ratio so
          1920×2880 studio shots breathe before object-cover crops them. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="100vw"
          className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]"
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
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 48vw, 100vw"
          className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
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