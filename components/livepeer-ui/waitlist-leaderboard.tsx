export type WaitlistLeader = {
  name: string
  referrals: number
}

export function WaitlistLeaderboard({
  leaders,
  heading,
  personColumnLabel,
  referralsColumnLabel,
  currentUserLabel,
  currentUserReferrals = 0,
}: {
  leaders: WaitlistLeader[]
  heading: string
  personColumnLabel: string
  referralsColumnLabel: string
  currentUserLabel: string
  currentUserReferrals?: number
}) {
  return (
    <section aria-labelledby="waitlist-leaders">
      <h2 id="waitlist-leaders" className="text-sm font-medium">
        {heading}
      </h2>
      <div className="mt-3 overflow-hidden rounded-md border">
        <div className="flex items-center justify-between border-b px-3 py-2 text-xs text-muted-foreground">
          <span>{personColumnLabel}</span>
          <span>{referralsColumnLabel}</span>
        </div>
        <ol className="divide-y">
          {leaders.map((person, index) => (
            <li
              key={`${person.name}-${index}`}
              className="flex items-center justify-between gap-4 px-3 py-2.5 text-sm"
            >
              <span className="truncate">{person.name}</span>
              <span className="font-mono text-xs tabular-nums">
                {person.referrals}
              </span>
            </li>
          ))}
          <li
            className="flex items-center justify-between gap-4 bg-emerald-400/10 px-3 py-3 text-sm"
            role="status"
            aria-live="polite"
          >
            <span className="truncate font-medium">{currentUserLabel}</span>
            <span className="font-mono text-xs text-emerald-400 tabular-nums">
              {currentUserReferrals}
            </span>
          </li>
        </ol>
      </div>
    </section>
  )
}
