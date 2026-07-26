"use client"

import { type FormEvent, useState } from "react"
import { ArrowRight, Check, Copy, Share2, TrendingUp } from "lucide-react"
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
  const [showTopHundred, setShowTopHundred] = useState(false)
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
      <aside className="dark relative z-10 flex min-h-[calc(100svh-1.5rem)] w-full max-w-sm flex-col overflow-y-auto rounded-2xl border border-white/20 bg-white/[0.055] px-6 py-6 text-foreground shadow-2xl shadow-black/30 backdrop-blur-md backdrop-saturate-150 sm:min-h-[calc(100svh-2rem)] sm:px-8 sm:py-8 md:h-[calc(100svh-2rem)] md:min-h-0">
        <div
          className="flex items-end gap-2 self-start text-white"
          aria-label="Livepeer Agent"
        >
          <LivepeerGradientLockup
            className="h-4 w-auto"
            aria-hidden="true"
          />
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
          <p className="mt-6 text-pretty text-sm leading-6 text-muted-foreground">
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
                <div className="flex items-start justify-between gap-4">
                  <LivepeerGradientLockup className="h-4 w-auto" />
                  <span className="flex items-center gap-1 text-[10px] font-medium tracking-[0.12em] text-emerald-400 uppercase">
                    <TrendingUp className="size-3" aria-hidden="true" />
                    Early access
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.12em] text-white/50 uppercase">
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
                    <p className="text-[10px] tracking-[0.12em] text-white/50 uppercase">
                      Referrals
                    </p>
                    <p className="mt-1 text-2xl leading-none font-medium tabular-nums">
                      0
                    </p>
                  </div>
                </div>

                <p className="mt-7 max-w-64 text-sm leading-5 text-white/70">
                  I&apos;m joining the open video agent.
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-4">
                  <p className="min-w-0 truncate font-mono text-[10px] text-white/55">
                    {inviteUrl}
                  </p>
                  <div className="flex shrink-0 gap-1.5">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      aria-label="Copy invite link"
                      onClick={copyInvite}
                      className="rounded-sm"
                    >
                      {copied ? <Check /> : <Copy />}
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      aria-label="Share invite"
                      onClick={shareInvite}
                      className="rounded-sm bg-emerald-500 text-white hover:bg-emerald-400"
                    >
                      <Share2 />
                    </Button>
                  </div>
                </div>
              </section>

              <section aria-labelledby="waitlist-leaders">
                <div className="flex items-center justify-between">
                  <h2 id="waitlist-leaders" className="text-sm font-medium">
                    Waitlist
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Top referrals
                  </span>
                </div>
                <div className="mt-3 overflow-hidden rounded-md border">
                  <ol
                    className={
                      showTopHundred
                        ? "max-h-72 divide-y overflow-y-auto overscroll-contain"
                        : "divide-y"
                    }
                  >
                    <li
                      className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-2 border-b border-emerald-400/20 bg-emerald-400/10 px-3 py-3 text-sm"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="grid size-5 place-items-center rounded-full bg-emerald-400 text-black">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span className="truncate font-medium">You</span>
                      <span className="font-mono text-xs text-emerald-400 tabular-nums">
                        #2,419
                      </span>
                    </li>
                    {leaders
                      .slice(0, showTopHundred ? 100 : 5)
                      .map((person, index) => (
                        <li
                          key={`${person.name}-${index}`}
                          className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-2 bg-background px-3 py-2.5 text-sm"
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
                  </ol>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-10 w-full rounded-none border-t text-xs"
                    onClick={() => setShowTopHundred((visible) => !visible)}
                  >
                    {showTopHundred ? "Show top 5" : "Load top 100"}
                  </Button>
                </div>
              </section>
            </div>
          )}
        </div>
      </aside>

      <section className="absolute inset-0 isolate overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_42%,rgba(255,255,255,0.1)_0%,transparent_48%)]" />
        <LivepeerCubeStream inverted className="opacity-90" />
        <div className="pointer-events-none absolute inset-y-0 inset-x-0 z-10 flex items-center px-6 sm:px-10 md:pr-[27rem]">
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
