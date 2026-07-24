import {
  ArrowUpRightIcon,
  GitForkIcon,
  GlobeIcon,
  MessageCircleIcon,
  XIcon,
} from "lucide-react"

import { LivepeerLockup } from "@/components/brand"

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
    icon: MessageCircleIcon,
  },
  {
    label: "Livepeer on X",
    href: "https://x.com/Livepeer",
    icon: XIcon,
  },
  {
    label: "Livepeer on GitHub",
    href: "https://github.com/livepeer",
    icon: GitForkIcon,
  },
  {
    label: "Livepeer website",
    href: "https://livepeer.org/",
    icon: GlobeIcon,
  },
]

export function PlaybooksFooter() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="px-6 pt-20 pb-10 sm:px-10 sm:pt-24 sm:pb-12 lg:px-12 lg:pt-28">
        <div className="grid gap-14 md:grid-cols-[1.05fr_1fr_1fr] lg:grid-cols-[1.05fr_1fr_1fr_0.9fr] lg:gap-16">
          <div className="md:col-span-3 lg:col-span-1">
            <LivepeerLockup className="h-auto w-64 max-w-full text-white sm:w-72" />
            <p className="mt-7 text-base text-white/50 sm:text-lg lg:whitespace-nowrap">
              The open network for inference &amp; compute.
            </p>
            <div className="mt-10 flex items-center gap-6">
              {socials.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-white/45 transition-colors hover:text-white"
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-lg font-medium text-white/80">
                {group.title}
              </h2>
              <nav className="mt-8 flex flex-col items-start gap-6">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="inline-flex items-center gap-1 text-base text-white/35 transition-colors hover:text-white sm:text-lg"
                  >
                    {link.label}
                    {link.external && (
                      <ArrowUpRightIcon
                        className="size-4"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-10 sm:mt-24 sm:pt-12">
          <p className="text-sm text-white/30 sm:text-base">
            © 2026 Livepeer Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
