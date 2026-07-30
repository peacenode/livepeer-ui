import Image from "next/image"

import {
  getSocialBannerImagePath,
  socialBannerWordmark,
  type SocialBanner,
} from "@/lib/social-assets"

export function SocialBanner({ banner }: { banner: SocialBanner }) {
  return (
    <main
      className="overflow-hidden bg-black"
      style={{ width: banner.width, height: banner.height }}
      data-banner-id={banner.id}
      data-banner-size={`${banner.width}x${banner.height}`}
    >
      <Image
        src={getSocialBannerImagePath(banner)}
        width={banner.width}
        height={banner.height}
        alt={`${banner.platform} Livepeer banner`}
        priority
        unoptimized
      />
      <style>{"nextjs-portal { display: none !important; }"}</style>
    </main>
  )
}

export function SocialBannerArtwork({
  bottomAligned = false,
  centeredWidth = "44cqw",
}: {
  bottomAligned?: boolean
  centeredWidth?: string
}) {
  return (
    <>
      <div
        className="absolute z-10"
        style={{
          width: bottomAligned ? "36cqw" : centeredWidth,
          ...(bottomAligned
            ? { right: "10cqh", bottom: "10cqh" }
            : {
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }),
        }}
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

export function SocialPreviewArtwork() {
  return (
    <>
      <div
        className="absolute left-1/2 z-10 -translate-x-1/2"
        style={{ bottom: "9cqh", width: "88cqw" }}
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
      <div
        className="absolute inset-x-0 bottom-0 z-20 h-[68%]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(0 0 0 / 0.98) 0 0.7cqw, transparent 0.7cqw calc(100% - 0.7cqw), rgb(0 0 0 / 0.98) calc(100% - 0.7cqw)), linear-gradient(0deg, rgb(0 0 0 / 0.98) 0 0.7cqw, transparent 0.7cqw calc(100% - 0.7cqw), rgb(0 0 0 / 0.98) calc(100% - 0.7cqw)), radial-gradient(circle at 46% 43%, rgb(0 0 0) 0 32%, rgb(0 0 0 / 0.96) 36%, rgb(255 255 255 / 0.1) 39%, rgb(255 255 255 / 0.025) 41%, rgb(0 0 0 / 0.92) 46%, transparent 47%), linear-gradient(132deg, rgb(255 255 255 / 0.09) 0%, rgb(255 255 255 / 0.02) 18%, rgb(0 0 0 / 0.9) 72%)",
          backgroundSize: "14cqw 14cqw",
          backgroundPosition: "center bottom",
          opacity: 0.58,
          maskImage:
            "linear-gradient(to top, black 0%, black 38%, rgb(0 0 0 / 0.72) 64%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 38%, rgb(0 0 0 / 0.72) 64%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </>
  )
}
