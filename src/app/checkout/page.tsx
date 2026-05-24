import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CheckoutPageClient } from "@/components/checkout/checkout-page";
import { getLocale } from "@/lib/i18n/get-locale";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your Sildel order — billing details and payment.",
  path: "/checkout",
  noIndex: true,
});

export default async function CheckoutPage() {
  const locale = await getLocale();
  return <CheckoutPageClient locale={locale} />;
}
