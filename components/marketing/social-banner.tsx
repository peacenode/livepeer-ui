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
          backgroundImage:
            "radial-gradient(ellipse 48% 82% at 0% 0%, color-mix(in oklab, var(--color-emerald-500) 60%, transparent) 0%, color-mix(in oklab, var(--color-emerald-500) 32%, transparent) 30%, color-mix(in oklab, var(--color-emerald-500) 13%, transparent) 62%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 blur-xl"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg at 0% 0%, transparent 100deg, color-mix(in oklab, var(--color-emerald-500) 15%, transparent) 118deg, color-mix(in oklab, var(--color-emerald-400) 40%, transparent) 136deg, color-mix(in oklab, var(--color-emerald-400) 13%, transparent) 156deg, transparent 172deg)",
          maskImage:
            "radial-gradient(ellipse 105% 145% at 0% 0%, black 0%, black 42%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 105% 145% at 0% 0%, black 0%, black 42%, transparent 80%)",
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
