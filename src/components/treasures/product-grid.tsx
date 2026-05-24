"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            {data.eyebrow}
          </p>
          <h2
            id="product-grid-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]"
          >
            {data.title}{" "}
            <span className="italic text-primary">{data.titleAccent}</span>
          </h2>
          <div className="mx-auto h-px w-16 bg-primary/60 my-8" aria-hidden />
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {data.body}
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-12 lg:mb-14"
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
                  "inline-flex items-center gap-2 rounded-sm border px-5 py-2.5 transition-all duration-300",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "inline-block size-1.5 rounded-full",
                    active ? "bg-primary-foreground" : "bg-primary/60"
                  )}
                />
                <span className="text-[10px] tracking-[0.3em] uppercase font-medium whitespace-nowrap">
                  {cat.label}
                </span>
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
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {paged.map((item, i) => {
                const globalIndex = (safePage - 1) * PAGE_SIZE + i + 1;
                return (
                  <li
                    key={item.slug}
                    className={cn(i % 3 === 1 && "lg:mt-12")}
                  >
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
      className="mt-14 lg:mt-16 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={cn(
          "inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 transition-all",
          "border-border bg-card text-foreground hover:border-primary hover:text-primary",
          "disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground disabled:cursor-not-allowed",
        )}
        aria-label="Previous page"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Prev</span>
      </button>

      <ul className="flex items-center gap-2" role="list">
        {pages.map((p, i) =>
          p === "…" ? (
            <li
              key={`gap-${i}`}
              aria-hidden
              className="px-2 text-muted-foreground select-none"
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
                  "inline-flex h-10 min-w-10 items-center justify-center rounded-sm border px-3 text-sm font-medium transition-all",
                  p === page
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
                )}
              >
                {p}
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
          "inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 transition-all",
          "border-border bg-card text-foreground hover:border-primary hover:text-primary",
          "disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground disabled:cursor-not-allowed",
        )}
        aria-label="Next page"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Next</span>
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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [errored, setErrored] = useState(false);

  return (
    <Link
      href={`/treasures/${product.slug}`}
      aria-label={`${product.name} — ${product.tagline}`}
      className={cn(
        "group relative block overflow-hidden rounded-sm border border-border bg-card",
        "transition-all duration-300",
        "hover:border-primary hover:shadow-2xl hover:shadow-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 z-20 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {errored ? (
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-secondary)_0%,_var(--color-muted)_55%,_var(--color-background)_100%)]"
            role="img"
            aria-label={product.name}
          />
        ) : (
          <Image
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            onError={() => setErrored(true)}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/15 transition-colors duration-500"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"
        />

        {/* Category pill */}
        <span className="absolute top-5 left-5 inline-flex items-center bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 text-[10px] tracking-[0.3em] uppercase rounded-sm">
          {product.category}
        </span>

        {/* Badge / Number pill */}
        {product.badge ? (
          <span className="absolute top-5 right-5 inline-flex items-center bg-primary text-primary-foreground px-3 py-1 text-[10px] tracking-[0.3em] uppercase rounded-sm">
            {product.badge}
          </span>
        ) : (
          <span className="absolute top-5 right-5 inline-flex items-center bg-foreground/80 text-background backdrop-blur-sm px-3 py-1 text-[10px] tracking-[0.3em] uppercase rounded-sm">
            № {String(index).padStart(2, "0")}
          </span>
        )}

        {/* Hover reveal: View button */}
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-[10px] tracking-[0.3em] uppercase font-medium rounded-sm">
            View
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      <div className="p-5 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-2xl lg:text-3xl font-light leading-tight text-foreground">
              {product.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {product.tagline}
            </p>
          </div>
          <ArrowUpRight
            aria-hidden
            className="mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>

        <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="font-serif text-xl text-primary">
            {formatPrice(product.priceCents, product.currency)}
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Signed & numbered
          </span>
        </div>
      </div>
    </Link>
  );
}
