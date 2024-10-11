/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Add the allowed domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
