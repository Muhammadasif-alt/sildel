"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/content/treasures";
import { useTreasures } from "@/content/treasures-provider";

const PAGE_SIZE = 6;

export function ProductGrid() {
  const { content, products } = useTreasures();
  const data = content.products;
  const categories = content.categories.items;
  const [activeSlug, setActiveSlug] = useState<string>("all");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo<Product[]>(() => {
    if (activeSlug === "all") return products;
    return products.filter(
      (p) => p.category.toLowerCase() === activeSlug.replace(/-/g, " ")
    );
  }, [activeSlug, products]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [activeSlug]);

  function goToPage(next: number) {
    const clamped = Math.max(1, Math.min(totalPages, next));
    setPage(clamped);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section
      id="product-grid"
      className="relative w-full bg-background"
      aria-labelledby="product-grid-heading"
    >
      <div ref={topRef} className="mx-auto max-w-[1480px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
            {data.eyebrow}
          </p>
          <h2
            id="product-grid-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1]"
          >
            {data.title}{" "}
            <span className="italic">{data.titleAccent}</span>
          </h2>
          <p className="mt-8 text-muted-foreground text-base md:text-lg leading-relaxed">
            {data.body}
          </p>
        </div>

        {/* Filter tabs — minimal underline style */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-10 mb-16 lg:mb-20"
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
                  "relative pb-2 text-[11px] tracking-[0.32em] uppercase transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 right-0 -bottom-0.5 h-px bg-foreground transition-opacity",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            No treasures in this collection yet.
          </p>
        ) : (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
              {paged.map((item, i) => {
                const globalIndex = (safePage - 1) * PAGE_SIZE + i + 1;
                return (
                  <li key={item.slug}>
                    <ProductCard product={item} index={globalIndex} />
                  </li>
                );
              })}
            </ul>

            {totalPages > 1 && (
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onChange={goToPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ────────────────── Pagination ────────────────── */

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (n: number) => void;
}) {
  const pages = useMemo(() => buildPageList(page, totalPages), [page, totalPages]);

  return (
    <nav
      aria-label="Pagination"
      className="mt-20 lg:mt-24 flex items-center justify-center gap-6 md:gap-8"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={cn(
          "inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-muted-foreground transition-colors",
          "hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground disabled:cursor-not-allowed",
        )}
        aria-label="Previous page"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Prev</span>
      </button>

      <ul className="flex items-center gap-5" role="list">
        {pages.map((p, i) =>
          p === "…" ? (
            <li
              key={`gap-${i}`}
              aria-hidden
              className="text-muted-foreground/60 select-none"
            >
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onChange(p)}
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  "relative text-sm transition-colors",
                  p === page
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
                {p === page && (
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 -bottom-1.5 h-px bg-foreground"
                  />
                )}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={cn(
          "inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-muted-foreground transition-colors",
          "hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground disabled:cursor-not-allowed",
        )}
        aria-label="Next page"
      >
        <span>Next</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

function ProductCard({ product }: { product: Product; index: number }) {
  const [errored, setErrored] = useState(false);

  return (
    <Link
      href={`/treasures/${product.slug}`}
      aria-label={`${product.name} — ${product.tagline}`}
      className={cn(
        "group block",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {errored ? (
          <div
            className="absolute inset-0 bg-muted"
            role="img"
            aria-label={product.name}
          />
        ) : (
          <Image
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            onError={() => setErrored(true)}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="pt-6 lg:pt-8 flex items-baseline justify-between gap-6">
        <div className="min-w-0">
          <h3 className="font-serif text-2xl lg:text-3xl font-light leading-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.tagline}
          </p>
        </div>
        <span className="font-serif text-lg lg:text-xl text-foreground shrink-0">
          {formatPrice(product.priceCents, product.currency)}
        </span>
      </div>
    </Link>
  );
}
