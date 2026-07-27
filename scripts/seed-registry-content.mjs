import { getCliClient } from "sanity/cli"

import { agentConsoleSeedDocuments } from "../components/demos/fixtures/agent-console-pages.ts"
import { livepeerOrgSeedDocuments } from "../components/demos/fixtures/livepeer-org.ts"
import { waitlistContentSeedDocument } from "../components/demos/waitlist-content-fixture.ts"
import { plannerPageSeedDocuments } from "../components/demos/fixtures/planner-pages.ts"

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

const page = (title, href, components) => ({
  _key: key(title),
  _type: "mockupPage",
  title,
  href,
  components,
})

const consoleShell = [
  "livepeer-agent-page-frame",
  "livepeer-agent-sidebar",
  "user-menu",
]

const livepeerOrgShell = [
  "livepeer-org-menu",
  "livepeer-org-header",
  "livepeer-org-footer",
]

const documents = [
  {
    _id: "mockupRoundup-planner",
    _type: "mockupRoundup",
    slug: { _type: "slug", current: "planner" },
    title: "Planner",
    description:
      "Application shell, media workspace, project, character, storyboard, installation, and protocol components for Planner.",
    previewHref: "/mockups/videobuddy",
    pages: [
      page("Home", "/mockups/videobuddy", [
        "client-application-shell",
        "client-application-sidebar",
        "client-mobile-bottom-navigation",
        "generation-workspace-section",
      ]),
      page("Characters", "/mockups/videobuddy/characters", [
        "client-application-shell",
        "characters-workspace-section",
      ]),
      page("Footage", "/mockups/videobuddy/footage", [
        "client-application-shell",
        "clips-header",
        "clips-library",
        "clips-library-section",
        "clip-card",
        "media-context-menu",
      ]),
      page("Install", "/mockups/videobuddy/install", [
        "client-application-shell",
        "client-install-command",
      ]),
      page("Projects", "/mockups/videobuddy/projects", [
        "client-application-shell",
        "project-picker",
        "projects-workspace-section",
      ]),
      page("Protocol", "/mockups/videobuddy/protocol", [
        "protocol-header-section",
        "protocol-flow-section",
        "protocol-request-flow-section",
        "protocol-properties-section",
      ]),
      page("Storyboards", "/mockups/videobuddy/storyboards", [
        "client-application-shell",
        "storyboards-workspace-section",
      ]),
    ],
  },
  {
    _id: "mockupRoundup-agent-waitlist",
    _type: "mockupRoundup",
    slug: { _type: "slug", current: "agent-waitlist" },
    title: "Agent Waitlist",
    description:
      "Signup, referral, status, leaderboard, and branded background components for the Agent Waitlist.",
    previewHref: "/mockups/waitlist",
    pages: [
      page("Waitlist", "/mockups/waitlist", [
        "waitlist-panel",
        "waitlist-signup-form",
        "waitlist-status-card",
        "waitlist-referral-link",
        "waitlist-leaderboard",
        "waitlist-background-hero",
      ]),
    ],
  },
  {
    _id: "mockupRoundup-agent-console",
    _type: "mockupRoundup",
    slug: { _type: "slug", current: "agent-console" },
    title: "Agent Console",
    description:
      "Application shell, account, usage, billing, API, inference, and compute components for the Agent Console.",
    previewHref: "/mockups/livepeer-agent",
    pages: [
      page("Home", "/mockups/livepeer-agent", [
        ...consoleShell,
        "livepeer-agent-auth-gate",
        "livepeer-agent-sign-in-card",
        "livepeer-agent-onboarding-section",
      ]),
      page("Usage", "/mockups/livepeer-agent/usage", [
        ...consoleShell,
        "usage-workspace-section",
        "credit-balance",
        "usage-metrics",
        "daily-usage-table",
        "resource-usage-table",
        "livepeer-agent-promo-cards",
      ]),
      page("API Keys", "/mockups/livepeer-agent/api", [
        ...consoleShell,
        "api-key-actions",
        "delete-api-key-dialog",
        "api-keys-section",
      ]),
      page("API Logs", "/mockups/livepeer-agent/api-logs", [
        ...consoleShell,
        "api-logs-section",
      ]),
      page("Billing", "/mockups/livepeer-agent/billing", [
        ...consoleShell,
        "billing-workspace-section",
        "billing-page-summary",
        "invoice-table",
      ]),
      page("Compute", "/mockups/livepeer-agent/compute", [
        ...consoleShell,
        "compute-workspace-section",
        "compute-metrics",
        "orchestrator-table-section",
      ]),
      page("Account", "/mockups/livepeer-agent/account", consoleShell),
      page(
        "Project settings",
        "/mockups/livepeer-agent/settings",
        consoleShell
      ),
      page(
        "Organization",
        "/mockups/livepeer-agent/organization",
        consoleShell
      ),
      page("Inference", "/mockups/livepeer-agent/inference/livepeer-agent", [
        ...consoleShell,
      ]),
    ],
  },
  {
    _id: "mockupRoundup-livepeer-org",
    _type: "mockupRoundup",
    slug: { _type: "slug", current: "livepeer-org" },
    title: "Livepeer.org",
    description:
      "Navigation, landing, Agent, playbook, ecosystem, and network sections used across Livepeer.org.",
    previewHref: "/mockups/livepeer-org",
    pages: [
      page("Home", "/mockups/livepeer-org", [
        ...livepeerOrgShell,
        "network-hero-section",
        "livepeer-agent-feature-section",
        "orchestrator-cta-section",
      ]),
      page("Livepeer Agent", "/mockups/livepeer-org/agent", [
        ...livepeerOrgShell,
        "livepeer-agent-hero",
        "agent-compatibility",
        "agent-access-section",
        "agent-capabilities-section",
        "playbooks-cta-section",
      ]),
      page("Playbook library", "/mockups/livepeer-org/library", [
        ...livepeerOrgShell,
        "playbook-library-header",
        "playbook-card",
        "playbook-catalog",
        "install-agent-footer",
      ]),
      page("Ecosystem", "/mockups/livepeer-org/ecosystem", [
        ...livepeerOrgShell,
        "copy-button",
        "submit-ecosystem-dialog",
        "ecosystem-card",
        "ecosystem-catalog",
      ]),
      page("Provide GPU compute", "/mockups/livepeer-org/earn", [
        ...livepeerOrgShell,
      ]),
    ],
  },
  {
    _id: "agentConsoleEditorialPage-usage",
    _type: "agentConsoleEditorialPage",
    page: "usage",
    heading: "Usage",
    description:
      "Review credit availability and activity across your Agent Console projects.",
    usageContent: {
      overviewTabLabel: "Overview",
      activityTabLabel: "Activity",
      upgradeTitle: "Get more credits",
      upgradeDescription:
        "Upgrade for a larger credit allocation that refreshes every month.",
      dailyUsageTitle: "Daily usage",
      dailyUsageEmptyMessage: "No daily usage recorded yet.",
      resourceUsageTitle: "Usage by resource",
      resourceUsageEmptyMessage: "No resource usage recorded yet.",
    },
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
  waitlistContentSeedDocument,
  ...agentConsoleSeedDocuments,
  ...livepeerOrgSeedDocuments,
  ...plannerPageSeedDocuments,
]

function missingFieldPatch(value, prefix = "") {
  return Object.entries(value).reduce((patch, [key, entry]) => {
    if (key === "_id" || key === "_type") return patch

    const path = prefix ? `${prefix}.${key}` : key
    if (
      entry &&
      typeof entry === "object" &&
      !Array.isArray(entry) &&
      !("_type" in entry)
    ) {
      return { ...patch, ...missingFieldPatch(entry, path) }
    }

    patch[path] = entry
    return patch
  }, {})
}

for (const document of documents) {
  await client.createIfNotExists(document)
  await client
    .patch(document._id)
    .setIfMissing(missingFieldPatch(document))
    .commit()
}

for (const document of documents.filter(
  (document) => document._type === "mockupRoundup"
)) {
  await client
    .patch(document._id)
    .set({ pages: document.pages })
    .unset(["contentBadges"])
    .commit()
}

const usageDocument = documents.find(
  (document) => document._id === "agentConsoleEditorialPage-usage"
)
await client
  .patch(usageDocument._id)
  .setIfMissing({ usageContent: usageDocument.usageContent })
  .commit()

console.log(`Registry content ready with ${documents.length} documents.`)
