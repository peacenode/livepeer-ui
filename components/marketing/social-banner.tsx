"use client"

import Image from "next/image"
import { useEffect } from "react"

import {
  socialBannerWordmark,
  type SocialBanner,
} from "@/lib/social-assets"

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
        className="absolute top-1/2 z-10 -translate-y-1/2"
        style={{ right: "7cqw", width: "44cqw" }}
        data-lockup
      >
        <Image
          src={socialBannerWordmark}
          width={1318}
          height={196}
          alt="Livepeer"
          className="block h-auto w-full"
          priority
          unoptimized
        />
      </div>
    </>
  )
}
