import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

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
      <div className="max-w-3xl border-y">
        <section className="border-b py-8">
          <h2 className="text-xl font-medium">Get started in Codex/Cowork</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Install Runner, then use this project&rsquo;s workflows from your
            agent.
          </p>
          <pre className="mt-5 overflow-x-auto rounded-xl bg-foreground px-4 py-3 font-mono text-xs leading-relaxed text-background">
            {installCommand}
          </pre>
        </section>

        <section className="py-8">
          <h2 className="text-xl font-medium">Build your own app</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Create a project API key and use the Livepeer API to run workflows
            from your application.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/mockups/platform/api" />}
            >
              Create an API key
              <ArrowRightIcon />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href="https://docs.livepeer.org/v1/developers/quick-start"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              View docs
              <ArrowUpRightIcon />
            </Button>
          </div>
        </section>
      </div>
    </PlatformPage>
  )
}
