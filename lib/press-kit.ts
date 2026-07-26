export type PressRequirement = {
  platform: string
  placement: string
  width: number
  height: number
  note?: string
}

export type PressDeliverable = {
  id: string
  name: string
  format: string
  previewWidth: number
  previewHeight: number
  requirements: PressRequirement[]
  guidance: string
}

export const pressDeliverables: PressDeliverable[] = [
  {
    id: "avatar",
    name: "Avatar",
    format: "PNG",
    previewWidth: 1,
    previewHeight: 1,
    requirements: [
      {
        platform: "X / LinkedIn",
        placement: "Profile image and Company Page logo",
        width: 400,
        height: 400,
      },
      {
        platform: "GitHub",
        placement: "Organization profile image",
        width: 500,
        height: 500,
      },
      {
        platform: "Community",
        placement:
          "Discord, Telegram, Reddit, Paragraph, Medium, Mirror, TikTok, and Linktree",
        width: 512,
        height: 512,
      },
      {
        platform: "YouTube",
        placement: "Channel image",
        width: 800,
        height: 800,
        note: "Displayed as a circle and as small as 98 × 98 px.",
      },
    ],
    guidance:
      "Build one centered square master with generous padding, then export it at each required size.",
  },
  {
    id: "banners-headers",
    name: "Banners and headers",
    format: "JPG / PNG",
    previewWidth: 3,
    previewHeight: 1,
    requirements: [
      {
        platform: "X",
        placement: "Profile header",
        width: 1500,
        height: 500,
        note: "Allow for approximately 60 px cropping at the top and bottom.",
      },
      {
        platform: "LinkedIn",
        placement: "Company Page cover",
        width: 4200,
        height: 700,
        note: "Keep essential content clear of the lower-right corner.",
      },
      {
        platform: "Reddit",
        placement: "Desktop and mobile community banner",
        width: 1080,
        height: 128,
      },
      {
        platform: "Publications",
        placement: "Paragraph, Medium, Mirror, and Linktree header source",
        width: 1200,
        height: 300,
      },
      {
        platform: "Discord",
        placement: "Server banner",
        width: 960,
        height: 540,
        note: "Keep the top 48 px quiet so the server title remains legible.",
      },
      {
        platform: "YouTube",
        placement: "Channel banner",
        width: 2560,
        height: 1440,
        note: "Keep text and logos inside the centered 1235 × 338 px safe area.",
      },
    ],
    guidance:
      "Use one adaptable header system, then recompose it for each platform ratio and safe area.",
  },
  {
    id: "social-preview",
    name: "Social preview",
    format: "JPG / PNG",
    previewWidth: 1200,
    previewHeight: 630,
    requirements: [
      {
        platform: "Web and social",
        placement:
          "Livepeer.org, Field Notes, LinkedIn, X, and forum link previews",
        width: 1200,
        height: 630,
      },
      {
        platform: "GitHub",
        placement: "Repository social preview",
        width: 1280,
        height: 640,
        note: "Keep the export under 1 MB.",
      },
    ],
    guidance:
      "Use a shared editorial composition with type and marks inside a centered safe area.",
  },
  {
    id: "vertical-social-cover",
    name: "Vertical social cover",
    format: "JPG",
    previewWidth: 9,
    previewHeight: 16,
    requirements: [
      {
        platform: "TikTok / X",
        placement: "Vertical video cover and poster",
        width: 1080,
        height: 1920,
        note: "Keep critical text clear of interface overlays and captions.",
      },
    ],
    guidance:
      "Create one vertical cover system with title, subject, and series variants.",
  },
]

export const requiredExportCount = pressDeliverables.reduce(
  (count, deliverable) => count + deliverable.requirements.length,
  0
)

export const destinationCount = new Set(
  pressDeliverables.flatMap((deliverable) =>
    deliverable.requirements.map((requirement) => requirement.platform)
  )
).size
