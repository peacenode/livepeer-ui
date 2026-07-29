"use client"

import { LivepeerGradientLockup } from "@/components/brand"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import type { SocialBanner } from "@/lib/social-assets"

export function SocialBanner({ banner }: { banner: SocialBanner }) {
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
        <LivepeerCubeStream
          startAtSeconds={banner.captureTime}
          freezeAtSeconds={banner.captureTime}
          inverted
          variant="banner"
          className="opacity-90"
        />

        <div
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "30cqw" }}
          data-particle-exclusion
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
