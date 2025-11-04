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
};

module.exports = nextConfig;