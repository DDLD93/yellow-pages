import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow images from any HTTPS domain (adjust based on your S3/CDN)
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Allow local development images
      },
    ],
  },
};

export default nextConfig;
