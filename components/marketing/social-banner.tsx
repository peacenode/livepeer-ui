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
        className="absolute inset-x-0 bottom-0 h-[68%]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.11) 0, rgb(255 255 255 / 0.025) 1.15cqw, rgb(0 0 0 / 0.34) 2.3cqw, rgb(255 255 255 / 0.035) 3.45cqw)",
          filter: "blur(0.65cqw)",
          maskImage:
            "linear-gradient(to top, black 0%, rgb(0 0 0 / 0.82) 38%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, rgb(0 0 0 / 0.82) 38%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[42%]"
        style={{
          background:
            "linear-gradient(to top, rgb(255 255 255 / 0.11), transparent)",
          maskImage:
            "repeating-linear-gradient(90deg, black 0, black 1.1cqw, rgb(0 0 0 / 0.26) 2.2cqw, black 3.3cqw)",
          WebkitMaskImage:
            "repeating-linear-gradient(90deg, black 0, black 1.1cqw, rgb(0 0 0 / 0.26) 2.2cqw, black 3.3cqw)",
        }}
        aria-hidden="true"
      />
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
    </>
  )
}
