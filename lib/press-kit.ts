export type SurfaceStatus = "primary" | "secondary" | "legacy" | "verify"

export type PressSurface = {
  name: string
  handle: string
  url: string
  role: string
  status: SurfaceStatus
  evidence: string
  assets: string[]
  note?: string
}

export const pressSurfaces: PressSurface[] = [
  {
    name: "Livepeer.org",
    handle: "livepeer.org",
    url: "https://livepeer.org",
    role: "Canonical brand, product, ecosystem, and Field Notes",
    status: "primary",
    evidence: "Current website",
    assets: ["Open Graph image", "Favicon set", "Article covers", "Author avatars"],
  },
  {
    name: "X",
    handle: "@Livepeer",
    url: "https://x.com/Livepeer",
    role: "Ecosystem announcements, launches, events, and network updates",
    status: "primary",
    evidence: "Website and current docs",
    assets: ["Profile image", "Header image", "Bio", "Link", "Post templates"],
  },
  {
    name: "GitHub",
    handle: "livepeer",
    url: "https://github.com/livepeer",
    role: "Protocol code, documentation, SDKs, and project governance",
    status: "primary",
    evidence: "Verified organization",
    assets: ["Organization avatar", "Profile README", "Social preview", "Repository templates"],
    note: "The organization currently exposes more than 200 repositories; pinned repositories and the profile README are part of the public brand surface.",
  },
  {
    name: "Discord",
    handle: "Livepeer",
    url: "https://discord.gg/livepeer",
    role: "Real-time developer, operator, stakeholder, and AI community",
    status: "primary",
    evidence: "Website and current docs",
    assets: ["Server icon", "Invite splash", "Server banner", "Welcome graphics", "Event covers"],
  },
  {
    name: "Forum",
    handle: "forum.livepeer.org",
    url: "https://forum.livepeer.org",
    role: "Protocol design, governance, treasury, and long-form discussion",
    status: "primary",
    evidence: "Website and current docs",
    assets: ["Site logo", "Favicon", "Social preview", "Category graphics"],
  },
  {
    name: "YouTube",
    handle: "@LivepeerProject",
    url: "https://www.youtube.com/@LivepeerProject",
    role: "Primary video archive for community calls, education, and demos",
    status: "primary",
    evidence: "Current docs",
    assets: ["Channel avatar", "Channel banner", "Video watermark", "Thumbnail system", "End screen"],
    note: "Search and docs also expose @livepeer and @LivepeerOrg. Confirm ownership, purpose, and redirect strategy before updating.",
  },
  {
    name: "LinkedIn",
    handle: "company/livepeer",
    url: "https://www.linkedin.com/company/livepeer",
    role: "Company, hiring, partner, and industry-facing updates",
    status: "secondary",
    evidence: "Current docs",
    assets: ["Company logo", "Cover image", "About copy", "CTA link", "Post templates"],
  },
  {
    name: "Telegram",
    handle: "livepeerorg",
    url: "https://t.me/livepeerorg",
    role: "Quick community chat and announcements",
    status: "secondary",
    evidence: "Current docs",
    assets: ["Channel avatar", "Description", "Pinned welcome graphic"],
  },
  {
    name: "Reddit",
    handle: "r/livepeer",
    url: "https://www.reddit.com/r/livepeer/",
    role: "Community discussion and discovery",
    status: "secondary",
    evidence: "Current docs",
    assets: ["Community icon", "Banner", "Mobile banner", "Description"],
  },
  {
    name: "Paragraph",
    handle: "@livepeer-2",
    url: "https://paragraph.com/@livepeer-2",
    role: "Newsletter archive and earlier long-form publishing",
    status: "verify",
    evidence: "Indexed Livepeer publication",
    assets: ["Publication logo", "Header", "Email header", "Email footer", "Post covers"],
    note: "No official Livepeer Substack was found. The discoverable newsletter-like surface is Paragraph; confirm account ownership and whether it is still in use.",
  },
  {
    name: "Mirror",
    handle: "livepeer.eth",
    url: "https://mirror.xyz/livepeer.eth",
    role: "Onchain publishing archive",
    status: "legacy",
    evidence: "Current docs label it onchain and legacy-adjacent",
    assets: ["Publication avatar", "Header", "Article covers"],
  },
  {
    name: "Medium",
    handle: "livepeer-blog",
    url: "https://medium.com/livepeer-blog",
    role: "Legacy editorial archive",
    status: "legacy",
    evidence: "Current docs explicitly label it legacy",
    assets: ["Publication avatar", "Header", "Article covers"],
  },
  {
    name: "TikTok",
    handle: "@livepeer_",
    url: "https://www.tiktok.com/@livepeer_",
    role: "Short-form video and event clips",
    status: "verify",
    evidence: "Current Linktree",
    assets: ["Profile image", "Bio", "Link", "Video cover system"],
    note: "Linked from the Livepeer Linktree but absent from the current website and docs social directory.",
  },
  {
    name: "Linktree",
    handle: "livepeer",
    url: "https://linktr.ee/livepeer",
    role: "Legacy link-in-bio routing page",
    status: "verify",
    evidence: "Public profile",
    assets: ["Profile image", "Background", "Bio", "Link thumbnails"],
    note: "Its link set is narrower and less current than livepeer.org. Decide whether to refresh it or replace it with a first-party links page.",
  },
]

export const sharedAssetGroups = [
  {
    name: "Identity master",
    items: [
      "Square avatar exports: SVG, 1024px PNG, 512px PNG",
      "Horizontal and stacked lockups in black, white, and transparent variants",
      "Safe-area and minimum-size guidance",
      "Canonical one-line, short, and long descriptions",
    ],
  },
  {
    name: "Wide social",
    items: [
      "X header: 1500 × 500",
      "LinkedIn cover: 1128 × 191",
      "YouTube banner: 2560 × 1440 with 1235 × 338 safe area",
      "Discord banner and invite splash",
      "Reddit desktop and mobile banners",
    ],
  },
  {
    name: "Publishing",
    items: [
      "1200 × 630 Open Graph and article-cover system",
      "16:9 YouTube thumbnail system",
      "9:16 short-form cover system",
      "Newsletter header, footer, author mark, and email-safe lockup",
      "Presentation and press-photo download set",
    ],
  },
  {
    name: "Copy and governance",
    items: [
      "Canonical handle, URL, bio, CTA, and account owner for every surface",
      "Primary, secondary, and legacy channel policy",
      "Source files, export date, and approval owner",
      "Quarterly link, access, and visual-consistency review",
    ],
  },
]

