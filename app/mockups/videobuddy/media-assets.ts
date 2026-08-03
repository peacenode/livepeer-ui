import { sanityStaticAssets } from "@/sanity/lib/static-assets"

export const storyMedia = {
  saltSignal: {
    wide: sanityStaticAssets.projectResults.saltSignal,
    character: sanityStaticAssets.projectResults.maraPortrait,
  },
  blackTide: {
    wide: sanityStaticAssets.projectResults.blackTide,
    character: sanityStaticAssets.projectResults.junePortrait,
  },
  afterHours: {
    wide: sanityStaticAssets.projectResults.afterHours,
    character: sanityStaticAssets.projectResults.eliPortrait,
  },
} as const

export const storyboardFrames = {
  slugGang: sanityStaticAssets.slugGangFrames,
  saltSignal: [
    storyMedia.saltSignal.wide,
    storyMedia.saltSignal.character,
    storyMedia.saltSignal.wide,
    storyMedia.saltSignal.wide,
  ],
  blackTide: [
    storyMedia.blackTide.wide,
    storyMedia.blackTide.character,
    storyMedia.blackTide.wide,
    storyMedia.blackTide.character,
  ],
  afterHours: [
    storyMedia.afterHours.wide,
    storyMedia.afterHours.character,
    storyMedia.afterHours.wide,
    storyMedia.afterHours.character,
  ],
} as const

export function frameAt(frames: readonly string[], index: number) {
  return frames[index % frames.length]
}

export function framesForName(name: string) {
  const normalized = name.toLowerCase()
  if (normalized.includes("tide") || normalized.includes("june")) {
    return storyboardFrames.blackTide
  }
  if (
    normalized.includes("after") ||
    normalized.includes("rehearsal") ||
    normalized.includes("eli")
  ) {
    return storyboardFrames.afterHours
  }
  return storyboardFrames.saltSignal
}
