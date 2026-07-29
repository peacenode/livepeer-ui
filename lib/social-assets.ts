export type SocialBanner = {
  captureTime: number
  height: number
  id: string
  platform: string
  width: number
}

export const socialBanners: SocialBanner[] = [
  {
    id: "x",
    platform: "X",
    width: 1500,
    height: 500,
    captureTime: 3.2,
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    width: 4200,
    height: 700,
    captureTime: 4.1,
  },
  {
    id: "reddit",
    platform: "Reddit",
    width: 1080,
    height: 128,
    captureTime: 2.4,
  },
  {
    id: "article",
    platform: "Paragraph, Medium, Mirror, Linktree",
    width: 1200,
    height: 300,
    captureTime: 3.6,
  },
  {
    id: "discord",
    platform: "Discord",
    width: 960,
    height: 540,
    captureTime: 2.9,
  },
  {
    id: "youtube",
    platform: "YouTube",
    width: 2560,
    height: 1440,
    captureTime: 4.5,
  },
]

export function getSocialBanner(id: string) {
  return socialBanners.find((banner) => banner.id === id)
}
