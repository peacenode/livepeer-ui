"use client"

import { useState } from "react"
import {
  ArrowRight,
  Check,
  CircleHelp,
  KeyRound,
  Monitor,
  TriangleAlert,
  UserRoundCheck,
} from "lucide-react"

import { LivepeerGradientLockup } from "@/components/brand"
import { agentConsoleShellFixture } from "@/components/demos/fixtures/agent-console-pages"
import { waitlistContentFixture } from "@/components/demos/waitlist-content-fixture"
import { LivepeerAgentSignInCard } from "@/components/mockups/livepeer-agent-sign-in-card"
import { WaitlistSignupForm } from "@/components/mockups/waitlist-signup-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  callout?: string
  screens: Screen[]
}

const phases: Phase[] = [
  {
    number: "1",
    name: "Private beta",
    timing: "External gate",
    summary:
      "A user visits the Agent marketing page, joins the waitlist, authenticates with an approved email, and opens the Agent.",
    callout: "Do not share the MCP publicly during the private beta.",
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
        action: "Join the waitlist",
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
    name: "Expanded beta",
    timing: "Agent Console",
    summary:
      "A user visits the Agent marketing page, signs in to the Agent Console, authorizes the MCP, and opens the Agent.",
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
    name: "Public beta",
    timing: "livepeer.org",
    summary:
      "A user discovers the Agent on livepeer.org, learns what it can do, signs in to the Agent Console, and connects the Agent.",
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
  if (type === "marketing") {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="flex items-center justify-between border-b px-[5%] py-[2.5%]">
          <LivepeerGradientLockup className="h-3 w-auto sm:h-4" />
          <div className="flex items-center gap-4 text-[8px] text-muted-foreground sm:text-[10px]">
            <span>About</span>
            <span>Playbooks</span>
            <span>Docs</span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] items-center gap-[7%] p-[7%]">
          <div>
            <p className="font-agent text-[9px] tracking-wide text-muted-foreground sm:text-xs">
              LIVEPEER AGENT
            </p>
            <h2 className="mt-[4%] max-w-xl text-[clamp(1rem,3.2vw,2.5rem)] leading-[0.98] font-light tracking-tight">
              Create and edit video with your agent.
            </h2>
            <p className="mt-[5%] max-w-md text-[8px] leading-relaxed text-muted-foreground sm:text-xs">
              Multimodal media generation powered by Livepeer&apos;s open
              network.
            </p>
            <Button
              size="sm"
              className="mt-[6%] h-7 rounded-sm px-3 text-[9px] sm:h-8 sm:text-xs"
            >
              Join the waitlist
            </Button>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-md border bg-black">
            <div className="absolute inset-[10%] rounded-sm border border-white/20 bg-white/5" />
            <div className="absolute right-[16%] bottom-[18%] left-[16%] h-[12%] rounded-sm bg-white/15" />
          </div>
        </div>
      </div>
    )
  }

  if (type === "website") {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-[5%] py-[3%]">
          <LivepeerGradientLockup className="h-3 w-auto sm:h-4" />
          <div className="flex gap-4 text-[8px] text-muted-foreground sm:text-[10px]">
            <span>Network</span>
            <span>Developers</span>
            <span>Agent</span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 items-center gap-[7%] p-[7%]">
          <div>
            <h2 className="text-[clamp(1rem,3vw,2.25rem)] leading-none font-light">
              The open inference network.
            </h2>
            <Button
              size="sm"
              className="mt-[7%] h-7 rounded-sm px-3 text-[9px] sm:text-xs"
            >
              Explore the Agent
            </Button>
          </div>
          <div className="aspect-video rounded-md border bg-muted/50" />
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

  if (type === "waitlist") {
    return (
      <div className="dark flex h-full items-center justify-end overflow-hidden bg-black p-[5%] text-white">
        <div className="mr-[3%] w-[52%] rounded-lg border border-white/20 bg-white/[0.055] p-[5%] shadow-2xl backdrop-blur-md">
          <div className="flex items-end gap-1.5 text-white">
            <LivepeerGradientLockup className="h-3 w-auto sm:h-4" />
            <span className="font-agent text-[9px] leading-none sm:text-xs">
              AGENT
            </span>
          </div>
          <h2 className="mt-[9%] text-[clamp(.9rem,2.7vw,2rem)] leading-none font-light">
            {waitlistContentFixture.panel.heading}
          </h2>
          <p className="mt-[5%] line-clamp-2 text-[7px] leading-relaxed text-white/60 sm:text-[10px]">
            {waitlistContentFixture.panel.description}
          </p>
          <div className="mt-[8%] origin-top-left scale-[0.55] sm:scale-75">
            <div className="w-[180%] sm:w-[133%]">
              <WaitlistSignupForm
                {...waitlistContentFixture.signupForm}
                onJoin={() => undefined}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === "oauth") {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-muted/30">
        <div className="origin-center scale-[0.34] sm:scale-50 md:scale-[0.58]">
          <LivepeerAgentSignInCard content={agentConsoleShellFixture.auth} />
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
  const phase = phases[activePhase]

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 md:py-12 lg:px-10">
        <header className="mb-8">
          <h1 className="text-3xl font-normal tracking-tight">Rollout flows</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Livepeer Agent beta stages
          </p>
        </header>

        <Tabs
          value={String(activePhase)}
          onValueChange={(value) => setActivePhase(Number(value))}
        >
          <TabsList aria-label="Rollout phases">
            {phases.map((item, index) => (
              <TabsTrigger key={item.number} value={String(index)}>
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <section className="py-8">
          <div>
            <h2 className="text-2xl font-normal tracking-tight">
              {phase.name}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {phase.summary}
            </p>
            {phase.callout && (
              <div className="mt-4 flex max-w-3xl items-start gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                <span>{phase.callout}</span>
              </div>
            )}
          </div>

          <div className="mt-10 space-y-16">
            {phase.screens.map((screen, index) => (
              <section
                key={screen.title}
                aria-labelledby={`screen-${activePhase}-${index}`}
                className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start"
              >
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

                  <div className="mt-4">
                    <h3
                      id={`screen-${activePhase}-${index}`}
                      className="mt-1 text-lg font-medium"
                    >
                      {screen.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {screen.description}
                    </p>
                  </div>
                </div>

                <aside className="rounded-lg border p-5">
                  <div className="flex items-center gap-2">
                    {screen.mockup === "oauth" ? (
                      <KeyRound className="size-4" />
                    ) : screen.mockup === "console" ? (
                      <UserRoundCheck className="size-4" />
                    ) : (
                      <Monitor className="size-4" />
                    )}
                    <h4 className="font-sans text-sm font-medium">Notes</h4>
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
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
