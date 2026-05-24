import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { SuccessPageClient } from "@/components/checkout/success-page";
import { getLocale } from "@/lib/i18n/get-locale";

export const metadata: Metadata = buildMetadata({
  title: "Order placed",
  description: "Thank you — your Sildel order has been placed.",
  path: "/checkout/success",
  noIndex: true,
});

export default async function CheckoutSuccessPage() {
  const locale = await getLocale();
  return (
    <Suspense fallback={null}>
      <SuccessPageClient locale={locale} />
    </Suspense>
  );
}
