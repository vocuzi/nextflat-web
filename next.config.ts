import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/flats",
        destination: "/search",
        permanent: true, // 301
      },
      // {
      //   source: "/blog/:slug",
      //   destination: "/posts/:slug",
      //   permanent: true,
      // },
      // {
      //   source: "/flat/:id",
      //   destination: "/listing/:id",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
