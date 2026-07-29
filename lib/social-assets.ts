export type SocialBanner = {
  captureTime: number
  height: number
  id: string
  platform: string
  startTime: number
  width: number
}

export type SocialAvatar = {
  height: number
  id: string
  platforms: string
  width: number
}

export const socialAvatars: SocialAvatar[] = [
  {
    id: "400",
    platforms: "X, LinkedIn",
    width: 400,
    height: 400,
  },
  {
    id: "500",
    platforms: "GitHub",
    width: 500,
    height: 500,
  },
  {
    id: "512",
    platforms:
      "Discord, Telegram, Reddit, Paragraph, Medium, Mirror, TikTok, Linktree",
    width: 512,
    height: 512,
  },
  {
    id: "800",
    platforms: "YouTube",
    width: 800,
    height: 800,
  },
]

export const socialBanners: SocialBanner[] = [
  {
    id: "x",
    platform: "X",
    width: 1500,
    height: 500,
    startTime: 1.95,
    captureTime: 3.2,
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    width: 4200,
    height: 700,
    startTime: 2.85,
    captureTime: 4.1,
  },
  {
    id: "reddit",
    platform: "Reddit",
    width: 1080,
    height: 128,
    startTime: 1.15,
    captureTime: 2.4,
  },
  {
    id: "article",
    platform: "Paragraph, Medium, Mirror, Linktree",
    width: 1200,
    height: 300,
    startTime: 2.35,
    captureTime: 3.6,
  },
  {
    id: "discord",
    platform: "Discord",
    width: 960,
    height: 540,
    startTime: 1.65,
    captureTime: 2.9,
  },
  {
    id: "youtube",
    platform: "YouTube",
    width: 2560,
    height: 1440,
    startTime: 3.25,
    captureTime: 4.5,
  },
]

export function getSocialBanner(id: string) {
  return socialBanners.find((banner) => banner.id === id)
}

export function getSocialAvatar(id: string) {
  return socialAvatars.find((avatar) => avatar.id === id)
}
