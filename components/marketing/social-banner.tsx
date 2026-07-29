"use client"

import { LivepeerGradientSymbol } from "@/components/brand"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import type { SocialBanner } from "@/lib/social-assets"

export function SocialBanner({ banner }: { banner: SocialBanner }) {
  const isShallow = banner.height / banner.width < 0.2
  const isUltraWide = banner.width / banner.height > 4

  return (
    <>
      <main
        className="relative isolate overflow-hidden bg-white text-neutral-950"
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
              "radial-gradient(circle at 16% 46%, color(display-p3 0.91 1 0.95) 0%, transparent 34%), linear-gradient(118deg, white 0%, color(display-p3 0.965 1 0.98) 56%, color(display-p3 0.93 0.99 0.96) 100%)",
          }}
        />
        <LivepeerCubeStream
          freezeAtSeconds={banner.captureTime}
          variant="card"
          className="opacity-95"
        />

        <div
          className="relative z-10 flex h-full items-center"
          style={{
            paddingInline: isUltraWide ? "4.25cqw" : "6.5cqw",
          }}
        >
          <div
            className="flex max-w-[64%] items-center"
            style={{ gap: isShallow ? "2.25cqh" : "3.5cqh" }}
            data-particle-exclusion
          >
            <LivepeerGradientSymbol
              className="h-[30cqh] w-auto shrink-0"
              aria-hidden="true"
            />
            <h1
              className="leading-[0.98] font-light tracking-[-0.045em] text-balance"
              style={{ fontSize: "min(14cqh, 5.5cqw)" }}
            >
              The open inference network.{" "}
              <span className="text-neutral-950/45">
                Connect GPUs, power AI and media workloads on Livepeer.
              </span>
            </h1>
          </div>
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
