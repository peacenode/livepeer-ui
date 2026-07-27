import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })

const key = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80)

const link = (label, href) => ({
  _key: key(label),
  _type: "marketingLink",
  label,
  href,
})

const item = (title, description, links = []) => ({
  _key: key(title),
  _type: "marketingItem",
  title,
  description,
  ...(links.length ? { links } : {}),
})

const weeks = [
  {
    _id: "marketingWeek-2026-07-27",
    _type: "marketingWeek",
    startsAt: "2026-07-27",
    outcomes: [
      item(
        "Social content system",
        "Socials revamped with new assets & supported by agent playbooks for content",
        [
          link("Social Kit", "/marketing/press-kit"),
          link("Agent Playbooks", "/marketing/agent-playbooks"),
        ]
      ),
      item("Agent website", "Agent website revamp", [
        link("Agent Console", "/mockups/livepeer-agent"),
        link(
          "Marketing Page",
          "/mockups/livepeer-org/agent"
        ),
        link("UI Registry", "/docs"),
        link("design.md", "/design.md"),
      ]),
      item(
        "Waitlist launch readiness",
        "Waitlist ready to go live",
        [link("Waitlist", "/mockups/waitlist")]
      ),
    ],
    outreach: [
      item("Partner outreach", "Partner outreach", [
        link("Livepeer.org", "/mockups/livepeer-org"),
      ]),
    ],
    sources: [
      item(
        "Post-install interviews",
        "Complete eight post-install web interviews"
      ),
      item(
        "Creative video interviews",
        "Recruit interview participants around video creation, trailers & game mechanics",
        [link("Livepeer.org", "/mockups/livepeer-org")]
      ),
    ],
  },
  {
    _id: "marketingWeek-2026-08-03",
    _type: "marketingWeek",
    startsAt: "2026-08-03",
    outcomes: [
      item("Waitlist launch", "Waitlist goes live", [
        link("Waitlist", "/mockups/waitlist"),
      ]),
      item("Pitch-form tracking", "Inbound pitch forms are tracked"),
      item("Integration fixes", "Integrations fixed", [
        link("Agent Console", "/mockups/livepeer-agent"),
      ]),
    ],
    outreach: [],
    sources: [],
  },
  {
    _id: "marketingWeek-2026-08-10",
    _type: "marketingWeek",
    startsAt: "2026-08-10",
    outcomes: [
      item(
        "Full beta and creative AI",
        "Steph: scaling full beta and creative AI"
      ),
      item(
        "First generations",
        "20 people can have their first generations",
        [
          link("Client", "/mockups/client"),
          link("Agent Playbooks", "/marketing/agent-playbooks"),
        ]
      ),
      item("Week-seed planning", "Plan basics to go in on week seed"),
      item("Development", "Joe / Mehrdad development"),
      item("Website scope", "Decide what needs to be on the website", [
        link("Livepeer.org", "/mockups/livepeer-org"),
      ]),
      item("Livepeer positioning", "Livepeer: “why?”", [
        link("Livepeer.org", "/mockups/livepeer-org"),
      ]),
      item(
        "Livepeer history",
        "Livepeer’s history, including GIFs and videos",
        [
          link("Livepeer.org", "/mockups/livepeer-org"),
          link("Brand Kit", "/marketing/brand-kit"),
        ]
      ),
      item(
        "Closed-beta automations",
        "Livepeer Automations machine for closed beta group",
        [link("Agent Playbooks", "/marketing/agent-playbooks")]
      ),
      item(
        "Livepeer 2.0 organizations",
        "Have a minimum of three organizations running Livepeer 2.0",
        [link("Agent Console", "/mockups/livepeer-agent")]
      ),
    ],
    outreach: [],
    sources: [],
    note: "Transcribed from a photographed planning board. Several phrases are difficult to read and should be checked against the original.",
  },
]

for (const week of weeks) {
  await client.createIfNotExists(week)
}

console.log(`Marketing planner ready with ${weeks.length} weeks.`)
