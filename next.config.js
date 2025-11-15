/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Image optimization
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
  
  // Disable ESLint during builds (optional, can be enabled later)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript errors during builds (optional, can be enabled later)
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Webpack config for path alias resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
}

module.exports = nextConfig

