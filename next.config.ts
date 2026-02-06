import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yuzykc5xj5.ufs.sh',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
