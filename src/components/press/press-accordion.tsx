import Image from "next/image";
import type { PressFeature } from "@/content/press";

/**
 * Press accordion — mirrors the live sildel.pt /press layout: a
 * vertical list of expandable rows, each labelled "PUBLICATION |
 * DATE". Expanding a row reveals the magazine spread Sildel was
 * featured in.
 *
 * Native <details>/<summary> so the accordion works without JS, plays
 * nicely with search engines (the spreads are crawlable), and honours
 * keyboard navigation for free.
 */
export function PressAccordion({
  features,
  closeLabel,
}: {
  features: PressFeature[];
  closeLabel: string;
}) {
  return (
    <ul className="divide-y divide-border/60 border-y border-border/60">
      {features.map((f) => (
        <li key={f.id}>
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left text-[11px] uppercase tracking-[0.32em] text-foreground transition-colors hover:text-primary md:text-xs [&::-webkit-details-marker]:hidden">
              <span>
                {f.publication}
                <span className="mx-3 text-foreground/40">|</span>
                {f.date}
              </span>
              <span
                aria-hidden
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-primary transition-transform group-open:rotate-45"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="pb-10 pt-2">
              <div className="group/spread relative mx-auto aspect-[4/5] w-full max-w-3xl overflow-hidden bg-muted md:aspect-[16/10]">
                <Image
                  src={f.spread}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-contain transition-transform duration-[1400ms] ease-out group-hover/spread:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-center text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                {closeLabel}
              </p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}