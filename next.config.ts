import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Tree-shake the icon + motion imports so only the icons we actually use
  // ship to the client. Lucide alone can be 100KB+ otherwise.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "motion/react"],
    // Keep scroll position when navigating back — feels much snappier than
    // the default "jump to top, refetch, then restore" route transition.
    scrollRestoration: true,
  },
  // Compress responses with gzip/brotli at the edge.
  compress: true,
  // Drop the "X-Powered-By: Next.js" header — small but free.
  poweredByHeader: false,
  // Long-cache header for static binary assets. The optimiser already
  // hashes URLs, so the year-long TTL is safe and means repeat visitors hit
  // disk cache instead of re-downloading. Uses Next's path-to-regexp
  // `:ext(...)` syntax — raw regex non-capture groups aren't supported in
  // `source`.
  async headers() {
    return [
      {
        source:
          "/:path*.:ext(webp|avif|jpg|jpeg|png|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimised variants for 30 days so we re-encode each source at most
    // once per month per device size.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Trim the default srcset ladder — fewer variants = far less work in dev
    // and a smaller upstream bill. Mobile-first (640) up to a sensible
    // desktop cap (1920); we don't ship 4K hero photos.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
    // Quality ladder. 80 covers product photography, 85 for hero pieces,
    // 75 for thumbnails. We dropped the 95 tier — at this scale of cork
    // imagery it's bandwidth without visible benefit.
    qualities: [75, 80, 82, 85],
    remotePatterns: [
      { protocol: "https", hostname: "sildel.pt", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
