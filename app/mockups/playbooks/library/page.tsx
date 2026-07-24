import type { Metadata } from "next"

import { getSourcePlaybooks } from "../daydream-source"
import { InstallRunnerFooter } from "../install-runner-footer"
import { SourceCatalog } from "../source-catalog"

export const metadata: Metadata = {
  title: "Playbooks",
}

export default async function PlaybooksLibraryPage() {
  const playbooks = await getSourcePlaybooks()

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-medium text-balance sm:text-4xl">
              Playbooks
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Production-ready recipes for agents. Choose a result, review the
              workflow, and run it with Runner.
            </p>
          </div>
          <p className="text-sm text-muted-foreground tabular-nums">
            {playbooks.length} playbooks
          </p>
        </div>
        <div className="mt-8">
          <SourceCatalog playbooks={playbooks} />
        </div>
      </div>
      <InstallRunnerFooter
        title="Run any playbook with Runner."
        description="Install the plugin once, choose a playbook, and paste it into the agent of your choice."
      />
    </main>
  )
}
