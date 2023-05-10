/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
  },
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
  },
};

module.exports = nextConfig;
