"use client"

import { type FormEvent, useState } from "react"
import { ArrowRight, Check, Copy, Share2 } from "lucide-react"
import { toast } from "sonner"

import { LivepeerLockup } from "@/components/brand"
import { LivepeerSymbol3D } from "@/components/mockups/livepeer-symbol-3d"
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
    <main className="grid min-h-svh bg-background text-foreground md:grid-cols-[23rem_minmax(0,1fr)]">
      <aside className="relative z-10 flex min-h-[34rem] flex-col overflow-y-auto border-b bg-background px-6 py-6 sm:px-8 sm:py-8 md:h-svh md:border-r md:border-b-0">
        <LivepeerLockup className="h-4 w-auto self-start" />

        <div
          className={
            joined
              ? "mt-10 max-w-[18rem] sm:mt-12"
              : "mt-16 max-w-[18rem] sm:mt-24 md:mt-28"
          }
        >
          <p className="text-sm font-medium text-muted-foreground">
            Livepeer Agent
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2.5rem,4vw,3.75rem)] leading-[0.96] font-medium tracking-[-0.045em]">
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
              <div className="mt-3 flex gap-2">
                <Input
                  id="waitlist-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  aria-describedby="waitlist-note"
                  className="h-10 min-w-0 flex-1"
                />
                <Button
                  type="submit"
                  size="icon-lg"
                  aria-label="Join the waitlist"
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

      <section className="relative isolate min-h-[34rem] overflow-hidden bg-muted md:min-h-svh">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,var(--background)_0%,transparent_58%)] opacity-70" />
        <LivepeerSymbol3D
          showOnMobile
          className="rounded-none opacity-95"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 px-6 sm:bottom-10 sm:px-10">
          <p className="text-center font-display text-[clamp(2.5rem,8vw,8.5rem)] leading-none font-medium tracking-[-0.06em] text-foreground/90 text-balance">
            LIVEPEER AGENT
          </p>
        </div>
      </section>
    </main>
  )
}
