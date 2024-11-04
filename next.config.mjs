/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.NEXT_PUBLIC_FRONTEND_IMAGE_URL}`, "localhost:3000"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
