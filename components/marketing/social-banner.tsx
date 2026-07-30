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
            "repeating-linear-gradient(90deg, transparent 0, rgb(0 0 0 / 0.38) 0.8cqw, rgb(0 0 0 / 0.9) 1.7cqw, rgb(0 0 0 / 0.24) 2.6cqw, transparent 3.5cqw)",
          filter: "blur(0.3cqw)",
          maskImage:
            "linear-gradient(to top, black 0%, rgb(0 0 0 / 0.88) 42%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, rgb(0 0 0 / 0.88) 42%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </>
  )
}
