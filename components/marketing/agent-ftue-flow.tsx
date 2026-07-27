"use client"

import Image from "next/image"
import { useState } from "react"
import { Check, CircleHelp, TriangleAlert } from "lucide-react"

import { LivepeerGradientLockup } from "@/components/brand"
import { agentConsoleShellFixture } from "@/components/demos/fixtures/agent-console-pages"
import { LivepeerAgentSignInCard } from "@/components/mockups/livepeer-agent-sign-in-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Screen = {
  title: string
  description: string
  action: string
  mockup:
    | "marketing"
    | "waitlist"
    | "oauth"
    | "agent"
    | "results"
    | "console"
    | "website"
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
      "A user joins the waitlist, opens the Agent, completes MCP OAuth, returns to the Agent to generate, and opens a link to the results.",
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
        title: "Waitlist",
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
        title: "Open the Agent",
        description:
          "The user reaches the Agent in Claude or Codex and starts the connection.",
        action: "Start with the Agent",
        mockup: "agent",
        needs: [
          "Open the Agent in the user’s client",
          "Give the user one clear first action",
          "Trigger MCP OAuth when the Agent connects",
        ],
        questions: ["What is the first prompt we want every beta user to try?"],
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
        title: "Generate with the Agent",
        description:
          "After OAuth, the user returns to the Agent and asks it to generate.",
        action: "Enter a generation prompt",
        mockup: "agent",
        needs: [
          "Return the user to the same Agent session",
          "Confirm that the MCP is connected",
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
    name: "Expanded beta",
    timing: "Agent Console",
    summary:
      "A user signs in to the Agent Console, opens the Agent, completes MCP OAuth, returns to the Agent to generate, and opens a link to the results.",
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
        description: "Own sign-in, access status, and onboarding in one place.",
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
        title: "Open the Agent",
        description:
          "The user opens the Agent in their selected client and starts the connection.",
        action: "Open the Agent",
        mockup: "agent",
        needs: [
          "Open the correct client",
          "Carry the user into a clear first action",
          "Trigger MCP OAuth when the Agent connects",
        ],
        questions: ["What event counts as an activated user?"],
      },
      {
        title: "MCP OAuth",
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
        title: "Generate with the Agent",
        description:
          "After OAuth, the user returns to the Agent and asks it to generate.",
        action: "Enter a generation prompt",
        mockup: "agent",
        needs: [
          "Return the user to the same Agent session",
          "Confirm that the MCP is connected",
          "Show progress while the generation runs",
        ],
        questions: ["Does the Console record the generation automatically?"],
      },
      {
        title: "Preview generations",
        description:
          "The Agent returns a results link that opens a visual history of the user’s generated media.",
        action: "Open results link",
        mockup: "results",
        needs: [
          "Return a stable results link in the Agent",
          "Associate the results with the Console user",
          "Show generated media with its prompt and context",
        ],
        questions: ["Do results also appear inside the Agent Console?"],
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
        description: "Add the Agent to the main product story and navigation.",
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

export function AgentFtueFlow() {
  const [activePhase, setActivePhase] = useState(0)
  const phase = phases[activePhase]
  const marketingScreen = phase.screens.find(
    (screen) => screen.mockup === "marketing"
  )
  const userFlowScreens = phase.screens.filter(
    (screen) => screen !== marketingScreen
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

          <div className="mt-10">
            {marketingScreen && (
              <section
                aria-labelledby={`marketing-page-${activePhase}`}
                className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.8fr)]"
              >
                <div className="min-w-0">
                  <header className="max-w-3xl text-left">
                    <h3
                      id={`marketing-page-${activePhase}`}
                      className="text-lg font-medium"
                    >
                      {marketingScreen.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {marketingScreen.description}
                    </p>
                  </header>

                  <div className="mt-6 overflow-hidden rounded-lg border bg-background shadow-sm">
                    <div className="aspect-video">
                      <ScreenMockup type={marketingScreen.mockup} />
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section
              aria-labelledby={`user-flow-${activePhase}`}
              className="mt-16"
            >
              <h3
                id={`user-flow-${activePhase}`}
                className="text-2xl font-normal tracking-tight"
              >
                User flow
              </h3>

              <div className="mt-8 space-y-16">
                {userFlowScreens.map((screen, index) => (
                  <section
                    key={screen.title}
                    aria-labelledby={`screen-${activePhase}-${index}`}
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
                      <h4
                        id={`screen-${activePhase}-${index}`}
                        className="text-lg font-medium"
                      >
                        {screen.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {screen.description}
                      </p>

                      <div className="mt-5">
                        <p className="text-xs font-medium text-muted-foreground">
                          User action
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {screen.action}
                        </p>
                      </div>

                      <div className="mt-7">
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

                      <div className="mt-7">
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
        </section>
      </div>
    </main>
  )
}
