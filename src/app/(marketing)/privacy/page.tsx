import { buildMetadata } from "@/lib/seo";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { getPageBlocks } from "@/lib/content/page-blocks";
import { LegalPage } from "@/components/legal/legal-page";
import { getPrivacy } from "@/content/legal";
import { getLocale } from "@/lib/i18n/get-locale";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Sildel handles your data, your inbox, and your trust — and our cookies policy.",
  path: "/privacy",
  noIndex: true,
});

export default async function PrivacyPage() {
  const blocks = await getPageBlocks("privacy");
  if (blocks.length > 0) {
    return (
      <main className="flex flex-col flex-1">
        <BlocksRenderer pageKey="privacy" />
      </main>
    );
  }
  const locale = await getLocale();
  return (
    <LegalPage
      doc={getPrivacy(locale)}
      heroImage="/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp"
      heroAlt={
        locale === "pt"
          ? "Porta envelhecida do atelier Sildel ao pôr-do-sol."
          : "Weathered Sildel atelier doorway at golden hour."
      }
    />
  );
}
