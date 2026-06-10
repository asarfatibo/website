import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Legacy URLs from the old Hostinger site (still indexed / linked).
    return [
      { source: "/mission", destination: "/fr/a-propos", permanent: true },
      { source: "/en/mission", destination: "/en/a-propos", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bubbleout.fr",
        port: "4003",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
