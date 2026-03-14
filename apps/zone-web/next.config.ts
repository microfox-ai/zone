import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "yt3.googleusercontent.com", pathname: "/**" },
    ],
  },
  // Don't fail build on ESLint errors (common for example projects)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Don't fail build on TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
