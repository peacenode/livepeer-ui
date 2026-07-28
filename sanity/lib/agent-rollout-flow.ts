import { defineQuery } from "next-sanity"

import fallbackContent from "@/content/agent-rollout-flow.json"
import { sanityClient } from "@/sanity/lib/client"

export type AgentRolloutItem = {
  _key: string
  title: string
  imageUrl: string
  imageAlt: string
  imageHotspot?: { x: number; y: number }
  mockupHref?: string
  checklist: string[]
}

export type AgentRolloutPhase = {
  _key: string
  name: string
  description: string
  primaryCta?: string
  doNotWarning?: string
  marketingPages: AgentRolloutItem[]
  userFlow: AgentRolloutItem[]
}

export type AgentRolloutFlow = {
  title: string
  subtitle: string
  phases: AgentRolloutPhase[]
}

const query = defineQuery(`
  *[_type == "agentRolloutFlow" && _id == "agentRolloutFlow"][0] {
    title,
    subtitle,
    phases[] {
      _key,
      name,
      description,
      primaryCta,
      doNotWarning,
      marketingPages[] {
        _key,
        title,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        "imageHotspot": image.hotspot { x, y },
        mockupHref,
        checklist
      },
      userFlow[] {
        _key,
        title,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        "imageHotspot": image.hotspot { x, y },
        mockupHref,
        checklist
      }
    }
  }
`)

const fallback: AgentRolloutFlow = {
  title: fallbackContent.title,
  subtitle: fallbackContent.subtitle,
  phases: fallbackContent.phases.map((phase) => ({
    _key: phase._key,
    name: phase.name,
    description: phase.summary,
    primaryCta: phase.primaryCta,
    doNotWarning: phase.callout,
    marketingPages: phase.screens
      .filter((screen) => screen.section === "marketing")
      .map(({ imagePath, needs, ...screen }) => ({
        ...screen,
        imageUrl: imagePath,
        checklist: needs,
      })),
    userFlow: phase.screens
      .filter((screen) => screen.section === "userFlow")
      .map(({ imagePath, needs, ...screen }) => ({
        ...screen,
        imageUrl: imagePath,
        checklist: needs,
      })),
  })),
}

export async function getAgentRolloutFlow(): Promise<AgentRolloutFlow> {
  try {
    const content = await sanityClient.fetch<AgentRolloutFlow | null>(
      query,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["agent-rollout-flow"],
        },
      }
    )

    return content?.phases?.every((phase) => phase.userFlow?.length)
      ? content
      : fallback
  } catch {
    return fallback
  }
}
