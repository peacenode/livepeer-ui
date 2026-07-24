import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoxIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleDashedIcon,
  CpuIcon,
} from "lucide-react"

import { LivepeerSymbol3D } from "@/components/mockups/livepeer-symbol-3d"
import { PlatformPage } from "@/components/mockups/platform-page"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  getForumTopicUrl,
  getLatestResearchTopics,
  RESEARCH_FORUM_URL,
} from "@/lib/forum"

export const metadata: Metadata = {
  title: "Home",
}

const getStartedSteps = [
  {
    label: "Add credits",
    href: "/mockups/platform/billing",
    complete: false,
  },
  {
    label: "Create an API key",
    href: "/mockups/platform/api",
    complete: false,
  },
  {
    label: "Test containers",
    href: "/mockups/platform/inference",
    complete: false,
  },
]

const forumDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

export default async function MockupHomePage() {
  const forumTopics = await getLatestResearchTopics()

  return (
    <PlatformPage title="Home">
      <Card className="py-0">
        <div className="relative grid min-h-64 md:block">
          <div className="relative z-10 flex items-center py-6 md:min-h-64 md:w-[calc(100%-20rem)]">
            <CardContent className="mx-auto w-full max-w-xl">
              <div className="flex flex-col gap-3">
                <CardTitle className="px-2">Get started</CardTitle>
                <ol className="flex max-w-xl flex-col">
                  {getStartedSteps.map((step, index) => (
                    <li key={step.label}>
                      <Link
                        href={step.href}
                        className="group/step flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-foreground/[0.06]"
                      >
                        {step.complete ? (
                          <CheckIcon
                            className="size-4 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <CircleDashedIcon
                            className="size-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        )}
                        <span className="min-w-0 flex-1 font-medium">
                          {index + 1}. {step.label}
                        </span>
                        <ChevronRightIcon
                          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/step:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </div>
          <LivepeerSymbol3D />
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href="https://docs.livepeer.org/v1/orchestrators/guides/get-started"
          target="_blank"
          rel="noreferrer"
          className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Card className="h-full min-h-56 transition-colors group-hover:bg-accent">
            <CardHeader className="flex h-full flex-col justify-between">
              <CpuIcon
                className="size-6 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="flex items-end justify-between gap-6">
                <div className="flex max-w-sm flex-col gap-2">
                  <CardTitle className="text-xl">Run an Orchestrator</CardTitle>
                  <CardDescription>
                    Provide compute to the network and earn service fees and
                    protocol rewards.
                  </CardDescription>
                </div>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </CardHeader>
          </Card>
        </a>
        <Link
          href="/mockups/platform/inference"
          className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Card className="h-full min-h-56 transition-colors group-hover:bg-accent">
            <CardHeader className="flex h-full flex-col justify-between">
              <BoxIcon
                className="size-6 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="flex items-end justify-between gap-6">
                <div className="flex max-w-sm flex-col gap-2">
                  <CardTitle className="text-xl">Create a container</CardTitle>
                  <CardDescription>
                    Package a model or pipeline and deploy it for inference.
                  </CardDescription>
                </div>
                <ArrowRightIcon
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-medium">Research</h2>
          <a
            href={RESEARCH_FORUM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View forum
            <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
          </a>
        </div>
        <div className="border-y">
          {forumTopics.map((topic) => (
            <a
              key={topic.id}
              href={getForumTopicUrl(topic)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-6 border-b py-5 transition-colors last:border-b-0 hover:text-muted-foreground"
            >
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-medium text-foreground">
                  {topic.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {topic.replyCount}{" "}
                  {topic.replyCount === 1 ? "reply" : "replies"} · Latest by{" "}
                  {topic.lastPosterUsername}
                </p>
              </div>
              <time
                dateTime={topic.lastPostedAt}
                className="hidden shrink-0 text-sm text-muted-foreground tabular-nums sm:block"
              >
                {forumDateFormatter.format(new Date(topic.lastPostedAt))}
              </time>
              <ArrowUpRightIcon
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ))}
          {forumTopics.length === 0 && (
            <a
              href={RESEARCH_FORUM_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-6 py-5"
            >
              <span className="font-medium">Visit the Livepeer forum</span>
              <ArrowUpRightIcon
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </PlatformPage>
  )
}
