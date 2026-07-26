"use client"

import { FormEvent, useMemo, useState } from "react"
import {
  ArrowRightIcon,
  AtSignIcon,
  CheckIcon,
  CopyIcon,
  LinkIcon,
  Share2Icon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const leaders = [
  { name: "Maya Chen", handle: "@mayamakes", referrals: 142, initials: "MC" },
  { name: "Owen Park", handle: "@owenpark", referrals: 118, initials: "OP" },
  { name: "Priya Shah", handle: "@priyashah", referrals: 96, initials: "PS" },
  { name: "Theo Martin", handle: "@theomartin", referrals: 83, initials: "TM" },
  { name: "Ada Williams", handle: "@adaw", referrals: 71, initials: "AW" },
]

function cleanHandle(value: string) {
  return value.trim().replace(/^@/, "")
}

export function WaitlistMockup() {
  const [email, setEmail] = useState("")
  const [twitter, setTwitter] = useState("")
  const [joined, setJoined] = useState(false)
  const [copied, setCopied] = useState(false)

  const handle = cleanHandle(twitter) || "yourname"
  const referralLink = useMemo(
    () => `daydream.live/invite/${handle.toLowerCase()}`,
    [handle]
  )

  function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setJoined(true)
    toast.success("You’re on the waitlist")
  }

  async function copyReferralLink() {
    await navigator.clipboard?.writeText(`https://${referralLink}`)
    setCopied(true)
    toast.success("Referral link copied")
    window.setTimeout(() => setCopied(false), 1600)
  }

  async function shareReferral() {
    const shareData = {
      title: "Join me on the Daydream waitlist",
      text: "I’m early to Daydream. Join the waitlist with my invite:",
      url: `https://${referralLink}`,
    }

    if (navigator.share) {
      await navigator.share(shareData)
      return
    }

    await copyReferralLink()
  }

  return (
    <main className="min-h-svh bg-background text-foreground">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#"
          className="flex items-center gap-2 font-display text-base font-medium"
        >
          <span className="grid size-7 place-items-center rounded-md bg-foreground text-background">
            <SparklesIcon className="size-3.5" aria-hidden="true" />
          </span>
          Daydream
        </a>
        <Badge variant="secondary" className="font-normal">
          Private beta
        </Badge>
      </nav>

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-12 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-24 lg:py-28">
        <section className="flex min-w-0 flex-col justify-center">
          <Badge variant="outline" className="mb-6 w-fit font-normal">
            2,418 people are waiting
          </Badge>
          <h1 className="max-w-2xl font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.94] font-normal tracking-[-0.045em] text-balance">
            Make video with anyone.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg">
            Join the first group to try a new creative workspace for generating,
            editing, and shipping video with AI.
          </p>

          {!joined ? (
            <form
              onSubmit={joinWaitlist}
              className="mt-9 flex max-w-xl flex-col gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="twitter">X handle</Label>
                  <div className="relative">
                    <AtSignIcon
                      className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="twitter"
                      placeholder="yourname"
                      value={twitter}
                      onChange={(event) => setTwitter(event.target.value)}
                      required
                      autoComplete="off"
                      className="h-11 pl-9"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-fit">
                Join the waitlist
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
              </Button>
              <p className="text-xs leading-5 text-muted-foreground">
                We’ll only email you about early access. No spam.
              </p>
            </form>
          ) : (
            <div className="mt-9 max-w-xl rounded-lg border bg-muted/30 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-background">
                  <CheckIcon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-medium">
                    You’re number 2,419
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Share your link to move up. Every friend who joins gets you
                    one place closer to early access.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
                  <LinkIcon
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="truncate">{referralLink}</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={copyReferralLink}
                >
                  {copied ? (
                    <CheckIcon data-icon="inline-start" aria-hidden="true" />
                  ) : (
                    <CopyIcon data-icon="inline-start" aria-hidden="true" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          )}
        </section>

        <aside className="flex flex-col gap-5">
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription className="mt-1">
                    Top referrals this week
                  </CardDescription>
                </div>
                <UsersIcon
                  className="size-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <ol>
                {leaders.map((person, index) => (
                  <li
                    key={person.handle}
                    className="flex items-center gap-3 border-t px-6 py-3"
                  >
                    <span
                      className={cn(
                        "w-4 text-center text-xs font-medium tabular-nums",
                        index < 3 ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </span>
                    <Avatar className="size-8">
                      <AvatarFallback className="text-[10px]">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {person.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {person.handle}
                      </p>
                    </div>
                    <span className="text-sm font-medium tabular-nums">
                      {person.referrals}
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-foreground text-background">
            <CardHeader>
              <CardDescription className="text-background/60">
                Your share card
              </CardDescription>
              <CardTitle className="max-w-xs text-2xl leading-tight font-normal text-balance">
                I’m early to Daydream.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-4 border-t border-background/15 pt-5">
                <div>
                  <p className="text-xs text-background/60">
                    Join with my invite
                  </p>
                  <p className="mt-1 max-w-48 truncate text-sm">
                    {referralLink}
                  </p>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  aria-label="Share your invite"
                  onClick={shareReferral}
                >
                  <Share2Icon aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  )
}
