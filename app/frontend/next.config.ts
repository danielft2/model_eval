import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // {
      //   source: '/researcher/workspace/work',
      //   has: [
      //     {
      //       type: 'query',
      //       key: 'token',
      //     },
      //   ],
      //   destination: '/researcher/workspace/work',
      //   permanent: true,
      // },
    ];
  },
}
export default nextConfig;
