/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ishikawa.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
