"use client"

import { type FormEvent, useState } from "react"
import { ArrowRight, Check, Copy } from "lucide-react"
import { toast } from "sonner"

import { LivepeerGradientLockup } from "@/components/brand"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const firstNames = [
  "Maya",
  "Owen",
  "Priya",
  "Noah",
  "Avery",
  "Theo",
  "Sofia",
  "Eli",
  "Nia",
  "Leo",
]
const lastNames = [
  "Chen",
  "Park",
  "Shah",
  "Williams",
  "Kim",
  "Martinez",
  "Okafor",
  "Nguyen",
  "Patel",
  "Rivera",
]

const leaders = Array.from({ length: 100 }, (_, index) => ({
  name: `${firstNames[index % firstNames.length]} ${
    lastNames[Math.floor(index / firstNames.length) % lastNames.length]
  }`,
  referrals: Math.max(3, Math.round(142 * Math.pow(0.965, index))),
}))

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

  return (
    <main className="relative flex min-h-svh justify-end overflow-hidden bg-black p-3 sm:p-4">
      <aside className="dark relative z-10 flex min-h-[calc(100svh-1.5rem)] w-full max-w-sm flex-col overflow-y-auto rounded-2xl border border-white/20 bg-white/[0.055] px-6 py-6 text-foreground shadow-2xl shadow-black/30 backdrop-blur-md backdrop-saturate-150 sm:min-h-[calc(100svh-2rem)] sm:px-8 sm:py-8 md:h-[calc(100svh-2rem)] md:min-h-0">
        <div
          className="flex items-end gap-2 self-start text-white"
          aria-label="Livepeer Agent"
        >
          <LivepeerGradientLockup className="h-4 w-auto" aria-hidden="true" />
          <span
            className="translate-y-[0.08em] font-runner text-base leading-none font-medium tracking-[-0.04em]"
            aria-hidden="true"
          >
            AGENT
          </span>
        </div>

        <div
          className={
            joined
              ? "mt-10 max-w-full sm:mt-12"
              : "mt-16 max-w-full sm:mt-24 md:mt-28"
          }
        >
          <h1 className="mt-4 font-display text-[clamp(2.5rem,3vw,3rem)] leading-[0.96] font-medium tracking-[-0.045em] text-balance">
            The Open Video Agent
          </h1>
          <p className="mt-6 text-sm leading-6 text-pretty text-muted-foreground">
            Livepeer agent is a harness for multimodal media generation, from
            right within Claude. Running on Livepeer&apos;s open network.
          </p>
        </div>

        <div className={joined ? "pt-10" : "mt-auto pt-14"}>
          {!joined ? (
            <form onSubmit={joinWaitlist}>
              <label htmlFor="waitlist-email" className="text-sm font-medium">
                Get early access
              </label>
              <div className="mt-3 flex h-16 gap-1.5 rounded-sm border border-white/25 bg-transparent p-1.5 text-white transition-shadow focus-within:border-white/45 focus-within:ring-2 focus-within:ring-white/20">
                <Input
                  id="waitlist-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-base text-white shadow-none placeholder:text-white/45 focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  size="icon-lg"
                  aria-label="Join the waitlist"
                  className="h-full w-14 rounded-[3px] border border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-500"
                  style={{
                    backgroundImage:
                      "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
                  }}
                >
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <section
                className="relative isolate overflow-hidden rounded-md border border-emerald-400/30 bg-black p-5 text-white"
                aria-labelledby="share-card-title"
              >
                <div className="pointer-events-none absolute -top-24 -right-20 -z-10 size-56 rounded-full bg-emerald-400/25 blur-3xl" />
                <LivepeerGradientLockup className="h-4 w-auto" />

                <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-4">
                  <div>
                    <p className="text-xs text-white/50">
                      Waitlist position
                    </p>
                    <p
                      id="share-card-title"
                      className="mt-1 text-5xl leading-none font-semibold tracking-[-0.06em] text-emerald-400 tabular-nums"
                    >
                      #2,419
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/50">
                      Referrals
                    </p>
                    <p className="mt-1 text-2xl leading-none font-medium tabular-nums">
                      0
                    </p>
                  </div>
                </div>

              </section>

              <div>
                <div className="flex items-center gap-2 rounded-md border bg-white/[0.04] p-1.5 pl-4">
                  <p className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
                    {inviteUrl}
                  </p>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label="Copy referral link"
                    onClick={copyInvite}
                    className="shrink-0 rounded-full"
                  >
                    {copied ? <Check /> : <Copy />}
                  </Button>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Climb the leaderboard by referring friends.
              </p>

              <section aria-labelledby="waitlist-leaders">
                <h2 id="waitlist-leaders" className="text-sm font-medium">
                  Leaderboard
                </h2>
                <div className="mt-3 overflow-hidden rounded-md border">
                  <div className="flex items-center justify-between border-b px-3 py-2 text-xs text-muted-foreground">
                    <span>Person</span>
                    <span>Referrals</span>
                  </div>
                  <ol className="divide-y">
                    {leaders.map((person, index) => (
                      <li
                        key={`${person.name}-${index}`}
                        className="flex items-center justify-between gap-4 px-3 py-2.5 text-sm"
                      >
                        <span className="truncate">{person.name}</span>
                        <span className="font-mono text-xs tabular-nums">
                          {person.referrals}
                        </span>
                      </li>
                    ))}
                    <li
                      className="flex items-center justify-between gap-4 bg-emerald-400/10 px-3 py-3 text-sm"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="truncate font-medium">You</span>
                      <span className="font-mono text-xs text-emerald-400 tabular-nums">
                        0
                      </span>
                    </li>
                  </ol>
                </div>
              </section>
            </div>
          )}
        </div>
      </aside>

      <section className="absolute inset-0 isolate overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_42%,rgba(255,255,255,0.1)_0%,transparent_48%)]" />
        <LivepeerCubeStream inverted className="opacity-90" />
        <div className="pointer-events-none absolute inset-x-0 inset-y-0 z-10 flex items-center px-6 sm:px-10 md:pr-[27rem]">
          <h2
            className="flex w-full items-end justify-center gap-[clamp(0.75rem,1.6vw,2rem)] text-white/90"
            aria-label="Livepeer Agent"
          >
            <LivepeerGradientLockup
              className="h-[clamp(2rem,4.5vw,4.5rem)] w-auto"
              aria-hidden="true"
            />
            <span
              className="translate-y-[0.12em] font-runner text-[clamp(2rem,4.5vw,4.5rem)] leading-none font-medium tracking-[-0.045em]"
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
