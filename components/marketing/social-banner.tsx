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
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end"
        data-lockup
      >
        {Array.from({ length: 4 }, (_, index) => (
          <Image
            key={index}
            src={socialBannerWordmark}
            width={1318}
            height={196}
            alt=""
            className="block h-auto w-full shrink-0"
            priority
            unoptimized
            aria-hidden="true"
          />
        ))}
      </div>
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 18% 72% at 16% 105%, rgb(0 0 0 / 0.96) 0%, rgb(0 0 0 / 0.62) 42%, transparent 76%), radial-gradient(ellipse 15% 78% at 58% 82%, rgb(0 0 0 / 0.9) 0%, rgb(0 0 0 / 0.4) 44%, transparent 78%), linear-gradient(101deg, rgb(0 0 0 / 0.9) 0%, rgb(0 0 0 / 0.5) 12%, transparent 31%, transparent 68%, rgb(0 0 0 / 0.34) 82%, rgb(0 0 0 / 0.78) 100%)",
          filter: "blur(0.22cqw)",
        }}
        aria-hidden="true"
      />
    </>
  )
}
