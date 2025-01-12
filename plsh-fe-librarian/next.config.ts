import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false
  },
  experimental: {
    middlewarePrefetch: "strict",
  }
};

export default nextConfig;
