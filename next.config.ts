import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Temporary: send root traffic to the campaign landing page.
      // Remove this entry to restore the original homepage at /.
      {
        source: "/",
        destination: "/vip",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
