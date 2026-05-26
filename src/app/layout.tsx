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
  // Dark is the default theme — set the OS chrome (mobile status bar etc)
  // to match so the page never flashes a light bar over a black surface.
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

// Default theme is DARK (per founder direction). The "dark" class is applied
// to <html> immediately, before paint, unless the user has previously opted
// into the light theme. This avoids a flash of light theme on first paint.
const noFlashScript = `
(function(){try{
  var t=localStorage.getItem('sildel-theme');
  if(t!=='light')document.documentElement.classList.add('dark');
}catch(e){document.documentElement.classList.add('dark');}})();
`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = (await headers()).get("x-sildel-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");
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
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />

        {/* Runs before hydration to apply dark class — prevents the brief
            light-theme flash for users on dark mode. */}
        <Script id="sildel-no-flash" strategy="beforeInteractive">
          {noFlashScript}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ReduxProvider>
          {!isAdmin && <SiteHeader />}
          {children}
          {!isAdmin && <SiteFooter />}
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
