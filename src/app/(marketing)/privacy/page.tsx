import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/common/coming-soon";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { getPageBlocks } from "@/lib/content/page-blocks";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Sildel handles your data, your inbox, and your trust.",
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
  return (
    <ComingSoon
      eyebrow="Privacy"
      title="Your data,"
      titleAccent="our promise."
      body="We are finalizing the full privacy policy. We respect your inbox and your information — we share neither, and we keep only what is necessary to ship your treasures."
      primaryCta={{ label: "Contact us", href: "/contact" }}
      secondaryCta={{ label: "Terms of Service", href: "/terms" }}
    />
  );
}
