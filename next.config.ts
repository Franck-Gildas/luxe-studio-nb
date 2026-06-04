import type { NextConfig } from "next";
import { RITUAL_CATEGORY_SLUGS } from "./src/data/services-menu";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return RITUAL_CATEGORY_SLUGS.map((slug) => ({
      source: `/services/${slug}`,
      destination: `/services?ritual=${slug}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
