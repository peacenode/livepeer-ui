"use client"

import { LivepeerGradientLockup } from "@/components/brand"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import type { SocialBanner } from "@/lib/social-assets"

export function SocialBanner({ banner }: { banner: SocialBanner }) {
  const isShallow = banner.height / banner.width < 0.2

  return (
    <>
      <main
        className="relative isolate overflow-hidden bg-black text-white"
        style={{
          width: banner.width,
          height: banner.height,
          containerType: "size",
        }}
        data-banner-id={banner.id}
        data-banner-size={`${banner.width}x${banner.height}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 48%, color(display-p3 0.015 0.15 0.09) 0%, transparent 38%), linear-gradient(118deg, black 0%, color(display-p3 0.012 0.025 0.019) 58%, color(display-p3 0.018 0.075 0.048) 100%)",
          }}
        />
        <LivepeerCubeStream
          freezeAtSeconds={banner.captureTime}
          inverted
          variant="card"
          className="opacity-90"
        />

        <div
          className="absolute top-1/2 left-[62%] z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: isShallow ? "30cqw" : "min(34cqw, 104cqh)",
          }}
        >
          <LivepeerGradientLockup
            className="block h-auto w-full text-white"
            aria-hidden="true"
          />
        </div>
      </main>
      <style jsx global>{`
        nextjs-portal {
          display: none !important;
        }
      `}</style>
    </>
  )
}
