/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'jetson.tailscale',
        port: '7860',
      },
    ],
  },
};

module.exports = nextConfig;
