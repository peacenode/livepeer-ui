import { defineQuery } from "next-sanity"

import fallbackContent from "@/content/agent-rollout-flow.json"
import { sanityClient } from "@/sanity/lib/client"

export type AgentRolloutScreen = {
  _key: string
  section: "marketing" | "userFlow"
  title: string
  imageUrl: string
  imageAlt: string
  imageHotspot?: { x: number; y: number }
  mockupHref?: string
  needs: string[]
}

export type AgentRolloutPhase = {
  _key: string
  name: string
  summary: string
  primaryCta?: string
  callout?: string
  screens: AgentRolloutScreen[]
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
      summary,
      primaryCta,
      callout,
      screens[] {
        _key,
        section,
        title,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        "imageHotspot": image.hotspot { x, y },
        mockupHref,
        needs
      }
    }
  }
`)

const fallback: AgentRolloutFlow = {
  title: fallbackContent.title,
  subtitle: fallbackContent.subtitle,
  phases: fallbackContent.phases.map((phase) => ({
    ...phase,
    screens: phase.screens.map(({ imagePath, ...screen }) => ({
      ...screen,
      section: screen.section as AgentRolloutScreen["section"],
      imageUrl: imagePath,
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

    return content?.phases?.length ? content : fallback
  } catch {
    return fallback
  }
}
