import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better error handling
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Enable compression
  compress: true,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'cobe'],
  },
};

export default nextConfig;
