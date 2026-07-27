import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-27" })

const weeks = await client.fetch(
  `*[
    _type == "marketingWeek" &&
    (defined(outreach) || defined(sources))
  ] {
    _id,
    _rev,
    outcomes,
    outreach,
    sources
  }`,
  {},
  { perspective: "raw" }
)

if (weeks.length === 0) {
  console.log("No legacy marketing week fields found.")
  process.exit(0)
}

const transaction = client.transaction()

for (const week of weeks) {
  const items = [
    ...(week.outcomes ?? []),
    ...(week.outreach ?? []),
    ...(week.sources ?? []),
  ]
  const outcomes = Array.from(
    new Map(items.map((item) => [item._key, item])).values()
  )

  transaction.patch(week._id, {
    ifRevisionID: week._rev,
    set: { outcomes },
    unset: ["outreach", "sources"],
  })
}

await transaction.commit()

console.log(
  `Migrated ${weeks.length} marketing week document${weeks.length === 1 ? "" : "s"}.`
)
