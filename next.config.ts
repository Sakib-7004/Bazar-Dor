import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/Bazar-Dor" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/Bazar-Dor/" : "",
  images: { unoptimized: true },
};

export default nextConfig;
