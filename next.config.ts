import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Make the resume download (rather than open in a viewer) everywhere,
  // including mobile browsers that ignore the `download` attribute.
  async headers() {
    return [
      {
        source: "/Shubham_Sapkota_Resume.pdf",
        headers: [
          { key: "Content-Disposition", value: 'attachment; filename="Shubham_Sapkota_Resume.pdf"' },
        ],
      },
    ];
  },
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
