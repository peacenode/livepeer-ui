import type { Metadata } from "next"
import { ArrowUpIcon } from "lucide-react"

import { LivepeerLockup, LivepeerSymbol } from "@/components/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Agent - Livepeer",
}

function AgentAvatar() {
  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground">
      <LivepeerSymbol className="h-3 w-auto text-background" />
    </div>
  )
}

export default function MockupAgentPage() {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <LivepeerLockup className="h-4 w-auto" />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-muted-foreground">Agent</span>
        </div>
        <Avatar className="size-8">
          <AvatarFallback className="bg-foreground text-xs text-background">
            P
          </AvatarFallback>
        </Avatar>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-8">
          <div className="flex justify-end">
            <p className="max-w-md rounded-2xl bg-muted px-4 py-2.5 text-sm">
              How much have we spent on inference this month?
            </p>
          </div>
          <div className="flex gap-3">
            <AgentAvatar />
            <div className="flex min-w-0 flex-col gap-3 pt-1">
              <p className="text-sm leading-relaxed">
                You&rsquo;ve spent $2,148.90 on inference so far in July — about
                12% above last month&rsquo;s pace. Most of it comes from the
                live-video-to-video pipeline in us-west.
              </p>
              <Button variant="outline" size="sm" className="self-start">
                View billing
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <p className="max-w-md rounded-2xl bg-muted px-4 py-2.5 text-sm">
              Spin up a realtime video-to-video pipeline in us-west.
            </p>
          </div>
          <div className="flex gap-3">
            <AgentAvatar />
            <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1">
              <p className="text-sm leading-relaxed">
                Here&rsquo;s the configuration I&rsquo;d deploy. Confirm and
                it&rsquo;ll be live in about a minute.
              </p>
              <Card className="gap-4">
                <CardHeader>
                  <CardTitle className="text-sm">New pipeline</CardTitle>
                  <Badge variant="outline" className="ml-auto">
                    Awaiting confirmation
                  </Badge>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm">
                  {[
                    ["Pipeline", "live-video-to-video"],
                    ["Model", "streamdiffusion/sd-turbo"],
                    ["Region", "us-west"],
                    ["GPUs", "2 × H100 80GB"],
                    ["Est. cost", "$3.40 / hr"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="truncate font-mono text-xs leading-5">
                        {value}
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm">Deploy</Button>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="px-4 pb-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
          <form className="flex items-center gap-2 rounded-2xl border bg-background p-2 shadow-xs">
            <input
              placeholder="Ask the agent"
              aria-label="Message the agent"
              className="h-9 w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button size="icon-sm" aria-label="Send">
              <ArrowUpIcon />
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            The agent can manage pipelines, compute, and billing on your behalf.
          </p>
        </div>
      </footer>
    </div>
  )
}
