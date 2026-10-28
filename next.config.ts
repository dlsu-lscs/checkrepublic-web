import type { NextConfig } from "next";
import "@/config/env";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // self-contained server for the Docker image (Dockerfile)
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
