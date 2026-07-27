import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })

const itemTitles = {
  "Socials revamped with new assets & supported by agent playbooks for content":
    "Social content system",
  "Agent website revamp": "Agent website",
  "Waitlist ready to go live": "Waitlist launch readiness",
  "Partner outreach": "Partner outreach",
  "Complete eight post-install web interviews": "Post-install interviews",
  "Recruit interview participants around video creation, trailers & game mechanics":
    "Creative video interviews",
  "Waitlist goes live": "Waitlist launch",
  "Inbound pitch forms are tracked": "Pitch-form tracking",
  "Integrations fixed": "Integration fixes",
  "Steph: scaling full beta and creative AI":
    "Full beta and creative AI",
  "20 people can have their first generations": "First generations",
  "Plan basics to go in on week seed": "Week-seed planning",
  "Joe / Mehrdad development": "Development",
  "Decide what needs to be on the website": "Website scope",
  "Livepeer: “why?”": "Livepeer positioning",
  "Livepeer’s history, including GIFs and videos": "Livepeer history",
  "Livepeer Automations machine for closed beta group":
    "Closed-beta automations",
  "Have a minimum of three organizations running Livepeer 2.0":
    "Livepeer 2.0 organizations",
}

const sectionForGroup = {
  Outcomes: "outcomes",
  Outreach: "outreach",
  "User Interviews": "sources",
  Base: "outcomes",
  Website: "outcomes",
  "Closed beta": "outcomes",
}

const weeks = await client.fetch(
  `*[_type == "marketingWeek"] | order(startsAt asc)`
)

for (const week of weeks) {
  if (!Array.isArray(week.groups)) {
    throw new Error(`${week._id} has already been migrated`)
  }

  const sections = {
    outcomes: [],
    outreach: [],
    sources: [],
  }

  for (const group of week.groups) {
    const section = sectionForGroup[group.title]
    if (!section) {
      throw new Error(`Unknown group "${group.title}" in ${week._id}`)
    }

    for (const deliverable of group.deliverables ?? []) {
      const title = itemTitles[deliverable.title]
      if (!title) {
        throw new Error(
          `No title mapping for "${deliverable.title}" in ${week._id}`
        )
      }

      sections[section].push({
        _key: deliverable._key,
        _type: "marketingItem",
        title,
        description: deliverable.title,
        ...(deliverable.links?.length ? { links: deliverable.links } : {}),
      })
    }
  }

  await client
    .patch(week._id)
    .set(sections)
    .unset(["groups", "outcome"])
    .commit()
}

console.log(`Migrated ${weeks.length} marketing weeks.`)
