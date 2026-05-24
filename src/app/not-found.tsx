import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = {
  title: "Page not found — Sildel",
  description: "The page you're looking for can't be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <ComingSoon
      eyebrow="404"
      title="A page that"
      titleAccent="lost its way."
      body="We can't find the page you were looking for. It may have been moved, retired, or it never existed. Try one of these instead."
      primaryCta={{ label: "Back to Home", href: "/" }}
      secondaryCta={{ label: "Explore Treasures", href: "/treasures" }}
    />
  );
}
