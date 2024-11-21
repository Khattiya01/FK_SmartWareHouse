/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_FRONTEND_IMAGE_URL}`,
      "localhost:3000",
    ],
    // Allow serving images from the external API (localhost or other domains)
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "3000", // Replace with the appropriate port if different
      //   pathname: "/api/serve-file*", // Allow all image paths in the API
      // },
      {
        protocol: "https",
        hostname: "fkwarehouse.com", // For images served from your own domain
        pathname: "/api/serve-file*", // Allow access to the `/uploads` folder or specific paths
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
