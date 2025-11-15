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
  
  // Webpack alias for path resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
}

module.exports = nextConfig

