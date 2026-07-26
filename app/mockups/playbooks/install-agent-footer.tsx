import { CopyButton } from "@/components/docs/copy-button"
import { LivepeerWordmark } from "@/components/brand"
import { RunnerDeltaStream } from "@/components/mockups/runner-delta-stream"
import { cn } from "@/lib/utils"

const command = "npm install -g @livepeer/agent"

export function InstallAgentFooter({
  title = "Create and edit images and video with your agent.",
  className,
}: {
  title?: string
  className?: string
}) {
  return (
    <section
      className={cn(
        "relative mt-20 min-h-[42rem] overflow-hidden bg-white px-4 text-foreground sm:min-h-[48rem] sm:px-6",
        className
      )}
    >
      <RunnerDeltaStream />
      <div className="absolute inset-x-4 top-[calc(25.5%+1.75rem)] z-10 mx-auto flex max-w-4xl flex-col items-center text-center sm:inset-x-6 sm:top-[calc(39%+1.75rem)]">
        <div
          className="flex items-end gap-3 text-foreground sm:gap-4"
          aria-label="Livepeer Agent"
        >
          <LivepeerWordmark
            className="h-8 w-auto sm:h-10"
            aria-hidden="true"
          />
          <span
            className="translate-y-[0.17em] font-runner text-3xl leading-none font-medium tracking-tight sm:text-4xl"
            aria-hidden="true"
          >
            AGENT
          </span>
        </div>
        <div className="mt-5 flex flex-col items-center">
          <h2 className="max-w-3xl text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-6xl">
            {title}
          </h2>
        </div>

        <div className="mt-9 inline-flex max-w-full items-center gap-4 rounded-sm bg-foreground px-5 py-4 text-left text-background shadow-sm">
          <code className="min-w-0 overflow-x-auto font-mono text-xs whitespace-nowrap sm:text-sm">
            <span className="mr-2 text-background/40" aria-hidden="true">
              $
            </span>
            {command}
          </code>
          <CopyButton
            value={command}
            className="size-8 shrink-0 rounded-none bg-transparent text-background/40 transition-colors hover:bg-transparent hover:text-background"
          />
        </div>
      </div>
    </section>
  )
}
