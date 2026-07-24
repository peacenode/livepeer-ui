import { ArrowUpRightIcon, GlobeIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import {
  DiscordIcon,
  GitHubIcon,
  XIcon,
} from "@/components/brand-social-icons"

const groups = [
  {
    title: "Network",
    links: [
      { label: "Ecosystem", href: "https://livepeer.org/ecosystem" },
      { label: "Livepeer Token", href: "https://livepeer.org/token" },
      {
        label: "Delegate LPT",
        href: "https://explorer.livepeer.org/",
        external: true,
      },
      {
        label: "Provide GPUs",
        href: "/mockups/playbooks/earn",
        external: true,
      },
      {
        label: "Roadmap",
        href: "https://roadmap.livepeer.org/roadmap",
        external: true,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Primer", href: "https://livepeer.org/primer" },
      { label: "Blog", href: "https://blog.livepeer.org/" },
      { label: "Foundation", href: "https://livepeer.org/foundation" },
      { label: "Brand", href: "https://livepeer.org/brand" },
      {
        label: "Documentation",
        href: "https://docs.livepeer.org/",
        external: true,
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Discord",
        href: "https://discord.gg/livepeer",
        external: true,
      },
      {
        label: "X / Twitter",
        href: "https://x.com/Livepeer",
        external: true,
      },
      {
        label: "Forum",
        href: "https://forum.livepeer.org/",
        external: true,
      },
    ],
  },
]

const socials = [
  {
    label: "Livepeer on Discord",
    href: "https://discord.gg/livepeer",
    icon: DiscordIcon,
  },
  {
    label: "Livepeer on X",
    href: "https://x.com/Livepeer",
    icon: XIcon,
  },
  {
    label: "Livepeer on GitHub",
    href: "https://github.com/livepeer",
    icon: GitHubIcon,
  },
  {
    label: "Livepeer website",
    href: "https://livepeer.org/",
    icon: GlobeIcon,
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <LivepeerLockup className="h-auto w-44 text-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              The open network for inference &amp; compute.
            </p>
            <div className="mt-7 flex items-center gap-4">
              {socials.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-medium">{group.title}</h2>
              <nav className="mt-4 flex flex-col items-start gap-3">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    {link.external && (
                      <ArrowUpRightIcon
                        className="size-3.5"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-xs text-muted-foreground">
            © 2026 Livepeer Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
