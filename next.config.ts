import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "proedmnqezyznamssyuv.supabase.co",
        pathname: "/storage/v1/object/public/**", // ✅ Allow images inside storage
      },
    ],
  }
};

export default nextConfig;
