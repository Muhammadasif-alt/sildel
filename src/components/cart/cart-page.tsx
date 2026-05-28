"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Lock,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartSubtotalCents,
  selectCartHydrated,
} from "@/lib/store/cart-slice";
import { formatPrice } from "@/content/treasures";
import { cn } from "@/lib/utils";
import { getUi } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";

export function CartPageClient({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotalCents);
  const hydrated = useAppSelector(selectCartHydrated);
  const dispatch = useAppDispatch();
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  function applyCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!coupon.trim()) {
      setCouponMessage(null);
      return;
    }
    setCouponMessage(ui.cart.couponNotRecognized(coupon.trim()));
  }

  if (!hydrated) {
    return (
      <main className="flex flex-1 flex-col">
        <div className="mx-auto max-w-[1480px] w-full px-6 lg:px-12 py-16">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
            {ui.common.loading}
          </p>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 lg:py-32 text-center">
        <ShoppingBag className="h-12 w-12 text-primary/60 mb-8" strokeWidth={1.2} />

        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
          {ui.cart.eyebrow}
        </p>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-2">
          {ui.cart.emptyHeadline1}
        </h1>
        <h2 className="font-serif italic text-primary text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-10">
          {ui.cart.emptyHeadline2}
        </h2>

        <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
          {ui.cart.emptyBody}
        </p>

        <Link href="/treasures" className="group inline-flex items-center gap-3">
          <span className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-4 text-xs tracking-[0.35em] uppercase font-medium rounded-sm transition-colors group-hover:bg-primary/90">
            {ui.cart.emptyCta}
          </span>
        </Link>
      </main>
    );
  }

  const totalPieces = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-12 py-12 lg:py-20">
        <div className="mb-10 lg:mb-14">
          <Link
            href="/treasures"
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {ui.cart.summary.continueShopping}
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
            {ui.cart.title}
          </h1>
          <p className="mt-2 text-sm tracking-wider text-muted-foreground">
            {ui.cart.treasure(items.length)} — {ui.cart.pieces(totalPieces)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.slug}
                  className={cn(
                    "group relative flex flex-col sm:flex-row gap-5 sm:gap-6 rounded-sm border border-border bg-card",
                    "p-5 lg:p-6 transition-all duration-300",
                    "hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/5",
                  )}
                >
                  <Link
                    href={`/treasures/${item.slug}`}
                    className="group/img relative aspect-square w-full sm:w-32 lg:w-36 shrink-0 overflow-hidden rounded-sm bg-white ring-1 ring-border/60"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
                    />
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 144px, 128px"
                      className="object-contain p-3 transition-transform duration-500 group-hover/img:scale-105"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/treasures/${item.slug}`}
                        className="font-serif text-xl lg:text-2xl text-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs tracking-[0.25em] uppercase text-muted-foreground">
                        {ui.cart.signedNumbered}
                      </p>
                      <p className="mt-2 font-serif text-base text-primary sm:hidden">
                        {formatPrice(item.priceCents)}
                      </p>
                    </div>

                    <div
                      className="inline-flex items-center rounded-sm border border-border bg-background"
                      role="group"
                      aria-label={`${ui.cart.item.quantity} — ${item.name}`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              slug: item.slug,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center text-foreground hover:text-primary transition-colors"
                        aria-label="−"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-2 min-w-7 text-center text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              slug: item.slug,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center text-foreground hover:text-primary transition-colors"
                        aria-label="+"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="hidden sm:block text-right min-w-32">
                      <span className="font-serif text-xl text-foreground">
                        {formatPrice(item.priceCents * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                          {formatPrice(item.priceCents)} {ui.cart.each}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => dispatch(removeItem({ slug: item.slug }))}
                      aria-label={`${ui.cart.item.remove} — ${item.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <form
              onSubmit={applyCoupon}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <label htmlFor="coupon" className="sr-only">
                {ui.cart.summary.couponPlaceholder}
              </label>
              <input
                id="coupon"
                type="text"
                placeholder={ui.cart.summary.couponPlaceholder}
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 px-4 py-3 rounded-sm border border-border bg-background text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-5 py-3 text-xs tracking-[0.3em] uppercase font-medium rounded-sm border border-border bg-card hover:border-primary hover:text-primary transition-colors"
              >
                {ui.cart.summary.couponApply}
              </button>
            </form>
            {couponMessage && (
              <p role="status" className="mt-3 text-sm text-muted-foreground">
                {couponMessage}
              </p>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-sm border border-border bg-card p-6 lg:p-8">
              <h2 className="font-serif text-2xl text-foreground mb-6">
                {ui.cart.summary.title}
              </h2>

              <dl className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">
                    {ui.cart.summary.subtotal}
                  </dt>
                  <dd className="font-serif text-lg text-foreground">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-sm text-muted-foreground inline-flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {ui.cart.summary.shipping}
                  </dt>
                  <dd className="text-sm text-right text-foreground">
                    <span className="font-medium text-primary">
                      {ui.cart.summary.shippingFree}
                    </span>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {ui.cart.shippingNote}
                    </p>
                  </dd>
                </div>
              </dl>

              <div className="flex items-baseline justify-between mb-8">
                <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  {ui.cart.summary.total}
                </span>
                <span className="font-serif text-3xl text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="group inline-flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-5 text-xs tracking-[0.35em] uppercase font-medium rounded-sm transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                <Lock className="h-4 w-4" />
                {ui.cart.summary.proceedToCheckout}
              </Link>

              <p className="mt-4 text-[11px] tracking-wider text-muted-foreground text-center">
                {ui.cart.secureCheckoutNote}
              </p>

              {/* Trust badges */}
              <ul className="mt-8 pt-6 border-t border-border/60 grid grid-cols-3 gap-3">
                <li className="flex flex-col items-center gap-2 text-center">
                  <Award className="h-5 w-5 text-primary" aria-hidden />
                  <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground leading-snug">
                    {ui.cart.signedNumbered}
                  </span>
                </li>
                <li className="flex flex-col items-center gap-2 text-center">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden />
                  <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground leading-snug">
                    Portugal
                  </span>
                </li>
                <li className="flex flex-col items-center gap-2 text-center">
                  <Truck className="h-5 w-5 text-primary" aria-hidden />
                  <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground leading-snug">
                    {ui.cart.summary.shippingFree}
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
