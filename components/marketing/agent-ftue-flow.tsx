"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowUpRight, Check, TriangleAlert } from "lucide-react"

import { LivepeerGradientLockup } from "@/components/brand"
import { agentConsoleShellFixture } from "@/components/demos/fixtures/agent-console-pages"
import { LivepeerAgentSignInCard } from "@/components/mockups/livepeer-agent-sign-in-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Screen = {
  title: string
  description: string
  action: string
  mockup:
    | "marketing"
    | "public-marketing"
    | "waitlist"
    | "email"
    | "oauth"
    | "agent"
    | "results"
    | "console"
    | "website"
  hasMockup?: boolean
  needs: string[]
  questions: string[]
}

type Phase = {
  number: string
  name: string
  timing: string
  summary: string
  userFlowDescription?: string
  primaryCta?: string
  callout?: string
  screens: Screen[]
}

const mockupHrefByType: Partial<Record<Screen["mockup"], string>> = {
  marketing: "/flow-references/20260727-184956/agent-marketing-page.png",
  "public-marketing":
    "/flow-references/20260727-192146/public-agent-marketing-page.png",
  waitlist: "/mockups/waitlist",
  oauth: "/docs/components/livepeer-agent-auth-gate",
  agent: "/flow-references/20260727-184344/agent-client.png",
  results: "/flow-references/20260727-184759/generation-preview.png",
  console: "/mockups/platform",
  website: "/docs/mockups/livepeer-org",
}

