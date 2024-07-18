import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4001",
        pathname: "/*/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4001",
        pathname: "/*",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
