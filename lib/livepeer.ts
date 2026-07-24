const REGISTRY_URL = "https://livepeer-network-api.cloudspe.com/api/v1"
const LEADERBOARD_URL =
  "https://leaderboard-serverless.vercel.app/api/aggregated_stats"

export type NetworkStats = {
  activeOrchestrators: number
  totalStakeLpt: number
  payoutsUsd24h: number
  gatewaysKnown: number
}

export type Orchestrator = {
  address: string
  name: string
  serviceHost: string
  stakeLpt: number
  feeCutPercent: number
  active: boolean
  successRate: number | null
}

type RawOrchestrator = {
  address: string
  display_name?: string
  service_uri?: string
  total_stake?: string
  fee_cut_percent?: string
  is_active?: boolean
}

type RegionStats = Record<
  string,
  { success_rate: number; round_trip_score: number; score: number }
>

export async function getNetworkStats(): Promise<NetworkStats | null> {
  try {
    const res = await fetch(`${REGISTRY_URL}/network/stats`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) return null
    const raw = await res.json()
    return {
      activeOrchestrators: Number(raw.active_orchestrators ?? 0),
      totalStakeLpt: Number(raw.total_lpt_staked ?? 0),
      payoutsUsd24h: Number(raw.payouts_usd_24h ?? 0),
      gatewaysKnown: Number(raw.gateways_known ?? 0),
    }
  } catch {
    return null
  }
}

export async function getOrchestrators(): Promise<Orchestrator[]> {
  try {
    const [orchRes, statsRes] = await Promise.all([
      fetch(`${REGISTRY_URL}/orchestrators`, { next: { revalidate: 600 } }),
      fetch(LEADERBOARD_URL, { next: { revalidate: 600 } }),
    ])
    if (!orchRes.ok) return []
    const raw: { data: RawOrchestrator[] } = await orchRes.json()
    const stats: Record<string, RegionStats> = statsRes.ok
      ? await statsRes.json()
      : {}

    return (raw.data ?? [])
      .map((orch) => {
        const regions = Object.values(stats[orch.address.toLowerCase()] ?? {})
        const successRate =
          regions.length > 0
            ? regions.reduce((sum, region) => sum + region.success_rate, 0) /
              regions.length
            : null
        return {
          address: orch.address,
          name: orch.display_name || shortAddress(orch.address),
          serviceHost: hostFromUri(orch.service_uri),
          stakeLpt: Number(orch.total_stake ?? 0),
          feeCutPercent: Number(orch.fee_cut_percent ?? 0),
          active: Boolean(orch.is_active),
          successRate,
        }
      })
      .sort(
        (a, b) => Number(b.active) - Number(a.active) || b.stakeLpt - a.stakeLpt
      )
  } catch {
    return []
  }
}

export type AiGateway = {
  address: string
  name: string
  depositEth: number
  reserveEth: number
}

export async function getAiGateways(): Promise<AiGateway[]> {
  try {
    const res = await fetch(`${REGISTRY_URL}/gateways`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) return []
    const raw: {
      data: {
        address: string
        display_name?: string | null
        kind?: string
        latest_deposit?: string
        latest_reserve?: string
      }[]
    } = await res.json()
    return (raw.data ?? [])
      .filter((gateway) => gateway.kind === "ai")
      .map((gateway) => ({
        address: gateway.address,
        name: gateway.display_name || shortAddress(gateway.address),
        depositEth: Number(gateway.latest_deposit ?? 0),
        reserveEth: Number(gateway.latest_reserve ?? 0),
      }))
      .sort((a, b) => b.depositEth - a.depositEth)
  } catch {
    return []
  }
}

export type NetworkContainer = {
  orchestrator: string
  pipeline: string
  modelId: string
  pricePerUnit: string
  warm: boolean
}

// Container advertisements come from a gateway's getNetworkCapabilities
// feed, which no public gateway currently exposes — set
// LIVEPEER_GATEWAY_URL to a reachable AI gateway to populate it.
export async function getNetworkContainers(): Promise<NetworkContainer[]> {
  const gateway = process.env.LIVEPEER_GATEWAY_URL
  if (!gateway) return []
  try {
    const res = await fetch(
      `${gateway.replace(/\/$/, "")}/getNetworkCapabilities`,
      { next: { revalidate: 600 } }
    )
    if (!res.ok) return []
    const raw = await res.json()
    const containers: NetworkContainer[] = []
    for (const orch of raw.orchestrators ?? []) {
      const name = orch.address ?? orch.orchestrator ?? "unknown"
      for (const cap of orch.capabilities_prices ?? []) {
        containers.push({
          orchestrator: String(name),
          pipeline: String(cap.pipeline ?? cap.capability ?? ""),
          modelId: String(cap.model_id ?? ""),
          pricePerUnit: String(cap.price_per_unit ?? ""),
          warm: Boolean(cap.warm),
        })
      }
    }
    return containers
  } catch {
    return []
  }
}

const DOCKER_HUB_URL = "https://hub.docker.com/v2/repositories/livepeer/ai-runner"

export type ContainerImage = {
  tag: string
  sizeGb: number
  updatedAt: string
}

export type AiRunnerInfo = {
  pullCount: number
  images: Record<string, ContainerImage>
}

const RUNNER_TAGS = [
  "latest",
  "audio-to-text",
  "text-to-speech",
  "segment-anything-2",
  "llm",
]

export async function getAiRunnerInfo(): Promise<AiRunnerInfo | null> {
  try {
    const [repoRes, ...tagResults] = await Promise.all([
      fetch(`${DOCKER_HUB_URL}/`, { next: { revalidate: 3600 } }),
      ...RUNNER_TAGS.map((tag) =>
        fetch(`${DOCKER_HUB_URL}/tags/${tag}`, { next: { revalidate: 3600 } })
      ),
    ])
    if (!repoRes.ok) return null
    const repo = await repoRes.json()
    const images: Record<string, ContainerImage> = {}
    for (const res of tagResults) {
      if (!res.ok) continue
      const tag = await res.json()
      images[tag.name] = {
        tag: tag.name,
        sizeGb: tag.full_size / 1e9,
        updatedAt: tag.last_updated,
      }
    }
    return { pullCount: Number(repo.pull_count ?? 0), images }
  } catch {
    return null
  }
}

function hostFromUri(uri: string | undefined) {
  if (!uri) return ""
  try {
    return new URL(uri).hostname
  } catch {
    return uri
  }
}

export function formatCompact(value: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}
