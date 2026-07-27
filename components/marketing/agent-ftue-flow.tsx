"use client"

import { useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  KeyRound,
  LockKeyhole,
  Mail,
  Monitor,
  Upload,
  UserRoundCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Screen = {
  label: string
  title: string
  description: string
  action: string
  icon: typeof Monitor
  mockup: "marketing" | "waitlist" | "oauth" | "agent" | "console" | "website"
}

type Phase = {
  number: string
  name: string
  timing: string
  summary: string
  flow: string
  screens: Screen[]
  needs: string[]
  questions: string[]
}

const phases: Phase[] = [
  {
    number: "01",
    name: "Waitlist + private beta",
    timing: "Ship first",
    summary:
      "Use an external waitlist as a temporary gate. The MCP is not shared publicly; approved emails can authenticate with OAuth.",
    flow: "Marketing page → Waitlist → Approved email → MCP OAuth → Agent",
    screens: [
      {
        label: "Screen 1",
        title: "Agent marketing page",
        description:
          "Explain the Agent and collect interest without exposing a public MCP install link.",
        action: "Primary action: Join the waitlist",
        icon: Monitor,
        mockup: "marketing",
      },
      {
        label: "Screen 2",
        title: "External waitlist",
        description:
          "Capture the email we will use to approve access and follow up with the user.",
        action: "Submit email",
        icon: Mail,
        mockup: "waitlist",
      },
      {
        label: "Screen 3",
        title: "MCP OAuth",
        description:
          "Only approved emails can authenticate. Everyone else returns to the waitlist.",
        action: "Continue with approved email",
        icon: LockKeyhole,
        mockup: "oauth",
      },
      {
        label: "Outcome",
        title: "Agent ready",
        description:
          "The approved user reaches the Agent in Claude or Codex and can begin using it.",
        action: "Start with the Agent",
        icon: Check,
        mockup: "agent",
      },
    ],
    needs: [
      "Agent marketing page with no public MCP sharing",
      "External waitlist connected to an exportable email list",
      "A simple way to approve waitlist emails",
      "MCP OAuth that checks the approved-email list",
      "Basic usage tracking tied to the authenticated user",
    ],
    questions: [
      "Who approves a waitlist email?",
      "How often do approved emails move into the OAuth gate?",
      "What does an unapproved user see when they try to authenticate?",
    ],
  },
  {
    number: "02",
    name: "Agent Console gate",
    timing: "Get up ASAP",
    summary:
      "Replace the external waitlist bridge with an owned sign-in, access gate, and onboarding surface in the Agent Console.",
    flow: "Marketing page → Agent Console → MCP OAuth → Agent",
    screens: [
      {
        label: "Screen 1",
        title: "Agent marketing page",
        description:
          "Keep the same product story, but send approved users into the Console instead of a manual handoff.",
        action: "Primary action: Get access",
        icon: Monitor,
        mockup: "marketing",
      },
      {
        label: "Screen 2",
        title: "Agent Console",
        description:
          "Own sign-in, access status, install guidance, and the user relationship in one place.",
        action: "Sign in",
        icon: UserRoundCheck,
        mockup: "console",
      },
      {
        label: "Screen 3",
        title: "Connect the Agent",
        description:
          "OAuth authorizes the MCP and confirms that the Agent is connected to the selected client.",
        action: "Authorize MCP",
        icon: KeyRound,
        mockup: "oauth",
      },
      {
        label: "Outcome",
        title: "Agent ready",
        description:
          "The Console can now connect authentication, onboarding progress, and usage to one user.",
        action: "Open in Claude or Codex",
        icon: Check,
        mockup: "agent",
      },
    ],
    needs: [
      "Agent Console sign-in",
      "Access status for waitlisted and approved users",
      "MCP OAuth connected to the Console user",
      "Install and connection confirmation",
      "Usage visible by authenticated user",
    ],
    questions: [
      "Does the Console replace the waitlist or ingest its existing users?",
      "Where does approval happen once the Console is live?",
      "Which clients do we support in the first Console release?",
    ],
  },
  {
    number: "03",
    name: "livepeer.org integration",
    timing: "Full website update",
    summary:
      "Make the Agent a first-class Livepeer product once the access and onboarding path is ready for broader traffic.",
    flow: "livepeer.org → Agent page → Agent Console → MCP OAuth → Agent",
    screens: [
      {
        label: "Screen 1",
        title: "Livepeer website",
        description:
          "Add the Agent to the main product story and navigation instead of relying only on campaign traffic.",
        action: "Explore the Agent",
        icon: ExternalLink,
        mockup: "website",
      },
      {
        label: "Screen 2",
        title: "Agent product page",
        description:
          "Show what the Agent does, who it is for, and a clear path into the Console.",
        action: "Get started",
        icon: Monitor,
        mockup: "marketing",
      },
      {
        label: "Screen 3",
        title: "Agent Console",
        description:
          "Handle sign-in, access, installation, and the ongoing user relationship.",
        action: "Sign in or create account",
        icon: UserRoundCheck,
        mockup: "console",
      },
      {
        label: "Outcome",
        title: "Connected Agent",
        description:
          "The public website and product experience lead into the same owned activation path.",
        action: "Open the Agent",
        icon: Check,
        mockup: "agent",
      },
    ],
    needs: [
      "Agent positioning in the livepeer.org information architecture",
      "Homepage or navigation entry point",
      "Agent product page managed in Sanity",
      "Stable Console onboarding path",
      "Public-ready documentation and support path",
    ],
    questions: [
      "Where does the Agent live in the main navigation?",
      "When is access broad enough to replace “Join waitlist” with “Get started”?",
      "How do we explain the relationship between the Agent, Console, and network?",
    ],
  },
]

function BrowserFrame({ screen }: { screen: Screen }) {
  const Icon = screen.icon

  return (
    <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
      <div className="flex h-8 items-center gap-1.5 border-b bg-muted/40 px-3">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-2 h-3.5 flex-1 rounded-sm bg-border/60" />
      </div>
      <div className="aspect-video bg-muted/25 p-[6%]">
        {screen.mockup === "marketing" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="h-2 w-16 rounded-sm bg-foreground" />
              <div className="flex gap-2">
                <div className="h-1.5 w-8 rounded-sm bg-border" />
                <div className="h-1.5 w-8 rounded-sm bg-border" />
              </div>
            </div>
            <div className="max-w-[75%] space-y-2">
              <div className="h-4 w-4/5 rounded-sm bg-foreground" />
              <div className="h-4 w-3/5 rounded-sm bg-foreground" />
              <div className="h-1.5 w-full rounded-sm bg-border" />
              <div className="h-1.5 w-4/5 rounded-sm bg-border" />
              <div className="mt-3 h-5 w-24 rounded-full bg-foreground" />
            </div>
          </div>
        )}
        {screen.mockup === "waitlist" && (
          <div className="flex h-full items-center justify-center">
            <div className="w-[72%] space-y-3 rounded-md border bg-background p-[7%] shadow-sm">
              <Mail className="size-5" />
              <div className="h-3 w-2/3 rounded-sm bg-foreground" />
              <div className="h-6 rounded-sm border bg-muted/30" />
              <div className="h-6 rounded-sm bg-foreground" />
            </div>
          </div>
        )}
        {screen.mockup === "oauth" && (
          <div className="flex h-full items-center justify-center">
            <div className="flex w-[72%] flex-col items-center gap-3 rounded-md border bg-background p-[7%] text-center shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-full bg-foreground text-background">
                <LockKeyhole className="size-4" />
              </div>
              <div className="h-3 w-3/5 rounded-sm bg-foreground" />
              <div className="h-1.5 w-4/5 rounded-sm bg-border" />
              <div className="h-6 w-full rounded-sm bg-foreground" />
            </div>
          </div>
        )}
        {screen.mockup === "console" && (
          <div className="flex h-full overflow-hidden rounded-md border bg-background shadow-sm">
            <div className="w-[27%] border-r bg-muted/30 p-3">
              <div className="mb-5 h-2 w-12 rounded-sm bg-foreground" />
              <div className="space-y-2">
                <div className="h-4 rounded-sm bg-border" />
                <div className="h-4 rounded-sm bg-foreground/10" />
                <div className="h-4 rounded-sm bg-foreground/10" />
              </div>
            </div>
            <div className="flex-1 space-y-3 p-[6%]">
              <div className="h-3 w-1/2 rounded-sm bg-foreground" />
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-[2/1] rounded-sm border bg-muted/30" />
                <div className="aspect-[2/1] rounded-sm border bg-muted/30" />
              </div>
              <div className="h-5 w-24 rounded-sm bg-foreground" />
            </div>
          </div>
        )}
        {screen.mockup === "website" && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="h-2 w-16 rounded-sm bg-foreground" />
              <div className="flex gap-3">
                <div className="h-1.5 w-9 rounded-sm bg-border" />
                <div className="h-1.5 w-9 rounded-sm bg-border" />
                <div className="h-1.5 w-9 rounded-sm bg-border" />
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 items-center gap-5">
              <div className="space-y-2">
                <div className="h-4 w-4/5 rounded-sm bg-foreground" />
                <div className="h-4 w-3/5 rounded-sm bg-foreground" />
                <div className="h-1.5 w-full rounded-sm bg-border" />
                <div className="h-5 w-20 rounded-full bg-foreground" />
              </div>
              <div className="aspect-video rounded-sm bg-foreground/10" />
            </div>
          </div>
        )}
        {screen.mockup === "agent" && (
          <div className="flex h-full gap-3">
            <div className="w-[24%] rounded-sm bg-foreground/10 p-2">
              <div className="h-2 w-10 rounded-sm bg-foreground/40" />
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-sm border bg-background p-3">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="size-3" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-20 rounded-sm bg-foreground" />
                  <div className="h-1.5 w-28 rounded-sm bg-border" />
                </div>
              </div>
              <div className="flex h-7 items-center justify-between rounded-sm border px-2">
                <div className="h-1.5 w-24 rounded-sm bg-border" />
                <ArrowRight className="size-3" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon className="size-3.5" />
          {screen.label}
        </div>
        <h3 className="font-sans text-sm font-medium">{screen.title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {screen.description}
        </p>
        <p className="mt-3 text-xs font-medium">{screen.action}</p>
      </div>
    </div>
  )
}

export function AgentFtueFlow() {
  const [activePhase, setActivePhase] = useState(0)
  const phase = phases[activePhase]

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 md:py-12 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Livepeer Agent
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="max-w-3xl text-balance text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
                Rollout flows
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                What the user sees, what needs to happen, and what we still
                need to decide.
              </p>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              The external waitlist gives us a gate now. The Agent Console gives
              us the owned user relationship we need next.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav
          aria-label="Rollout phases"
          className="border-b p-4 sm:p-6 lg:min-h-[calc(100vh-177px)] lg:border-r lg:border-b-0 lg:p-8"
        >
          <p className="mb-3 text-xs font-medium text-muted-foreground">
            Rollout phases
          </p>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {phases.map((item, index) => (
              <button
                key={item.number}
                type="button"
                onClick={() => setActivePhase(index)}
                className={cn(
                  "rounded-lg border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  index === activePhase
                    ? "border-foreground bg-foreground text-background"
                    : "bg-background hover:bg-muted"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs",
                    index === activePhase
                      ? "text-background/60"
                      : "text-muted-foreground"
                  )}
                >
                  {item.number} · {item.timing}
                </span>
                <span className="mt-1.5 block text-sm font-medium">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </nav>

        <section className="min-w-0 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between gap-5 border-b pb-8 sm:flex-row sm:items-start">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span>Phase {phase.number}</span>
                <span>·</span>
                <span>{phase.timing}</span>
              </div>
              <h2 className="mt-2 text-balance text-2xl font-normal tracking-tight sm:text-3xl">
                {phase.name}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {phase.summary}
              </p>
              <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 font-mono text-xs">
                <ArrowRight className="size-3.5 shrink-0" />
                <span className="overflow-x-auto whitespace-nowrap">
                  {phase.flow}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous phase"
                disabled={activePhase === 0}
                onClick={() => setActivePhase((value) => value - 1)}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next phase"
                disabled={activePhase === phases.length - 1}
                onClick={() => setActivePhase((value) => value + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>

          <div className="py-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-sans text-sm font-medium">Screen flow</h2>
              <span className="font-mono text-xs text-muted-foreground">
                16:9 frames
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {phase.screens.map((screen) => (
                <BrowserFrame key={screen.title} screen={screen} />
              ))}
            </div>
          </div>

          <div className="grid gap-8 border-t py-8 md:grid-cols-2">
            <section aria-labelledby="needs-heading">
              <div className="flex items-center gap-2">
                <Upload className="size-4" />
                <h2 id="needs-heading" className="font-sans text-sm font-medium">
                  What needs to happen
                </h2>
              </div>
              <ol className="mt-4 divide-y border-y">
                {phase.needs.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[28px_1fr] gap-3 py-3 text-sm leading-6"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="questions-heading">
              <div className="flex items-center gap-2">
                <CircleHelp className="size-4" />
                <h2
                  id="questions-heading"
                  className="font-sans text-sm font-medium"
                >
                  Open questions
                </h2>
              </div>
              <div className="mt-4 divide-y border-y">
                {phase.questions.map((question) => (
                  <div
                    key={question}
                    className="flex gap-3 py-3 text-sm leading-6"
                  >
                    <CircleHelp className="mt-1 size-4 shrink-0 text-muted-foreground" />
                    <span>{question}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
