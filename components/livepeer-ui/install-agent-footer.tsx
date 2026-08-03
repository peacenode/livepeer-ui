import { CopyButton } from "@/components/copy-button"
import { LivepeerWordmark } from "@/components/brand"
import { LivepeerAgentDeltaStream } from "@/components/livepeer-ui/livepeer-agent-delta-stream"
import { cn } from "@/lib/utils"

const mcpServerUrl = "https://livepeer.org/api/mcp"

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
        "relative mt-20 min-h-[42rem] overflow-hidden bg-background px-4 text-foreground sm:min-h-[48rem] sm:px-6",
        className
      )}
    >
      <LivepeerAgentDeltaStream />
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
            className="translate-y-[0.17em] font-agent text-3xl leading-none font-medium tracking-tight sm:text-4xl"
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
        <div className="mt-9 flex max-w-full flex-col items-center">
          <p className="mb-9 text-sm text-muted-foreground">
            In your agent&apos;s MCP / connector settings, add this server:
          </p>
          <div className="inline-flex max-w-full items-center gap-4 rounded-sm bg-secondary px-5 py-4 text-left text-secondary-foreground">
            <code className="min-w-0 break-all font-mono text-xs leading-relaxed sm:text-sm">
              {mcpServerUrl}
            </code>
            <CopyButton
              value={mcpServerUrl}
              className="size-8 shrink-0 rounded-none bg-transparent text-secondary-foreground/40 transition-colors hover:bg-transparent hover:text-secondary-foreground"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
