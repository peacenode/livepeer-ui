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
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-light tracking-tight text-balance sm:text-5xl">
            Playbooks
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-balance text-muted-foreground">
            Playbooks are step-by-step production recipes for AI agents. Each
            one brings together the prompts, models, inputs, and workflow needed
            to produce a specific result. Choose one, customize the brief, then
            copy it into your agent to run.
          </p>
        </div>
        <div className="mt-4">
          <SourceCatalog playbooks={playbooks} />
        </div>
      </div>
      <InstallRunnerFooter title="Run any playbook with Runner." />
    </main>
  )
}
