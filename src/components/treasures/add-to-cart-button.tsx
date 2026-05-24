"use client";

import { useState, useTransition } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addItem } from "@/lib/store/cart-slice";
import { cn } from "@/lib/utils";

type Labels = {
  addToCart: string;
  added: string;
};

type Props = {
  slug: string;
  name: string;
  priceCents: number;
  image: string;
  labels?: Labels;
};

export function AddToCartButton({ slug, name, priceCents, image, labels }: Props) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [, startTransition] = useTransition();

  function handleAdd() {
    startTransition(() => {
      dispatch(addItem({ slug, name, priceCents, image, quantity }));
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    });
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Quantity stepper */}
      <div
        className="inline-flex items-center rounded-sm border border-border bg-card"
        role="group"
        aria-label="Quantity"
      >
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="inline-flex h-12 w-12 items-center justify-center text-foreground hover:text-primary transition-colors disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-3 min-w-10 text-center text-sm font-medium tabular-nums">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          disabled={quantity >= 99}
          className="inline-flex h-12 w-12 items-center justify-center text-foreground hover:text-primary transition-colors disabled:opacity-40"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "group relative inline-flex items-center justify-center gap-3 px-7 py-4",
          "rounded-sm text-xs tracking-[0.35em] uppercase font-medium",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          justAdded
            ? "bg-primary/90 text-primary-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        aria-live="polite"
      >
        {justAdded ? (
          <>
            <Check className="h-4 w-4" />
            {labels?.added ?? "Added ✓"}
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            {labels?.addToCart ?? "Add to cart"}
          </>
        )}
      </button>
    </div>
  );
}