const phases: Phase[] = [
  {
    number: "1",
    name: "Private beta",
    timing: "External gate",
    summary:
      "A user joins the waitlist, receives an access email, runs Claude, adds the MCP to their Agent, completes OAuth, returns to the Agent to generate, and opens a link to the results.",
    primaryCta: "Join the waitlist",
    callout: "Do not share the MCP publicly during the private beta.",
    screens: [
      {
        title: "Agent landing page",
        description:
          "Explain the Agent and collect interest without exposing a public MCP install link.",
        action: "Join the waitlist",
        mockup: "marketing",
        needs: ["Plant a flag", "Used as a press kit for outreach"],
        questions: ["What is the minimum story this page needs to tell?"],
      },
      {
        title: "Waitlist",
        description:
          "Capture the email we will use to approve access and follow up.",
        action: "Agent Waitlist",
        mockup: "waitlist",
        needs: [
          "Collect an email",
          "Export approved emails for the auth gate",
          "Send a clear confirmation",
        ],
        questions: ["Who decides which emails get access?"],
      },
      {
        title: "Receive access email",
        description:
          "Once approved, the user receives an email telling them that they can access the private beta.",
        action: "Open access email",
        mockup: "email",
        needs: [
          "Send the email when a waitlisted user is approved",
          "Include the MCP setup instructions",
          "Give the user a single install prompt",
        ],
        questions: ["What triggers the access email?"],
      },
      {
        title: "Add the MCP to their Agent",
        description:
          "The user runs Claude and adds the Livepeer MCP to their Agent.",
        action: "Run Claude and add the MCP",
        mockup: "agent",
        hasMockup: false,
        needs: [
          "User runs install",
          "Submits a prompt to test the MCP",
          "MCP OAuth is triggered",
        ],
        questions: ["Which Claude clients do we support first?"],
      },
      {
        title: "OAuth with waitlisted email",
        description:
          "Approved emails can authenticate. Everyone else returns to the waitlist.",
        action: "Continue with approved email",
        mockup: "oauth",
        needs: [
          "Check the email against the approved list",
          "Connect authentication to usage tracking",
        ],
        questions: ["How quickly does an approved email reach the auth gate?"],
      },
      {
        title: "Returns to session",
        description:
          "After OAuth, the user returns to the Agent, sees that the connection succeeded, and submits their generation prompt.",
        action: "Submit generation prompt",
        mockup: "agent",
        needs: [
          "Return the user to the same Agent session",
          "Confirm that the MCP connection succeeded",
          "Give progress while the generation runs",
        ],
        questions: ["Does OAuth preserve the active Agent session?"],
      },
      {
        title: "Preview generations",
        description:
          "The Agent returns a results link that opens a visual history of the user’s generated media.",
        action: "Open results link",
        mockup: "results",
        needs: [
          "Return a stable results link in the Agent",
          "Show generated media with its prompt and context",
          "Make each result easy to preview or open",
        ],
        questions: ["How long should a results link remain available?"],
      },
    ],
  },
  {
    number: "2",
    name: "Public beta",
    timing: "livepeer.org",
    summary:
      "A user visits livepeer.org/agent, adds the MCP to their Agent, completes OAuth, returns to the Agent to generate, and opens a link to the results.",
    primaryCta: "Install the Agent",
    screens: [
      {
        title: "livepeer.org/agent",
        description:
          "Publish the Agent marketing page as part of the main Livepeer website with the public MCP endpoint.",
        action: "Add to Claude",
        mockup: "public-marketing",
        needs: [
          "Publish the page at livepeer.org/agent",
          "Add the Agent to the main website navigation",
          "Share the public MCP endpoint",
        ],
        questions: ["Is the public MCP endpoint ready to share?"],
      },
      {
        title: "Add the MCP to their Agent",
        description:
          "The user runs Claude and adds the Livepeer MCP to their Agent.",
        action: "Run Claude and add the MCP",
        mockup: "agent",
        hasMockup: false,
        needs: [
          "User runs install",
          "Submits a prompt to test the MCP",
          "MCP OAuth is triggered",
        ],
        questions: ["Which Claude clients do we support first?"],
      },
      {
        title: "MCP OAuth",
        description:
          "The user authenticates without waiting for email approval.",
        action: "Continue with email",
        mockup: "oauth",
        needs: [
          "Authenticate the user",
          "Connect authentication to usage tracking",
        ],
        questions: ["Can any valid email authenticate?"],
      },
      {
        title: "Returns to session",
        description:
          "After OAuth, the user returns to the Agent, sees that the connection succeeded, and submits their generation prompt.",
        action: "Submit generation prompt",
        mockup: "agent",
        needs: [
          "Return the user to the same Agent session",
          "Confirm that the MCP connection succeeded",
          "Give progress while the generation runs",
        ],
        questions: ["Does OAuth preserve the active Agent session?"],
      },
      {
        title: "Preview generations",
        description:
          "The Agent returns a results link that opens a visual history of the user’s generated media.",
        action: "Open results link",
        mockup: "results",
        needs: [
          "Return a stable results link in the Agent",
          "Show generated media with its prompt and context",
          "Make each result easy to preview or open",
        ],
        questions: ["How long should a results link remain available?"],
      },
    ],
  },
]

