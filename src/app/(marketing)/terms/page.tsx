import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/common/coming-soon";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { getPageBlocks } from "@/lib/content/page-blocks";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern your use of sildel.pt and any treasure ordered from us.",
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
  return (
    <ComingSoon
      eyebrow="Legal"
      title="Terms"
      titleAccent="of Service."
      body="Our full terms of service are being finalized. In the meantime, please contact us for any questions about your treasure or order."
      primaryCta={{ label: "Contact us", href: "/contact" }}
      secondaryCta={{ label: "Privacy Policy", href: "/privacy" }}
    />
  );
}
