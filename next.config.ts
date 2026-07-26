import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/mockups/runner/:path*",
        destination: "/mockups/agent/:path*",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/mockups/agent/:path*",
          destination: "/mockups/videobuddy/:path*",
        },
      ],
      afterFiles: [
        {
          source: "/mockups/livepeer-org/:path*",
          destination: "/mockups/playbooks/:path*",
        },
      ],
      fallback: [],
    }
  },
}

export default nextConfig
