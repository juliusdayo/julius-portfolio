import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/julius",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
