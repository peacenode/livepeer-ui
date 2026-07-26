import { DiscordIcon, GitHubIcon } from "@/components/brand-social-icons"

export function PlaybooksNav() {
  return (
    <nav className="hidden items-center gap-1 text-sm md:flex">
      <a
        href="https://github.com/livepeer"
        target="_blank"
        rel="noreferrer"
        className="hidden size-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-emerald-500 md:flex"
        aria-label="Livepeer on GitHub"
        title="GitHub"
      >
        <GitHubIcon className="size-4" />
      </a>
      <a
        href="https://discord.gg/livepeer"
        target="_blank"
        rel="noreferrer"
        className="hidden size-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-emerald-500 md:flex"
        aria-label="Join Livepeer on Discord"
        title="Discord"
      >
        <DiscordIcon className="size-4" />
      </a>
      <div className="flex items-center gap-1">
        <a
          href="https://docs.livepeer.org/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 rounded-sm px-2 py-2 text-xs text-muted-foreground transition-colors hover:text-emerald-500 md:px-3 md:text-sm"
        >
          Docs
          <span className="font-sans" aria-hidden="true">
            ↗
          </span>
        </a>
        <a
          href="/mockups/livepeer-org/agent"
          className="flex items-center gap-1 rounded-sm px-2 py-2 text-xs text-muted-foreground transition-colors hover:text-emerald-500 md:px-3 md:text-sm"
        >
          Agent
        </a>
      </div>
    </nav>
  )
}
