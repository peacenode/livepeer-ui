import { LivepeerGradientLockup } from "@/components/brand"

export function WaitlistStatusCard({
  positionLabel,
  referralsLabel,
  position = 2419,
  referrals = 0,
}: {
  positionLabel: string
  referralsLabel: string
  position?: number
  referrals?: number
}) {
  return (
    <section
      className="relative isolate overflow-hidden rounded-sm border border-emerald-400/30 bg-black p-5 text-white"
      aria-labelledby="share-card-title"
    >
      <div className="pointer-events-none absolute -top-24 -right-20 -z-10 size-56 rounded-full bg-emerald-400/25 blur-3xl" />
      <LivepeerGradientLockup className="h-4 w-auto" />
      <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-4">
        <div>
          <p className="text-xs text-white/50">{positionLabel}</p>
          <p
            id="share-card-title"
            className="mt-1 font-sans text-5xl leading-none font-semibold tracking-[-0.06em] text-emerald-400 tabular-nums"
          >
            #{position.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/50">{referralsLabel}</p>
          <p className="mt-1 font-sans text-2xl leading-none font-medium tabular-nums">
            {referrals}
          </p>
        </div>
      </div>
    </section>
  )
}
