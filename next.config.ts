import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep Next.js server features enabled for dynamic product pages and Better Auth.
  // GitHub Pages uses the separate static public/index.html workflow.
  images: { unoptimized: true },
};

export default nextConfig;
