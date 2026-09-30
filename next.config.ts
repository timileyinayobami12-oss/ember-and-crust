import type { NextConfig } from "next";

// NEXT_EXPORT=1 switches to a fully static build for Cloudflare Pages.
// The sandbox keeps using standalone mode and its own dist directory,
// so both environments work side by side without touching each other.
const isStaticExport = process.env.NEXT_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  ...(isStaticExport
    ? { distDir: ".next-export", images: { unoptimized: true } }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
