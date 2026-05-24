import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Mongoose only runs on the server. Mark it external so Next.js never tries
  // to bundle it for the client (which fails on Node-only deps like `tls`).
  serverExternalPackages: ["mongoose"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimised variants for 30 days so we re-encode each source at most
    // once per month per device size.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Trim the default srcset ladder — fewer variants = far less work in dev.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "sildel.pt", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
