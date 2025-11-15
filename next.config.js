/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig

