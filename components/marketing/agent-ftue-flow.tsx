"use client"

import { useEffect, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleHelp,
  KeyRound,
  LockKeyhole,
  Mail,
  Monitor,
  UserRoundCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Screen = {
  title: string
  description: string
  action: string
  mockup: "marketing" | "waitlist" | "oauth" | "agent" | "console" | "website"
  needs: string[]
  questions: string[]
}

type Phase = {
  number: string
  name: string
  timing: string
  summary: string
  flow: string
  screens: Screen[]
}

const phases: Phase[] = [
  {
    number: "1",
    name: "Private beta",
    timing: "Ship first",
    summary:
      "Use the external waitlist as a temporary gate. Do not share the MCP publicly.",
    flow: "Marketing page → Waitlist → MCP OAuth → Agent",
    screens: [
      {
        title: "Agent marketing page",
        description:
          "Explain the Agent and collect interest without exposing a public MCP install link.",
        action: "Join the waitlist",
        mockup: "marketing",
        needs: [
          "Publish the Agent marketing page",
          "Keep the MCP install link private",
          "Send the primary CTA to the external waitlist",
        ],
        questions: ["What is the minimum story this page needs to tell?"],
      },
      {
        title: "External waitlist",
        description:
          "Capture the email we will use to approve access and follow up.",
        action: "Submit email",
        mockup: "waitlist",
        needs: [
          "Collect an email",
          "Export approved emails for the auth gate",
          "Send a clear confirmation",
        ],
        questions: ["Who decides which emails get access?"],
      },
      {
        title: "MCP OAuth",
        description:
          "Approved emails can authenticate. Everyone else returns to the waitlist.",
        action: "Continue with approved email",
        mockup: "oauth",
        needs: [
          "Check the email against the approved list",
          "Connect authentication to usage tracking",
          "Show a useful message when access is unavailable",
        ],
        questions: ["How quickly does an approved email reach the auth gate?"],
      },
      {
        title: "Agent ready",
        description:
          "The approved user reaches the Agent in Claude or Codex and can begin.",
        action: "Start with the Agent",
        mockup: "agent",
        needs: [
          "Confirm that the connection worked",
          "Give the user one clear first action",
          "Track usage by authenticated email",
        ],
        questions: ["What is the first prompt we want every beta user to try?"],
      },
    ],
  },
  {
    number: "2",
    name: "Agent Console",
    timing: "Get up ASAP",
    summary:
      "Replace the waitlist handoff with an owned access and onboarding surface.",
    flow: "Marketing page → Agent Console → MCP OAuth → Agent",
    screens: [
      {
        title: "Agent marketing page",
        description:
          "Keep the product story, but send users into the Agent Console.",
        action: "Get access",
        mockup: "marketing",
        needs: [
          "Replace the external waitlist CTA",
          "Send users into Console sign-in",
        ],
        questions: ["Do existing waitlist users get imported automatically?"],
      },
      {
        title: "Agent Console",
        description:
          "Own sign-in, access status, and onboarding in one place.",
        action: "Sign in",
        mockup: "console",
        needs: [
          "Add Console sign-in",
          "Show waitlisted or approved access status",
          "Provide the next onboarding action",
        ],
        questions: ["Where does approval happen once Console is live?"],
      },
      {
        title: "Connect the Agent",
        description:
          "Authorize the MCP and confirm that it is connected to the selected client.",
        action: "Authorize MCP",
        mockup: "oauth",
        needs: [
          "Connect OAuth to the Console user",
          "Support the first target clients",
          "Confirm a successful connection",
        ],
        questions: ["Which clients ship in the first Console release?"],
      },
      {
        title: "Agent ready",
        description:
          "Authentication, onboarding, and usage now belong to one user.",
        action: "Open the Agent",
        mockup: "agent",
        needs: [
          "Open the correct client",
          "Carry the user into a clear first action",
          "Record activation in Console",
        ],
        questions: ["What event counts as an activated user?"],
      },
    ],
  },
  {
    number: "3",
    name: "livepeer.org",
    timing: "Full website update",
    summary:
      "Make the Agent a first-class Livepeer product once the onboarding path is ready.",
    flow: "livepeer.org → Agent page → Agent Console → Agent",
    screens: [
      {
        title: "Livepeer website",
        description:
          "Add the Agent to the main product story and navigation.",
        action: "Explore the Agent",
        mockup: "website",
        needs: [
          "Choose the Agent’s place in the site structure",
          "Add a homepage or navigation entry point",
        ],
        questions: ["Where does the Agent live in the main navigation?"],
      },
      {
        title: "Agent product page",
        description:
          "Explain what the Agent does and lead users into the Console.",
        action: "Get started",
        mockup: "marketing",
        needs: [
          "Create the page in Sanity",
          "Show the core Agent use cases",
          "Link to the stable Console flow",
        ],
        questions: ["When does “Join waitlist” become “Get started”?"],
      },
      {
        title: "Agent Console",
        description:
          "Handle sign-in, access, installation, and the ongoing user relationship.",
        action: "Sign in",
        mockup: "console",
        needs: [
          "Support public website traffic",
          "Keep onboarding and access status clear",
        ],
        questions: ["Is any part of the Console public before sign-in?"],
      },
      {
        title: "Connected Agent",
        description:
          "The public website and product experience lead into the same activation path.",
        action: "Open the Agent",
        mockup: "agent",
        needs: [
          "Keep the handoff consistent across supported clients",
          "Connect product usage back to the Console user",
        ],
        questions: [
          "How do we explain the relationship between the Agent and the network?",
        ],
      },
    ],
  },
]

function ScreenMockup({ type }: { type: Screen["mockup"] }) {
  if (type === "marketing" || type === "website") {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-[5%] py-[3%]">
          <div className="h-2.5 w-24 rounded-sm bg-foreground" />
          <div className="flex gap-4">
            <div className="h-2 w-12 rounded-sm bg-border" />
            <div className="h-2 w-12 rounded-sm bg-border" />
            <div className="h-2 w-12 rounded-sm bg-border" />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] items-center gap-[7%] p-[7%]">
          <div className="space-y-[5%]">
            <div className="h-7 w-4/5 rounded-sm bg-foreground" />
            <div className="h-7 w-3/5 rounded-sm bg-foreground" />
            <div className="h-2 w-full rounded-sm bg-border" />
            <div className="h-2 w-4/5 rounded-sm bg-border" />
            <div className="h-8 w-32 rounded-full bg-foreground" />
          </div>
          <div className="aspect-video rounded-md border bg-foreground/10" />
        </div>
      </div>
    )
  }

  if (type === "console") {
    return (
      <div className="flex h-full">
        <div className="w-1/4 border-r bg-muted/50 p-[4%]">
          <div className="mb-8 h-2.5 w-20 rounded-sm bg-foreground" />
          <div className="space-y-3">
            <div className="h-7 rounded-sm bg-foreground text-background" />
            <div className="h-7 rounded-sm bg-border/70" />
            <div className="h-7 rounded-sm bg-border/70" />
          </div>
        </div>
        <div className="flex-1 p-[6%]">
          <div className="h-5 w-2/5 rounded-sm bg-foreground" />
          <div className="mt-[5%] grid grid-cols-2 gap-[3%]">
            <div className="aspect-[2/1] rounded-md border bg-muted/40" />
            <div className="aspect-[2/1] rounded-md border bg-muted/40" />
          </div>
          <div className="mt-[5%] h-8 w-32 rounded-sm bg-foreground" />
        </div>
      </div>
    )
  }

  if (type === "waitlist" || type === "oauth") {
    const Icon = type === "waitlist" ? Mail : LockKeyhole
    return (
      <div className="flex h-full items-center justify-center bg-muted/30">
        <div className="flex w-[48%] flex-col items-center gap-4 rounded-lg border bg-background p-[6%] text-center shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-full bg-foreground text-background">
            <Icon className="size-5" />
          </div>
          <div className="h-4 w-2/3 rounded-sm bg-foreground" />
          <div className="h-2 w-4/5 rounded-sm bg-border" />
          {type === "waitlist" && (
            <div className="h-9 w-full rounded-md border bg-muted/30" />
          )}
          <div className="h-9 w-full rounded-md bg-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full gap-[3%] bg-muted/30 p-[5%]">
      <div className="w-1/5 rounded-md bg-foreground/10 p-[3%]">
        <div className="h-2 w-14 rounded-sm bg-foreground/40" />
      </div>
      <div className="flex flex-1 flex-col justify-between rounded-md border bg-background p-[5%] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-background">
            <Check className="size-4" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-28 rounded-sm bg-foreground" />
            <div className="h-2 w-44 rounded-sm bg-border" />
          </div>
        </div>
        <div className="flex h-10 items-center justify-between rounded-md border px-4">
          <div className="h-2 w-40 rounded-sm bg-border" />
          <ArrowRight className="size-4" />
        </div>
      </div>
    </div>
  )
}

