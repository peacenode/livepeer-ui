import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })

const labelReplacements = {
  "Billing/API mockup": "Agent Console",
  "Marketing page mockup": "Marketing Page",
  "Waitlist mockup": "Agent Waitlist",
  Waitlist: "Agent Waitlist",
  "Livepeer.org mockup": "Livepeer.org",
  "Client mockup": "Client",
}

const sections = ["outcomes", "outreach", "sources"]
const weeks = await client.fetch(
  `*[_type == "marketingWeek"] | order(startsAt asc)`
)

let updatedWeeks = 0

for (const week of weeks) {
  let changed = false
  const patch = {}

  for (const section of sections) {
    if (!Array.isArray(week[section])) continue

    patch[section] = week[section].map((item) => ({
      ...item,
      links: item.links?.map((link) => {
        const label = labelReplacements[link.label] ?? link.label
        const href =
          link.href === "http://localhost:3300/mockups/livepeer-org/agent"
            ? "/mockups/livepeer-org/agent"
            : link.href

        if (label !== link.label || href !== link.href) changed = true

        return { ...link, label, href }
      }),
    }))
  }

  if (!changed) continue

  await client.patch(week._id).set(patch).commit()
  updatedWeeks += 1
}

console.log(`Updated planner links in ${updatedWeeks} marketing weeks.`)
