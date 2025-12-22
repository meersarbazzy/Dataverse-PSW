/** @type {import('next').NextConfig} */
const nextConfig = {
  // This line is ESSENTIAL for the Dockerfile to work
  output: 'standalone',

  // Your configuration for Sanity images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  async rewrites() {
    const CHAINLIT_URL = process.env.NEXT_PUBLIC_CHAINLIT_URL || 'http://localhost:8000';
    return [
      {
        source: '/copilot/:path*',
        destination: `${CHAINLIT_URL}/copilot/:path*`,
      },
      {
        source: '/_chainlit/:path*',
        destination: `${CHAINLIT_URL}/_chainlit/:path*`,
      },
    ]
  },
};

module.exports = nextConfig;