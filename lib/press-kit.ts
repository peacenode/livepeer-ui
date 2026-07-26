export type AssetDestination = {
  surface: string
  placement: string
}

export type PressAsset = {
  id: string
  name: string
  width: number
  height: number
  format: string
  destinations: AssetDestination[]
  guidance?: string
  safeArea?: string
  source: string
  sourceUrl: string
}

export const pressAssets: PressAsset[] = [
  {
    id: "social-avatar-400",
    name: "Social avatar",
    width: 400,
    height: 400,
    format: "PNG",
    destinations: [
      { surface: "X", placement: "@Livepeer profile image" },
      { surface: "LinkedIn", placement: "Company Page logo" },
    ],
    guidance: "Keep the mark centered with generous padding; both surfaces crop it.",
    source: "X Help · LinkedIn Help",
    sourceUrl:
      "https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo",
  },
  {
    id: "github-avatar-500",
    name: "GitHub avatar",
    width: 500,
    height: 500,
    format: "PNG",
    destinations: [{ surface: "GitHub", placement: "Organization profile image" }],
    guidance: "Use a solid or transparent background that survives small circular display.",
    source: "GitHub Docs",
    sourceUrl:
      "https://docs.github.com/en/account-and-profile/reference/profile-reference",
  },
  {
    id: "community-avatar-512",
    name: "Community avatar",
    width: 512,
    height: 512,
    format: "PNG",
    destinations: [
      { surface: "Discord", placement: "Server icon" },
      { surface: "Telegram", placement: "Channel avatar" },
      { surface: "Reddit", placement: "Community icon" },
      { surface: "Paragraph", placement: "Publication avatar" },
      { surface: "Medium", placement: "Publication avatar" },
      { surface: "Mirror", placement: "Publication avatar" },
      { surface: "TikTok", placement: "@livepeer_ profile image" },
      { surface: "Linktree", placement: "Profile image" },
    ],
    guidance: "Shared square master. Export platform-specific files only if an uploader rejects it.",
    source: "Production standard",
    sourceUrl: "https://livepeer.org",
  },
  {
    id: "youtube-avatar-800",
    name: "YouTube avatar",
    width: 800,
    height: 800,
    format: "PNG",
    destinations: [
      { surface: "YouTube", placement: "@LivepeerProject channel image" },
      { surface: "YouTube", placement: "Any retained secondary channel" },
    ],
    guidance: "YouTube renders the image as a circle and displays it as small as 98 × 98.",
    source: "YouTube Help",
    sourceUrl:
      "https://support.google.com/youtube/answer/10456525?hl=en",
  },
  {
    id: "x-header",
    name: "X header",
    width: 1500,
    height: 500,
    format: "JPG",
    destinations: [{ surface: "X", placement: "@Livepeer header image" }],
    safeArea: "Allow for approximately 60 px cropping at the top and bottom.",
    source: "X Help",
    sourceUrl:
      "https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo",
  },
  {
    id: "linkedin-cover",
    name: "LinkedIn Page cover",
    width: 4200,
    height: 700,
    format: "JPG",
    destinations: [{ surface: "LinkedIn", placement: "Company Page cover" }],
    safeArea: "Keep essential content centered and clear of the lower-right corner.",
    source: "LinkedIn Help",
    sourceUrl:
      "https://www.linkedin.com/help/linkedin/answer/a563309/image-specifications-for-your-linkedin-pages-and-career-pages",
  },
  {
    id: "reddit-banner",
    name: "Reddit banner",
    width: 1080,
    height: 128,
    format: "JPG",
    destinations: [
      { surface: "Reddit", placement: "r/livepeer desktop banner" },
      { surface: "Reddit", placement: "r/livepeer mobile banner" },
    ],
    guidance: "Desktop accepts at least 1072 × 128; this single export covers both placements.",
    source: "Reddit Help",
    sourceUrl:
      "https://support.reddithelp.com/hc/en-us/articles/15484339588884-Banner",
  },
  {
    id: "newsletter-header",
    name: "Publication header",
    width: 1200,
    height: 300,
    format: "PNG",
    destinations: [
      { surface: "Paragraph", placement: "Publication and email header" },
      { surface: "Medium", placement: "Legacy publication header" },
      { surface: "Mirror", placement: "Legacy publication header" },
      { surface: "Linktree", placement: "Background crop source" },
    ],
    guidance: "Editorial working size; confirm the canonical publishing home before export.",
    source: "Production standard",
    sourceUrl: "https://paragraph.com/@livepeer-2",
  },
  {
    id: "social-preview",
    name: "Social preview",
    width: 1200,
    height: 630,
    format: "JPG / PNG",
    destinations: [
      { surface: "Livepeer.org", placement: "Open Graph default" },
      { surface: "Livepeer.org", placement: "Field Notes article cover" },
      { surface: "LinkedIn", placement: "Shared-link preview" },
      { surface: "X", placement: "Shared-link card" },
      { surface: "Forum", placement: "Topic and site preview" },
    ],
    guidance: "Canonical editorial canvas. Keep type and marks inside a centered safe area.",
    source: "Open Graph · LinkedIn Help",
    sourceUrl:
      "https://www.linkedin.com/help/linkedin/answer/a563309/image-specifications-for-your-linkedin-pages-and-career-pages",
  },
  {
    id: "github-preview",
    name: "GitHub social preview",
    width: 1280,
    height: 640,
    format: "PNG",
    destinations: [
      { surface: "GitHub", placement: "Priority repository social previews" },
      { surface: "GitHub", placement: "Reusable repository template" },
    ],
    guidance: "Under 1 MB. GitHub recommends 1280 × 640 for best display.",
    source: "GitHub Docs",
    sourceUrl:
      "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview",
  },
  {
    id: "video-landscape",
    name: "Landscape video cover",
    width: 1280,
    height: 720,
    format: "JPG",
    destinations: [
      { surface: "YouTube", placement: "Video thumbnail" },
      { surface: "Discord", placement: "Event cover source" },
      { surface: "Livepeer.org", placement: "Video and event embeds" },
    ],
    guidance: "One 16:9 thumbnail system with title, subject, and series variants.",
    source: "YouTube standard",
    sourceUrl: "https://support.google.com/youtube/answer/72431?hl=en",
  },
  {
    id: "discord-banner",
    name: "Discord server banner",
    width: 960,
    height: 540,
    format: "JPG / GIF",
    destinations: [{ surface: "Discord", placement: "Server banner" }],
    safeArea: "Keep the top 48 px quiet so the server title remains legible.",
    source: "Discord Support",
    sourceUrl:
      "https://support.discord.com/hc/en-us/articles/360028716472-Server-Banners",
  },
  {
    id: "youtube-banner",
    name: "YouTube channel banner",
    width: 2560,
    height: 1440,
    format: "JPG",
    destinations: [
      { surface: "YouTube", placement: "@LivepeerProject channel banner" },
      { surface: "YouTube", placement: "Any retained secondary channel" },
    ],
    safeArea: "Keep all text and logos inside the centered 1235 × 338 safe area.",
    source: "YouTube Help",
    sourceUrl:
      "https://support.google.com/youtube/answer/10456525?hl=en",
  },
  {
    id: "vertical-video",
    name: "Vertical video cover",
    width: 1080,
    height: 1920,
    format: "JPG",
    destinations: [
      { surface: "TikTok", placement: "Video cover" },
      { surface: "YouTube", placement: "Shorts cover source" },
      { surface: "X", placement: "Vertical video poster" },
    ],
    guidance: "Keep critical text away from interface overlays and the bottom caption area.",
    source: "Production standard",
    sourceUrl: "https://www.tiktok.com/@livepeer_",
  },
]

export const destinationCount = new Set(
  pressAssets.flatMap((asset) =>
    asset.destinations.map((destination) => destination.surface)
  )
).size

