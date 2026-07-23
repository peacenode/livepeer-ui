const ORCHESTRATORS_URL = "https://stronk.rocks/api/livepeer/getAllOrchInfo"
const LEADERBOARD_URL =
  "https://leaderboard-serverless.vercel.app/api/aggregated_stats"

export type Orchestrator = {
  address: string
  serviceHost: string
  stakeLpt: number
  feeShare: number
  volumeUsd: number
  active: boolean
  successRate: number | null
  bestScore: number | null
}

type RawOrchestrator = {
  id: string
  status?: string
  active?: boolean
  totalStake?: string
  feeShare?: string
  totalVolumeUSD?: string
  serviceURI?: string
}

type RegionStats = Record<
  string,
  { success_rate: number; round_trip_score: number; score: number }
>

export async function getOrchestrators(): Promise<Orchestrator[]> {
  try {
    const [orchRes, statsRes] = await Promise.all([
      fetch(ORCHESTRATORS_URL, { next: { revalidate: 600 } }),
      fetch(LEADERBOARD_URL, { next: { revalidate: 600 } }),
    ])
    if (!orchRes.ok) return []
    const raw: RawOrchestrator[] = await orchRes.json()
    const stats: Record<string, RegionStats> = statsRes.ok
      ? await statsRes.json()
      : {}

    return raw
      .filter((orch) => orch.status === "Registered")
      .map((orch) => {
        const regions = Object.values(stats[orch.id.toLowerCase()] ?? {})
        const successRate =
          regions.length > 0
            ? regions.reduce((sum, region) => sum + region.success_rate, 0) /
              regions.length
            : null
        const bestScore =
          regions.length > 0
            ? Math.max(...regions.map((region) => region.score))
            : null
        return {
          address: orch.id,
          serviceHost: hostFromUri(orch.serviceURI),
          stakeLpt: Number(orch.totalStake ?? 0),
          feeShare: Number(orch.feeShare ?? 0) / 1_000_000,
          volumeUsd: Number(orch.totalVolumeUSD ?? 0),
          active: Boolean(orch.active),
          successRate,
          bestScore,
        }
      })
      .sort((a, b) => Number(b.active) - Number(a.active) || b.stakeLpt - a.stakeLpt)
  } catch {
    return []
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
