/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    "@repo/ui",
    "@repo/eslint-config",
    "@repo/typescript-config",
    "@repo/auth-config",
  ],

  // webpack: (config, { isServer }) => {
  //   config.module.rules.push({
  //     test: /\.html$/,
  //     use: [
  //       {
  //         loader: "html-loader",
  //       },
  //     ],
  //   });
  //   return config;
  // },

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
        source: "/map/:dynamic/stores.xml",
        destination: "/map/:dynamic/store",
      },

      {
        source: "/map/:dynamic/store-:page.xml",
        destination: "/map/:dynamic/store/:page",
      },
      {
        source: "/map/:dynamic/offers.xml",
        destination: "/map/:dynamic/offer",
      },

      {
        source: "/map/:dynamic/offer-:page.xml",
        destination: "/map/:dynamic/offer/:page",
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
