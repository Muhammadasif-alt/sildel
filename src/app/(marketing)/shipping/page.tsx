import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/common/coming-soon";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { getPageBlocks } from "@/lib/content/page-blocks";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Shipping — Free Worldwide on Every Sildel Treasure",
  description:
    "Free worldwide shipping on every Sildel treasure — hand-packed and dispatched from our Esmoriz, Portugal atelier with full tracking and insurance.",
  path: "/shipping",
  keywords: [
    // Free shipping
    "free worldwide shipping",
    "envio gratuito mundial",
    "free shipping cork art",
    "envio grátis cortiça",
    // Origin
    "ships from Portugal",
    "envio desde Portugal",
    "shipped from Esmoriz",
    "envio Esmoriz",
    // Process
    "tracked shipping",
    "envio rastreável",
    "insured shipping cork",
    "envio seguro cortiça",
    "Sildel shipping policy",
    "política envio Sildel",
    // Markets
    "ship cork to EU",
    "envio cortiça UE",
    "ship cork to USA",
    "envio cortiça EUA",
    "international cork shipping",
    "envio internacional cortiça",
  ],
});

export default async function ShippingPage() {
  const blocks = await getPageBlocks("shipping");
  if (blocks.length > 0) {
    return (
      <main className="flex flex-col flex-1">
        <BlocksRenderer pageKey="shipping" />
      </main>
    );
  }
  return (
    <ComingSoon
      eyebrow="Shipping"
      title="Free shipping,"
      titleAccent="worldwide."
      body="Every Sildel treasure ships free, anywhere in the world. Each piece is hand-packed in our Portuguese atelier and dispatched with full tracking and insurance. Detailed shipping policy coming soon."
      primaryCta={{ label: "See the Collection", href: "/treasures" }}
      secondaryCta={{ label: "Contact us", href: "/contact" }}
    />
  );
}
