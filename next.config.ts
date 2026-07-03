import type { NextConfig } from "next";

/**
 * API proxy: app/api-backend/[[...path]]/route.ts (server adds ngrok-skip-browser-warning).
 * Required on Vercel: BACKEND_PROXY_TARGET=https://your-ngrok-host (no /api/v1).
 * lib/api.ts forces same-origin /api-backend when NEXT_PUBLIC_API_BASE_URL is a cross-origin URL.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blogs/Best-Healthy-Meal-Delivery-Services-in-Dubai",
        destination: "/blogs/Top-5-Healthy-Meal-Delivery-Services-in-Dubai",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.calo.app',
      },
      {
        protocol: 'https',
        hostname: 'api-blog.calo.app',
      },
      {
        protocol: 'https',
        hostname: 'cdncaloapp.com',
      },
      {
        protocol: 'https',
        hostname: 'calo.app',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
