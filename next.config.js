/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "uploads-ssl.webflow.com",
      "tmp.cameralyze.co",
      "ddragon.leagueoflegends.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth",
      },
    ];
  },
};
