import type { Metadata } from "next"

import { InstallCommand } from "./install-command"

export const metadata: Metadata = {
  title: "Install Runner",
}

export default function InstallPage() {
  return (
    <main className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-none md:h-dvh">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="max-w-2xl">
          <h1 className="text-2xl font-medium text-balance">Install Runner</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Add Runner to Codex or Claude Code with one command.
          </p>
        </header>
        <section className="mt-8">
          <InstallCommand />
          <p className="mt-3 text-xs text-muted-foreground">
            Run this once from your terminal. Runner will be available across
            projects.
          </p>
        </section>
      </div>
    </main>
  )
}
