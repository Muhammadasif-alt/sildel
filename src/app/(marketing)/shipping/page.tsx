import { buildMetadata } from "@/lib/seo";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { getPageBlocks } from "@/lib/content/page-blocks";
import { LegalPage } from "@/components/legal/legal-page";
import { getShipping } from "@/content/legal";
import { getLocale } from "@/lib/i18n/get-locale";

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
  const locale = await getLocale();
  const isPt = locale === "pt";
  return (
    <LegalPage
      doc={getShipping(locale)}
      heroImage="/products/ALEXIS_MV_1032-89d7df8a82.webp"
      heroAlt={
        isPt
          ? "Pilhas de cortiça portuguesa a curar ao ar livre, prontas para envio."
          : "Stacks of Portuguese cork curing in the open air, ready to be shipped."
      }
      closingCta={{
        eyebrow: isPt ? "Precisa de ajuda?" : "Need a hand?",
        body: isPt
          ? "A nossa equipa responde a todas as perguntas sobre envio em menos de 24 horas, dias úteis."
          : "Our team answers every shipping enquiry within one working day.",
        label: isPt ? "Falar com o atelier" : "Talk to the atelier",
        href: "/contact",
      }}
    />
  );
}