function ScreenMockup({ type }: { type: Screen["mockup"] }) {
  if (type === "marketing") {
    return (
      <div className="relative h-full overflow-hidden bg-white">
        <Image
          src="/flow-references/20260727-184956/agent-marketing-page.png"
          alt="Livepeer Agent marketing page"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain"
        />
      </div>
    )
  }

  if (type === "public-marketing") {
    return (
      <div className="relative h-full overflow-hidden bg-white">
        <Image
          src="/flow-references/20260727-192146/public-agent-marketing-page.png"
          alt="Public Livepeer Agent marketing page"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain"
        />
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
            <h2 className="font-sans text-[clamp(1rem,3vw,2.25rem)] leading-none font-light">
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
      <div className="relative h-full overflow-hidden bg-black">
        <Image
          src="/flow-references/20260727-183925/agent-waitlist.png"
          alt="Livepeer Agent early access waitlist"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain"
        />
      </div>
    )
  }

  if (type === "email") {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-muted px-[10%] text-center text-foreground">
        <h2 className="font-sans text-[clamp(1.25rem,3.2vw,2.75rem)] leading-tight font-light tracking-[-0.04em] text-balance">
          <span className="block">Welcome to the</span>
          <span className="block">private beta</span>
        </h2>
        <Button
          size="sm"
          className="mt-[5%] h-8 rounded-sm px-3 text-[8px] sm:h-12 sm:px-5 sm:text-xs"
        >
          Add to Claude
        </Button>
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

  if (type === "results") {
    return (
      <div className="relative h-full overflow-hidden bg-white">
        <Image
          src="/flow-references/20260727-184759/generation-preview.png"
          alt="Generation history with video previews and prompts"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain"
        />
      </div>
    )
  }

  return (
    <div className="relative h-full overflow-hidden bg-black">
      <Image
        src="/flow-references/20260727-184344/agent-client.png"
        alt="Livepeer Agent running in Claude Code"
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-contain"
      />
    </div>
  )
}

function ScreenRow({
  screen,
  headingId,
  heading = screen.title,
}: {
  screen: Screen
  headingId: string
  heading?: string
}) {
  const mockupHref =
    screen.hasMockup === false ? undefined : mockupHrefByType[screen.mockup]

  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.8fr)] lg:items-start"
    >
      <div className="min-w-0">
        <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
          <div className="aspect-video">
            <ScreenMockup type={screen.mockup} />
          </div>
        </div>
      </div>

      <aside>
        <h4 id={headingId} className="font-sans text-lg font-medium">
          {heading}
        </h4>
        {mockupHref && (
          <a
            href={mockupHref}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Open mockup
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        )}

        <div className="mt-5">
          <ul className="mt-3 space-y-3">
            {screen.needs.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-5">
                <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  )
}

export function AgentFtueFlow() {
  const [activePhase, setActivePhase] = useState(0)
  const phase = phases[activePhase]
  const marketingScreen = phase.screens.find(
    (screen) =>
      screen.mockup === "marketing" || screen.mockup === "public-marketing"
  )
  const waitlistScreen = phase.screens.find(
    (screen) => screen.mockup === "waitlist"
  )
  const userFlowScreens = phase.screens.filter(
    (screen) => screen !== marketingScreen && screen !== waitlistScreen
  )

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
            <h2 className="font-sans text-2xl font-normal tracking-tight">
              {phase.name}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {phase.summary}
            </p>
            {phase.primaryCta && (
              <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                <span>Primary CTA</span>
                <Badge>{phase.primaryCta}</Badge>
              </div>
            )}
            {phase.callout && (
              <div className="mt-4 flex max-w-3xl items-start gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                <span>{phase.callout}</span>
              </div>
            )}
          </div>

          <div className="mt-10">
            <section aria-labelledby={`marketing-pages-${activePhase}`}>
              <h3
                id={`marketing-pages-${activePhase}`}
                className="font-sans text-2xl font-normal tracking-tight"
              >
                Marketing pages
              </h3>

              {marketingScreen && (
                <div className="mt-8">
                  <ScreenRow
                    screen={marketingScreen}
                    heading={marketingScreen.title}
                    headingId={`marketing-page-${activePhase}`}
                  />
                </div>
              )}

              {waitlistScreen && (
                <div className="mt-10">
                  <ScreenRow
                    screen={waitlistScreen}
                    headingId={`waitlist-${activePhase}`}
                  />
                </div>
              )}
            </section>

            <section
              aria-labelledby={`user-flow-${activePhase}`}
              className="mt-16"
            >
              <h3
                id={`user-flow-${activePhase}`}
                className="font-sans text-2xl font-normal tracking-tight"
              >
                User flow
              </h3>
              {phase.userFlowDescription && (
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {phase.userFlowDescription}
                </p>
              )}

              <div className="mt-8 space-y-10">
                {userFlowScreens.map((screen, index) => (
                  <ScreenRow
                    key={screen.title}
                    screen={screen}
                    headingId={`screen-${activePhase}-${index}`}
                  />
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
