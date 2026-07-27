export function PlaybookLibraryHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-light tracking-tight text-balance sm:text-5xl">
        Playbooks
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-balance text-muted-foreground">
        Playbooks are step-by-step production recipes for AI agents. Each one
        brings together the prompts, models, inputs, and workflow needed to
        produce a specific result. Choose one, customize the brief, then copy
        it into your agent to run.
      </p>
    </div>
  )
}
