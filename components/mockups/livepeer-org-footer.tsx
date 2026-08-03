import { ArrowUpRightIcon, GlobeIcon } from "lucide-react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { DiscordIcon, GitHubIcon, XIcon } from "@/components/brand-social-icons"
import type { LivepeerOrgSite } from "@/components/mockups/contracts"

const socialIcons = {
  discord: DiscordIcon,
  x: XIcon,
  github: GitHubIcon,
  website: GlobeIcon,
}

export function LivepeerOrgFooter({ site }: { site: LivepeerOrgSite }) {
  return (
    <footer className="bg-background">
      <div className="w-full px-4 pt-12 pb-6 sm:px-6 sm:pt-16 sm:pb-8 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-3 lg:gap-10">
          {site.footerGroups.map((group) => (
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
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-emerald-500"
                  >
                    {link.label}
                    {link.href.startsWith("http") && (
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

        <div className="mt-16 lg:grid lg:grid-cols-3 lg:gap-10">
          <div className="flex w-full items-center justify-between lg:col-start-2 lg:w-auto lg:justify-start lg:gap-4">
            {site.socialLinks.map((social) => {
              const Icon = socialIcons[social.service]

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-emerald-500"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        <a
          href={site.homeHref}
          className="mt-10 inline-flex items-center gap-1.5 text-foreground"
          aria-label="Livepeer home"
        >
          <LivepeerGradientSymbol className="h-4 w-auto" />
          <LivepeerWordmark className="h-4 w-auto" />
        </a>

        <div className="mt-12">
          <p className="text-xs text-muted-foreground">{site.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
