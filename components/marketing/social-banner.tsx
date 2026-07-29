"use client"

import { useEffect } from "react"

import { LivepeerGradientLockup } from "@/components/brand"
import type { SocialBanner } from "@/lib/social-assets"

export function SocialBanner({ banner }: { banner: SocialBanner }) {
  useEffect(() => {
    let paintFrame = 0
    const readyFrame = requestAnimationFrame(() => {
      paintFrame = requestAnimationFrame(() => {
        document.documentElement.dataset.captureReady = "true"
      })
    })

    return () => {
      cancelAnimationFrame(readyFrame)
      cancelAnimationFrame(paintFrame)
      delete document.documentElement.dataset.captureReady
    }
  }, [])

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
        <SocialBannerArtwork />
      </main>
      <style jsx global>{`
        nextjs-portal {
          display: none !important;
        }
      `}</style>
    </>
  )
}

export function SocialBannerArtwork() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 115% at 0% 0%, rgb(255 255 255 / 0.085) 0%, rgb(255 255 255 / 0.028) 34%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-1/2 z-10 -translate-y-1/2"
        style={{ right: "7cqw", width: "30cqw" }}
        data-lockup
      >
        <LivepeerGradientLockup
          className="block h-auto w-full text-white"
          aria-hidden="true"
        />
      </div>
    </>
  )
}
