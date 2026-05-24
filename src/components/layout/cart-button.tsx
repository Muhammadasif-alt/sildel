"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import { selectCartCount, selectCartHydrated } from "@/lib/store/cart-slice";
import { cn } from "@/lib/utils";

export function CartButton({ className }: { className?: string }) {
  const count = useAppSelector(selectCartCount);
  const hydrated = useAppSelector(selectCartHydrated);

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-primary transition-colors",
        className
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      <span
        aria-hidden
        className={cn(
          "absolute top-2 right-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium transition-all",
          hydrated && count > 0
            ? "bg-primary text-primary-foreground scale-100"
            : "bg-primary/60 text-primary-foreground scale-90"
        )}
      >
        {hydrated ? count : 0}
      </span>
    </Link>
  );
}
