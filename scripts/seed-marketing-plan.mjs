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

const deliverable = (title, links = []) => ({
  _key: key(title),
  _type: "marketingDeliverable",
  title,
  ...(links.length ? { links } : {}),
})

const group = (title, deliverables) => ({
  _key: key(title),
  _type: "marketingGroup",
  title,
  deliverables,
})

const weeks = [
  {
    _id: "marketingWeek-2026-07-27",
    _type: "marketingWeek",
    startsAt: "2026-07-27",
    groups: [
      group("Outcomes", [
        deliverable(
          "Socials revamped with new assets & supported by agent playbooks for content",
          [
            link("Social Kit", "/marketing/press-kit"),
            link("Agent Playbooks", "/marketing/agent-playbooks"),
          ]
        ),
        deliverable("Agent website revamp", [
          link("Billing/API mockup", "/mockups/livepeer-agent"),
          link(
            "Marketing page mockup",
            "http://localhost:3300/mockups/livepeer-org/agent"
          ),
          link("UI Registry", "/docs"),
          link("design.md", "/design.md"),
        ]),
        deliverable("Waitlist ready to go live", [
          link("Waitlist mockup", "/mockups/waitlist"),
        ]),
      ]),
      group("Outreach", [
        deliverable("Partner outreach", [
          link("Livepeer.org mockup", "/mockups/livepeer-org"),
        ]),
      ]),
      group("User Interviews", [
        deliverable("Complete eight post-install web interviews"),
        deliverable(
          "Recruit interview participants around video creation, trailers & game mechanics",
          [link("Livepeer.org mockup", "/mockups/livepeer-org")]
        ),
      ]),
    ],
  },
  {
    _id: "marketingWeek-2026-08-03",
    _type: "marketingWeek",
    startsAt: "2026-08-03",
    groups: [
      group("Outcomes", [
        deliverable("Waitlist goes live", [
          link("Waitlist mockup", "/mockups/waitlist"),
        ]),
        deliverable("Inbound pitch forms are tracked"),
        deliverable("Integrations fixed", [
          link("Billing/API mockup", "/mockups/livepeer-agent"),
        ]),
      ]),
    ],
  },
  {
    _id: "marketingWeek-2026-08-10",
    _type: "marketingWeek",
    startsAt: "2026-08-10",
    outcome: "Scale the full beta and creative AI.",
    groups: [
      group("Outcomes", [
        deliverable("Steph: scaling full beta and creative AI"),
        deliverable("20 people can have their first generations", [
          link("Client mockup", "/mockups/client"),
          link("Agent Playbooks", "/marketing/agent-playbooks"),
        ]),
      ]),
      group("Base", [
        deliverable("Plan basics to go in on week seed"),
        deliverable("Joe / Mehrdad development"),
      ]),
      group("Website", [
        deliverable("Decide what needs to be on the website", [
          link("Livepeer.org mockup", "/mockups/livepeer-org"),
        ]),
        deliverable("Livepeer: “why?”", [
          link("Livepeer.org mockup", "/mockups/livepeer-org"),
        ]),
        deliverable("Livepeer’s history, including GIFs and videos", [
          link("Livepeer.org mockup", "/mockups/livepeer-org"),
          link("Brand Kit", "/marketing/brand-kit"),
        ]),
      ]),
      group("Closed beta", [
        deliverable("Livepeer Automations machine for closed beta group", [
          link("Agent Playbooks", "/marketing/agent-playbooks"),
        ]),
        deliverable(
          "Have a minimum of three organizations running Livepeer 2.0",
          [link("Billing/API mockup", "/mockups/livepeer-agent")]
        ),
      ]),
    ],
    note: "Transcribed from a photographed planning board. Several phrases are difficult to read and should be checked against the original.",
  },
]

for (const week of weeks) {
  await client.createIfNotExists(week)
}

console.log(`Marketing planner ready with ${weeks.length} weeks.`)
