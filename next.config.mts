import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/mockups/runner/:path*",
        destination: "/mockups/client/:path*",
        permanent: true,
      },
      {
        source: "/mockups/agent/:path*",
        destination: "/mockups/client/:path*",
        permanent: true,
      },
      {
        source: "/mockups/livepeer-org/install/:path*",
        destination: "/mockups/livepeer-org/agent/:path*",
        permanent: true,
      },
      {
        source: "/mockups/livepeer-org/:path*",
        destination: "/docs/public-beta/livepeer-org/:path*",
        permanent: true,
      },
      {
        source: "/mockups/platform/:path*",
        destination: "/mockups/livepeer-agent/:path*",
        permanent: true,
      },
      {
        source: "/mockups/api-console/:path*",
        destination: "/mockups/livepeer-agent/:path*",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/docs/public-beta/livepeer-org/agent/:path*",
          destination: "/mockups/playbooks/install/:path*",
        },
        {
          source: "/docs/public-beta/livepeer-org/:path*",
          destination: "/mockups/playbooks/:path*",
        },
        {
          source: "/mockups/client/:path*",
          destination: "/mockups/videobuddy/:path*",
        },
        {
          source: "/mockups/livepeer-agent/:path*",
          destination: "/mockups/platform/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
