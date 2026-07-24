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

const DOCKER_HUB_URL = "https://hub.docker.com/v2/repositories/livepeer"

export type ContainerImage = {
  tag: string
  sizeGb: number
  updatedAt: string
}

export type ContainerHubInfo = {
  pullCount: number
  updatedAt: string
  images: ContainerImage[]
}

export async function getContainerHubInfo(
  slug: string,
  tags: string[]
): Promise<ContainerHubInfo | null> {
  try {
    const [repoRes, ...tagResults] = await Promise.all([
      fetch(`${DOCKER_HUB_URL}/${slug}/`, { next: { revalidate: 3600 } }),
      ...tags.map((tag) =>
        fetch(`${DOCKER_HUB_URL}/${slug}/tags/${tag}`, {
          next: { revalidate: 3600 },
        })
      ),
    ])
    if (!repoRes.ok) return null
    const repo = await repoRes.json()
    const images: ContainerImage[] = []
    for (const res of tagResults) {
      if (!res.ok) continue
      const tag = await res.json()
      images.push({
        tag: tag.name,
        sizeGb: tag.full_size / 1e9,
        updatedAt: tag.last_updated,
      })
    }
    return {
      pullCount: Number(repo.pull_count ?? 0),
      updatedAt: String(repo.last_updated ?? ""),
      images,
    }
  } catch {
    return null
  }
}

export type GithubRepoInfo = {
  stars: number
  license: string | null
  contributors: string[]
}

export async function getGithubRepoInfo(
  repo: string
): Promise<GithubRepoInfo | null> {
  try {
    const [repoRes, contributorsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/repos/${repo}/contributors?per_page=5`, {
        next: { revalidate: 3600 },
      }),
    ])
    if (!repoRes.ok) return null
    const raw = await repoRes.json()
    const contributors: { login: string }[] = contributorsRes.ok
      ? await contributorsRes.json()
      : []
    return {
      stars: Number(raw.stargazers_count ?? 0),
      license: raw.license?.spdx_id ?? null,
      contributors: contributors.map((c) => c.login),
    }
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
