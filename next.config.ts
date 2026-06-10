import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
