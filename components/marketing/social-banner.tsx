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
        style={{ bottom: 0, width: "100cqw" }}
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
        className="absolute left-1/2 z-20 -translate-x-1/2"
        style={{
          bottom: 0,
          width: "100cqw",
          aspectRatio: "1318 / 196",
          backgroundImage:
            "radial-gradient(ellipse 17% 145% at 16% 118%, rgb(0 0 0 / 0.94) 0%, rgb(0 0 0 / 0.64) 38%, transparent 72%), radial-gradient(ellipse 13% 155% at 58% 112%, rgb(0 0 0 / 0.86) 0%, rgb(0 0 0 / 0.42) 42%, transparent 76%), linear-gradient(101deg, rgb(0 0 0 / 0.9) 0%, rgb(0 0 0 / 0.52) 12%, transparent 31%, transparent 68%, rgb(0 0 0 / 0.34) 82%, rgb(0 0 0 / 0.78) 100%)",
          filter: "blur(0.22cqw)",
        }}
        aria-hidden="true"
      />
    </>
  )
}