export function AgentFtueFlow() {
  const [activePhase, setActivePhase] = useState(0)
  const [activeScreen, setActiveScreen] = useState(0)
  const phase = phases[activePhase]
  const screen = phase.screens[activeScreen]

  useEffect(() => {
    setActiveScreen(0)
  }, [activePhase])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 md:py-12 lg:px-10">
        <header className="border-b pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Livepeer Agent
          </p>
          <h1 className="mt-3 text-balance text-3xl font-normal tracking-tight sm:text-4xl">
            Rollout flows
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            One screen at a time, with the work and decisions beside it.
          </p>
        </header>

        <nav
          aria-label="Rollout phases"
          className="grid border-b sm:grid-cols-3"
        >
          {phases.map((item, index) => (
            <button
              key={item.number}
              type="button"
              onClick={() => setActivePhase(index)}
              className={cn(
                "border-b-2 px-4 py-5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:px-5",
                index === activePhase
                  ? "border-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="block font-mono text-xs">
                Phase {item.number} · {item.timing}
              </span>
              <span className="mt-1 block text-sm font-medium">
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        <section className="py-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-normal tracking-tight">
                {phase.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {phase.summary}
              </p>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {phase.flow}
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start">
            <div className="min-w-0">
              <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
                <div className="flex h-9 items-center gap-1.5 border-b bg-muted/40 px-3">
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="ml-2 h-4 flex-1 rounded-sm bg-border/60" />
                </div>
                <div className="aspect-video">
                  <ScreenMockup type={screen.mockup} />
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">
                    Screen {activeScreen + 1} of {phase.screens.length}
                  </p>
                  <h3 className="mt-1 text-lg font-medium">{screen.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {screen.description}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Previous screen"
                    disabled={activeScreen === 0}
                    onClick={() => setActiveScreen((value) => value - 1)}
                  >
                    <ArrowLeft />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Next screen"
                    disabled={activeScreen === phase.screens.length - 1}
                    onClick={() => setActiveScreen((value) => value + 1)}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>

            <aside className="rounded-lg border p-5 lg:sticky lg:top-6">
              <div className="flex items-center gap-2">
                {screen.mockup === "oauth" ? (
                  <KeyRound className="size-4" />
                ) : screen.mockup === "console" ? (
                  <UserRoundCheck className="size-4" />
                ) : (
                  <Monitor className="size-4" />
                )}
                <h3 className="font-sans text-sm font-medium">Notes</h3>
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium text-muted-foreground">
                  User action
                </p>
                <p className="mt-1 text-sm font-medium">{screen.action}</p>
              </div>

              <div className="mt-6 border-t pt-5">
                <p className="text-xs font-medium text-muted-foreground">
                  What needs to happen
                </p>
                <ul className="mt-3 space-y-3">
                  {screen.needs.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-5"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t pt-5">
                <p className="text-xs font-medium text-muted-foreground">
                  Open questions
                </p>
                <ul className="mt-3 space-y-3">
                  {screen.questions.map((question) => (
                    <li
                      key={question}
                      className="flex gap-2.5 text-sm leading-5"
                    >
                      <CircleHelp className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}
