"use client"

import Link from "next/link"

const items = [{ label: "Playbooks", href: "/mockups/playbooks#playbooks" }]

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function DiscordLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.164-.394-.406-.875-.618-1.25a.077.077 0 0 0-.078-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.319 13.58.1 18.058a.082.082 0 0 0 .031.056c2.053 1.508 4.041 2.423 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 12.3 12.3 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.007.128 12.3 12.3 0 0 1-1.873.89.077.077 0 0 0-.04.107c.36.698.771 1.363 1.224 1.993a.076.076 0 0 0 .084.029c1.961-.607 3.95-1.522 6.002-3.03a.077.077 0 0 0 .032-.055c.5-5.177-.839-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419Z" />
    </svg>
  )
}

export function PlaybooksNav() {
  return (
    <nav className="flex items-center gap-1 text-sm">
      <a
        href="https://github.com/livepeer"
        target="_blank"
        rel="noreferrer"
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        aria-label="Livepeer on GitHub"
        title="GitHub"
      >
        <GitHubLogo className="size-4" />
      </a>
      <a
        href="https://discord.gg/livepeer"
        target="_blank"
        rel="noreferrer"
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        aria-label="Join Livepeer on Discord"
        title="Discord"
      >
        <DiscordLogo className="size-4" />
      </a>
      <div className="flex items-center gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-2 py-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground sm:px-3"
          >
            {item.label}
          </Link>
        ))}
        <a
          href="https://docs.livepeer.org/v1/orchestrators/guides/get-started"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:block"
        >
          Provide GPUs
        </a>
        <a
          href="https://docs.livepeer.org/"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:block"
        >
          Docs
        </a>
      </div>
      <Link
        href="/mockups/playbooks/install"
        className="rounded-md bg-foreground px-2.5 py-2 font-medium text-background transition-colors hover:bg-foreground/80 sm:px-3"
      >
        Install
      </Link>
    </nav>
  )
}
