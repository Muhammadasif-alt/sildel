import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import {
  buildMetadata,
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ReduxProvider } from "@/lib/store/provider";
import { getLocale } from "@/lib/i18n/get-locale";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  // We only render Playfair at 400 (regular) and 500 (medium) across the
  // whole site — `font-light` (300) doesn't exist in Playfair so it falls
  // back to 400 anyway. Loading 600/700/800 was a ~75KB hit for fonts we
  // never use.
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  // White + Gold theme — OS chrome (mobile status bar etc) matches the warm
  // white canvas on first paint.
  themeColor: "#FBFAF8",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = (await headers()).get("x-sildel-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");
  // Home is the only route with a full-bleed hero behind the (now-fixed)
  // header. Every other route needs top padding equal to the header height
  // so its first section doesn't disappear under the floating chrome.
  const isHome = pathname === "/" || pathname === "";
  const needsHeaderOffset = !isAdmin && !isHome;
  const locale = await getLocale();
  const htmlLang = locale === "pt" ? "pt-PT" : "en-US";

  return (
    <html
      lang={htmlLang}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to the origins we actually hit on first paint —
            faster TTFB for fonts + the YouTube brand video embed.
            Real CWV win, not just a vanity tag. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ReduxProvider>
          {!isAdmin && <SiteHeader />}
          <div
            className={
              needsHeaderOffset
                ? "flex flex-1 flex-col pt-20 md:pt-24"
                : "flex flex-1 flex-col"
            }
          >
            {children}
          </div>
          {!isAdmin && <SiteFooter />}
          {!isAdmin && <WhatsAppFloat locale={locale} />}
        </ReduxProvider>
        {/* JSON-LD — search bots read these whether they're inline or
            deferred. `afterInteractive` keeps them out of the critical
            path so hydration finishes a few ms sooner. */}
        <Script
          id="sildel-organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script
          id="sildel-localbusiness-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(localBusinessJsonLd)}
        </Script>
        <Script
          id="sildel-website-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(websiteJsonLd)}
        </Script>
      </body>
    </html>
  );
}
