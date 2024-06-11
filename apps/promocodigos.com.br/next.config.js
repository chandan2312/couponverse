/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],

  async headers() {
    return [
      {
        source: "/:path*.xml",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=10000, must-revalidate",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/map/stores.xml",
        destination: "/map/store",
      },

      {
        source: "/map/store-:page.xml",
        destination: "/map/store/:page",
      },

      {
        source: "/map.xml",
        destination: "/map",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
