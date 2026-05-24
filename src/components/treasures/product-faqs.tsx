"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductFaq } from "@/content/product-extras";

type Props = {
  faqs: ProductFaq[];
  /** Index opened by default, or null for all collapsed. */
  defaultOpen?: number | null;
};

export function ProductFaqs({ faqs, defaultOpen = 0 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <ul className="divide-y divide-border/60 rounded-sm border border-border bg-card">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              className={cn(
                "w-full flex items-center justify-between gap-6 px-5 py-5 lg:px-7 lg:py-6 text-left",
                "transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:bg-muted/50",
              )}
            >
              <span className="font-serif text-lg lg:text-xl text-foreground leading-snug">
                {faq.q}
              </span>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                  open
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground",
                )}
              >
                {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              hidden={!open}
              className="px-5 lg:px-7 pb-6 lg:pb-7 -mt-1"
            >
              <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">
                {faq.a}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}