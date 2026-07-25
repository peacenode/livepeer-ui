import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Install",
}

const installCommand = "npm install -g @livepeer/runner"

export default function PlaybooksInstallPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-14">
      <header>
        <h1 className="text-3xl font-medium text-balance">Install Runner</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Add Runner to Codex or Cowork, then use any playbook from your agent.
        </p>
      </header>
      <section className="mt-10 border-y py-8">
        <h2 className="text-sm font-medium">Install command</h2>
        <pre className="mt-4 overflow-x-auto rounded-sm bg-foreground px-4 py-3 font-mono text-xs leading-relaxed text-background">
          {installCommand}
        </pre>
        <p className="mt-3 text-xs text-muted-foreground">
          Run once from your terminal, then sign in when prompted.
        </p>
      </section>
    </main>
  )
}
