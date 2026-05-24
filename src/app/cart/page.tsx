import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CartPageClient } from "@/components/cart/cart-page";
import { getLocale } from "@/lib/i18n/get-locale";

export const metadata: Metadata = buildMetadata({
  title: "Cart",
  description: "Review your Sildel treasures and proceed to checkout.",
  path: "/cart",
  noIndex: true,
});

export default async function CartPage() {
  const locale = await getLocale();
  return <CartPageClient locale={locale} />;
}
