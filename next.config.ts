import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/mockups/runner/:path*",
        destination: "/mockups/videobuddy/:path*",
      },
      {
        source: "/mockups/livepeer-org/:path*",
        destination: "/mockups/playbooks/:path*",
      },
    ]
  },
}

export default nextConfig
