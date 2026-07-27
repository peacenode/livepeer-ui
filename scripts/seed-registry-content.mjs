import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })

const key = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80)

const cta = (label, href) => ({
  _key: key(label),
  _type: "registryCta",
  label,
  href,
})

const documents = [
  {
    _id: "mockupRoundup-agent-waitlist",
    _type: "mockupRoundup",
    slug: { _type: "slug", current: "agent-waitlist" },
    title: "Agent Waitlist",
    description:
      "Signup, referral, status, leaderboard, and branded background components for the Agent Waitlist.",
    previewHref: "/mockups/waitlist",
  },
  {
    _id: "mockupRoundup-agent-console",
    _type: "mockupRoundup",
    slug: { _type: "slug", current: "agent-console" },
    title: "Agent Console",
    description:
      "Application shell, account, usage, billing, API, inference, and compute components for the Agent Console.",
    previewHref: "/mockups/livepeer-agent",
  },
  {
    _id: "mockupRoundup-livepeer-org",
    _type: "mockupRoundup",
    slug: { _type: "slug", current: "livepeer-org" },
    title: "Livepeer.org",
    description:
      "Navigation, landing, Agent, playbook, ecosystem, and network sections used across Livepeer.org.",
    previewHref: "/mockups/livepeer-org",
  },
  {
    _id: "agentConsoleEditorialPage-usage",
    _type: "agentConsoleEditorialPage",
    page: "usage",
    heading: "Usage",
    description:
      "Review credit availability and activity across your Agent Console projects.",
    ctas: [
      cta(
        "Get more credits",
        "/mockups/livepeer-agent/organization?tab=billing"
      ),
    ],
  },
  {
    _id: "agentConsoleEditorialPage-billing",
    _type: "agentConsoleEditorialPage",
    page: "billing",
    heading: "Billing",
    description:
      "Manage billing settings and review invoices for your organization.",
    ctas: [
      cta(
        "Manage billing settings",
        "/mockups/livepeer-agent/organization?tab=billing"
      ),
    ],
  },
]

for (const document of documents) {
  await client.createIfNotExists(document)
}

console.log(`Registry content ready with ${documents.length} documents.`)
