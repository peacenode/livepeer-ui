"use client"

import { type FormEvent, useState } from "react"
import { ArrowRight, Check, Copy, Share2 } from "lucide-react"
import { toast } from "sonner"

import { LivepeerLockup } from "@/components/brand"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const leaders = [
  { name: "Maya Chen", referrals: 142 },
  { name: "Owen Park", referrals: 118 },
  { name: "Priya Shah", referrals: 96 },
]

export function WaitlistMockup() {
  const [email, setEmail] = useState("")
  const [joined, setJoined] = useState(false)
  const [copied, setCopied] = useState(false)
  const inviteId = email.split("@")[0].replace(/[^a-z0-9]/gi, "") || "invite"
  const inviteUrl = `livepeer.org/agent/${inviteId.toLowerCase()}`

  function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setJoined(true)
    toast.success("You’re on the Livepeer Agent waitlist")
  }

  async function copyInvite() {
    await navigator.clipboard?.writeText(`https://${inviteUrl}`)
    setCopied(true)
    toast.success("Invite link copied")
    window.setTimeout(() => setCopied(false), 1600)
  }

  async function shareInvite() {
    if (navigator.share) {
      await navigator.share({
        title: "Livepeer Agent",
        text: "Join me on the Livepeer Agent waitlist.",
        url: `https://${inviteUrl}`,
      })
      return
    }

    await copyInvite()
  }

  return (
    <main className="relative flex min-h-svh justify-end overflow-hidden bg-black p-3 sm:p-4">
      <aside className="dark relative z-10 flex min-h-[calc(100svh-1.5rem)] w-full max-w-sm flex-col overflow-y-auto rounded-2xl border border-white/15 bg-background/65 px-6 py-6 text-foreground shadow-2xl shadow-black/40 backdrop-blur-2xl sm:min-h-[calc(100svh-2rem)] sm:px-8 sm:py-8 md:h-[calc(100svh-2rem)] md:min-h-0">
        <LivepeerLockup className="h-4 w-auto self-start" />

        <div
          className={
            joined
              ? "mt-10 max-w-full sm:mt-12"
              : "mt-16 max-w-full sm:mt-24 md:mt-28"
          }
        >
          <p className="text-sm font-medium text-muted-foreground">
            Livepeer Agent
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2.5rem,3vw,3rem)] leading-[0.96] font-medium tracking-[-0.045em]">
            Open media infrastructure, ready for your agent.
          </h1>
          <p className="mt-6 text-pretty text-sm leading-6 text-muted-foreground">
            Generate, edit, and stream image, video, and audio from the tools
            you already use. Join the waitlist for early access.
          </p>
        </div>

        <div className={joined ? "pt-10" : "mt-auto pt-14"}>
          {!joined ? (
            <form onSubmit={joinWaitlist}>
              <label htmlFor="waitlist-email" className="text-sm font-medium">
                Get early access
              </label>
              <div className="mt-3 flex h-16 gap-1.5 rounded-sm border border-white/15 bg-white p-1.5 text-black shadow-lg shadow-black/20 transition-shadow focus-within:ring-2 focus-within:ring-white/40">
                <Input
                  id="waitlist-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  aria-describedby="waitlist-note"
                  className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-base text-black shadow-none placeholder:text-black/45 focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  size="icon-lg"
                  aria-label="Join the waitlist"
                  className="h-full w-14 rounded-sm border border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-500"
                  style={{
                    backgroundImage:
                      "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
                  }}
                >
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
              <p
                id="waitlist-note"
                className="mt-3 text-xs leading-5 text-muted-foreground"
              >
                Product updates and early-access invites only.
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <div
                className="flex items-start gap-3 border-t pt-4"
                role="status"
                aria-live="polite"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground text-background">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium">You’re number 2,419.</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Share your link to move up the list.
                  </p>
                </div>
              </div>

              <section aria-labelledby="waitlist-leaders">
                <div className="flex items-center justify-between">
                  <h2 id="waitlist-leaders" className="text-sm font-medium">
                    Waitlist
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Top referrals
                  </span>
                </div>
                <ol className="mt-3 divide-y border-y">
                  {leaders.map((person, index) => (
                    <li
                      key={person.name}
                      className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-2 py-2.5 text-sm"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        {index + 1}
                      </span>
                      <span className="truncate">{person.name}</span>
                      <span className="font-mono text-xs tabular-nums">
                        {person.referrals}
                      </span>
                    </li>
                  ))}
                  <li className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-2 py-2.5 text-sm">
                    <span className="font-mono text-xs text-muted-foreground">
                      —
                    </span>
                    <span className="truncate font-medium">You</span>
                    <span className="font-mono text-xs tabular-nums">0</span>
                  </li>
                </ol>
              </section>

              <section className="bg-foreground p-4 text-background">
                <p className="text-xs text-background/60">Share card</p>
                <p className="mt-3 max-w-52 text-xl leading-tight font-medium text-balance">
                  I’m early to Livepeer Agent.
                </p>
                <div className="mt-5 flex items-end justify-between gap-3 border-t border-background/20 pt-3">
                  <div className="min-w-0">
                    <p className="text-[10px] text-background/60">
                      Join with my invite
                    </p>
                    <p className="mt-1 truncate text-xs">{inviteUrl}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      aria-label="Copy invite link"
                      onClick={copyInvite}
                    >
                      {copied ? <Check /> : <Copy />}
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      aria-label="Share invite"
                      onClick={shareInvite}
                    >
                      <Share2 />
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </aside>

      <section className="absolute inset-0 isolate overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_42%,rgba(255,255,255,0.1)_0%,transparent_48%)]" />
        <LivepeerCubeStream inverted className="opacity-90" />
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 px-6 sm:bottom-10 sm:px-10 md:pr-[27rem]">
          <h2
            className="flex items-end gap-[clamp(0.75rem,1.6vw,2rem)] text-white/90"
            aria-label="Livepeer Agent"
          >
            <LivepeerLockup
              className="h-[clamp(2.25rem,6vw,6rem)] w-auto"
              aria-hidden="true"
            />
            <span
              className="translate-y-[0.12em] font-runner text-[clamp(2.25rem,6vw,6rem)] leading-none font-medium tracking-[-0.045em]"
              aria-hidden="true"
            >
              AGENT
            </span>
          </h2>
        </div>
      </section>
    </main>
  )
}
