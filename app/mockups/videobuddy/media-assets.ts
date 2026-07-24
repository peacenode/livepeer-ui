const assetRoot = "/generated/2026-07-24-004043"
const slugGangAssetRoot = "/generated/2026-07-24-142500-slug-gang"

export const storyMedia = {
  saltSignal: {
    wide: `${assetRoot}/salt-signal-wide.webp`,
    character: `${assetRoot}/mara-portrait.webp`,
  },
  blackTide: {
    wide: `${assetRoot}/black-tide-wide.webp`,
    character: `${assetRoot}/june-portrait.webp`,
  },
  afterHours: {
    wide: `${assetRoot}/after-hours-wide.webp`,
    character: `${assetRoot}/eli-portrait.webp`,
  },
} as const

export const storyboardFrames = {
  slugGang: [
    `${slugGangAssetRoot}/scene-01.png`,
    `${slugGangAssetRoot}/scene-02.png`,
    `${slugGangAssetRoot}/scene-03.png`,
    `${slugGangAssetRoot}/scene-04.png`,
    `${slugGangAssetRoot}/scene-05.png`,
    `${slugGangAssetRoot}/scene-06.png`,
    `${slugGangAssetRoot}/scene-07.png`,
    `${slugGangAssetRoot}/scene-08.png`,
  ],
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
