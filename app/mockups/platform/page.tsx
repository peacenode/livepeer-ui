import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { RunnerOnboardingCard } from "@/components/mockups/runner-onboarding-card"
import { CardTitle } from "@/components/ui/card"
import {
  getForumTopicUrl,
  getLatestResearchTopics,
  RESEARCH_FORUM_URL,
} from "@/lib/forum"

export const metadata: Metadata = {
  title: "Home",
}

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
      <div className="flex flex-col gap-6">
        <RunnerOnboardingCard />
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="https://docs.livepeer.org/v1/orchestrators/guides/get-started"
            target="_blank"
            rel="noreferrer"
            className="group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted">
              <Image
                src="/generated/20260725-101313-console-home-cards/orchestrator.png"
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </div>
            <div className="mt-4 flex max-w-sm flex-col gap-1.5">
              <CardTitle className="inline-flex items-center gap-1.5 text-xl font-normal">
                Run an Orchestrator
                <ArrowUpRightIcon
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Provide compute to the network and earn service fees and
                protocol rewards.
              </p>
            </div>
          </a>
          <Link
            href="/mockups/playbooks/install"
            className="group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted">
              <Image
                src="/generated/20260725-101313-console-home-cards/runner.png"
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </div>
            <div className="mt-4 flex max-w-sm flex-col gap-1.5">
              <CardTitle className="inline-flex items-center gap-1.5 text-xl font-normal">
                Install Runner
                <ArrowUpRightIcon
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Create and edit images and video from the agent of your choice.
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-medium">Research</h2>
          <a
            href={RESEARCH_FORUM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-emerald-500"
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
              className="group flex items-center gap-6 border-b py-5 transition-colors last:border-b-0 hover:text-emerald-500"
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
