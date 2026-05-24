"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Mail } from "lucide-react";
import { formatPrice } from "@/content/treasures";
import { getUi } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";

type LastOrder = {
  orderNumber: string;
  email: string;
  totalCents: number;
  paymentMethod: "paypal" | "multibanco" | "cod";
  placedAt: string;
};

export function SuccessPageClient({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const params = useSearchParams();
  const fallbackOrder = params.get("order") ?? null;
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("sildel-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24 lg:py-32">
      <section className="max-w-2xl text-center">
        <div className="mx-auto mb-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
          <Check className="h-9 w-9" strokeWidth={2.2} />
        </div>

        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
          {ui.checkout.success.eyebrow}
        </p>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-2">
          {ui.checkout.success.title}
        </h1>
        <h2 className="font-serif italic text-primary text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-10">
          {ui.checkout.success.titleAccent}
        </h2>

        <div className="mx-auto h-px w-16 bg-primary/60 mb-8" aria-hidden />

        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
          {ui.checkout.success.body}
        </p>

        {(order || fallbackOrder) && (
          <div className="mx-auto max-w-md rounded-sm border border-border bg-card p-6 lg:p-8 mb-10 text-left">
            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                  {ui.checkout.success.orderNumber}
                </dt>
                <dd className="font-serif text-foreground tabular-nums">
                  {order?.orderNumber ?? fallbackOrder}
                </dd>
              </div>
              {order?.email && (
                <div className="flex items-center justify-between">
                  <dt className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground inline-flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    {ui.checkout.success.email}
                  </dt>
                  <dd className="text-foreground">{order.email}</dd>
                </div>
              )}
              {order?.paymentMethod && (
                <div className="flex items-center justify-between">
                  <dt className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                    {ui.checkout.success.payment}
                  </dt>
                  <dd className="text-foreground">
                    {ui.checkout.payment[order.paymentMethod].label}
                  </dd>
                </div>
              )}
              {typeof order?.totalCents === "number" && (
                <div className="flex items-baseline justify-between pt-4 border-t border-border">
                  <dt className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                    {ui.checkout.success.total}
                  </dt>
                  <dd className="font-serif text-2xl text-foreground">
                    {formatPrice(order.totalCents)}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/treasures"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-4 text-xs tracking-[0.35em] uppercase font-medium rounded-sm hover:bg-primary/90 transition-colors"
          >
            {ui.checkout.success.browseMore}
          </Link>
          <Link
            href="/"
            className="text-xs tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors border-b border-primary/40 hover:border-primary pb-1"
          >
            {ui.checkout.success.backHome}
          </Link>
        </div>
      </section>
    </main>
  );
}
