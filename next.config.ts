import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // إعدادات الإنتاج
  output: 'standalone',
  
  // تحسين الأداء
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // إعدادات الصور
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // إعدادات الأمان
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // إعدادات إعادة التوجيه
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // إعدادات البيئة
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // إعدادات TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // إعدادات ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
