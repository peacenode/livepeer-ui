export type PressRequirement = {
  platform: string
  width: number
  height: number
}

export type PressDeliverable = {
  id: string
  name: string
  previewWidth: number
  previewHeight: number
  requirements: PressRequirement[]
}

export const pressDeliverables: PressDeliverable[] = [
  {
    id: "avatar",
    name: "Avatar",
    previewWidth: 1,
    previewHeight: 1,
    requirements: [
      {
        platform: "X / LinkedIn",
        width: 400,
        height: 400,
      },
      {
        platform: "GitHub",
        width: 500,
        height: 500,
      },
      {
        platform:
          "Discord, Telegram, Reddit, Paragraph, Medium, Mirror, TikTok, Linktree",
        width: 512,
        height: 512,
      },
      {
        platform: "YouTube",
        width: 800,
        height: 800,
      },
    ],
  },
  {
    id: "banners-headers",
    name: "Banners and headers",
    previewWidth: 3,
    previewHeight: 1,
    requirements: [
      {
        platform: "X",
        width: 1500,
        height: 500,
      },
      {
        platform: "LinkedIn",
        width: 4200,
        height: 700,
      },
      {
        platform: "Reddit",
        width: 1080,
        height: 128,
      },
      {
        platform: "Paragraph, Medium, Mirror, Linktree",
        width: 1200,
        height: 300,
      },
      {
        platform: "Discord",
        width: 960,
        height: 540,
      },
      {
        platform: "YouTube",
        width: 2560,
        height: 1440,
      },
    ],
  },
  {
    id: "social-preview",
    name: "Social preview",
    previewWidth: 1200,
    previewHeight: 630,
    requirements: [
      {
        platform: "Livepeer.org, Field Notes, LinkedIn, X, Forum",
        width: 1200,
        height: 630,
      },
      {
        platform: "GitHub",
        width: 1280,
        height: 640,
      },
    ],
  },
  {
    id: "vertical-social-cover",
    name: "Vertical social cover",
    previewWidth: 9,
    previewHeight: 16,
    requirements: [
      {
        platform: "TikTok / X",
        width: 1080,
        height: 1920,
      },
    ],
  },
]
