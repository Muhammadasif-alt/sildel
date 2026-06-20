import { buildMetadata } from "@/lib/seo";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { getPageBlocks } from "@/lib/content/page-blocks";
import { LegalPage } from "@/components/legal/legal-page";
import { getTerms } from "@/content/legal";
import { getLocale } from "@/lib/i18n/get-locale";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The general conditions of sale that govern your use of sildel.pt and any treasure ordered from us.",
  path: "/terms",
  noIndex: true,
});

export default async function TermsPage() {
  const blocks = await getPageBlocks("terms");
  if (blocks.length > 0) {
    return (
      <main className="flex flex-col flex-1">
        <BlocksRenderer pageKey="terms" />
      </main>
    );
  }
  const locale = await getLocale();
  return (
    <LegalPage
      doc={getTerms(locale)}
      heroImage="/products/EQUILIBRIUM_Equilibrium_Gibraltar_foto-ambiente-d561909279.webp"
      heroAlt={
        locale === "pt"
          ? "Atelier Sildel em Esmoriz — interior ao pôr-do-sol."
          : "Sildel atelier in Esmoriz — interior at golden hour."
      }
    />
  );
}
