import { CodeIcon } from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"

const resourceGroups = [
  {
    title: "Build",
    links: [
      { label: "Documentation", href: "https://docs.livepeer.org/" },
      { label: "Ecosystem", href: "https://livepeer.org/ecosystem" },
      { label: "GitHub", href: "https://github.com/livepeer" },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "Primer", href: "https://livepeer.org/primer" },
      { label: "Roadmap", href: "https://roadmap.livepeer.org/roadmap" },
      { label: "Delegate LPT", href: "https://explorer.livepeer.org/" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/livepeer" },
      { label: "Forum", href: "https://forum.livepeer.org/" },
      {
        label: "Research",
        href: "https://forum.livepeer.org/c/research/15",
      },
    ],
  },
]

export function PlaybooksFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1fr_2fr] sm:px-6">
        <div>
          <LivepeerSymbol className="h-7 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Open video infrastructure powered by independent GPU operators.
          </p>
          <a
            href="https://github.com/livepeer"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <CodeIcon className="size-4" aria-hidden="true" />
            Contribute on GitHub
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {resourceGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-medium">{group.title}</h2>
              <div className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
