import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/mockups/runner/:path*",
        destination: "/mockups/videobuddy/:path*",
      },
    ]
  },
}

export default nextConfig
