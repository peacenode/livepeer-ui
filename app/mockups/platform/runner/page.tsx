import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  CableIcon,
  KeyRoundIcon,
  TerminalIcon,
} from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Runner",
}

const installCommand =
  "npx skills add livepeer/agent-skills --global --agent codex claude-code"

export default function RunnerPage() {
  return (
    <PlatformPage title="Runner">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-medium text-balance">
          Run media workflows from anywhere.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Runner connects agents and applications to the workflows in this
          project. Use the CLI directly, authorize the MCP from any agent, or
          authenticate an application with an API key.
        </p>
      </div>

      <div className="max-w-4xl border-y">
        <section className="grid gap-5 border-b py-7 md:grid-cols-[180px_1fr]">
          <div className="flex items-center gap-3">
            <TerminalIcon className="size-5" aria-hidden="true" />
            <h3 className="font-medium">CLI</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Install Runner globally, then sign in to this project.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-foreground px-4 py-3 font-mono text-xs leading-relaxed text-background">
              {installCommand}
            </pre>
          </div>
        </section>

        <section className="grid gap-5 border-b py-7 md:grid-cols-[180px_1fr]">
          <div className="flex items-center gap-3">
            <CableIcon className="size-5" aria-hidden="true" />
            <h3 className="font-medium">MCP</h3>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Add the Runner MCP to any compatible agent. OAuth connects the
              agent to your Livepeer account without copying an API key.
            </p>
            <Button className="mt-4">Connect with OAuth</Button>
          </div>
        </section>

        <section className="grid gap-5 py-7 md:grid-cols-[180px_1fr]">
          <div className="flex items-center gap-3">
            <KeyRoundIcon className="size-5" aria-hidden="true" />
            <h3 className="font-medium">API</h3>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Build Runner into a product or service with a project API key.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              nativeButton={false}
              render={<Link href="/mockups/platform/api" />}
            >
              Create an API key
              <ArrowRightIcon />
            </Button>
          </div>
        </section>
      </div>
    </PlatformPage>
  )
}
