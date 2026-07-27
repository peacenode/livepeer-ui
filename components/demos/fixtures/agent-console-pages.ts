import type {
  AgentConsolePageDocument,
  AgentConsoleShell,
} from "@/sanity/lib/agent-console-pages"

export const agentConsoleShellFixture: AgentConsoleShell = {
  _id: "agentConsoleShell",
  homeAriaLabel: "Livepeer Agent home",
  navigation: [
    {
      _key: "home",
      label: "Home",
      href: "/mockups/livepeer-agent",
      external: false,
    },
    {
      _key: "usage",
      label: "Usage",
      href: "/mockups/livepeer-agent/usage",
      external: false,
    },
    {
      _key: "api-keys",
      label: "API Keys",
      href: "/mockups/livepeer-agent/api",
      external: false,
    },
    {
      _key: "api-logs",
      label: "Logs",
      href: "/mockups/livepeer-agent/api-logs",
      external: false,
    },
    {
      _key: "learn",
      label: "Learn",
      href: "/mockups/livepeer-org/library",
      external: true,
    },
  ],
  userMenu: {
    username: "Username",
    accountLabel: "Account",
    email: "username@example.com",
    manageProfileLabel: "Manage profile",
    developerDocsLabel: "Developer docs",
    termsLabel: "Terms & policies",
    helpLabel: "Help",
    logoutLabel: "Log out",
  },
  auth: {
    dialogLabel: "Sign in to Livepeer Agent",
    title: "Sign in to Livepeer Agent",
    description: "Continue to manage projects, usage, API keys, and billing.",
    continueLabel: "Continue",
  },
}

const common = (
  slug: AgentConsolePageDocument["slug"],
  heading: string,
  description: string
) => ({
  _id: `agentConsolePage-${slug}`,
  _type: "agentConsolePage" as const,
  slug,
  heading,
  description,
})

export const agentConsolePageFixtures = [
  {
    ...common("home", "Home", "Livepeer Agent project overview."),
    home: {
      onboardingTitle: "Get started with Livepeer Agent",
      onboardingSteps: [
        {
          _key: "install",
          label: "Install Livepeer Agent",
          href: "/mockups/livepeer-org/agent",
        },
        {
          _key: "credits",
          label: "Add credits",
          href: "/mockups/livepeer-agent/billing",
        },
      ],
      featureLinks: [
        {
          _key: "orchestrator",
          title: "Run an Orchestrator",
          description:
            "Provide compute to the network and earn service fees and protocol rewards.",
          href: "https://docs.livepeer.org/v1/orchestrators/guides/get-started",
          imageSrc:
            "/generated/20260725-101313-console-home-cards/orchestrator.png",
        },
        {
          _key: "playbooks",
          title: "Explore playbooks",
          description:
            "Create and edit images and video from the agent of your choice.",
          href: "/mockups/livepeer-org/library",
          imageSrc:
            "/generated/20260726-2326-console-home-playbooks/playbooks.png",
        },
      ],
      researchTitle: "Research",
      researchHref: "https://forum.livepeer.org/c/research/10",
      researchEmptyLabel: "Visit the Livepeer forum",
    },
  },
  {
    ...common("usage", "Usage", "Review credit balance and project activity."),
    usage: {
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
  },
  {
    ...common(
      "api-keys",
      "API Keys",
      "Create and manage the keys used to authenticate API requests."
    ),
    apiKeys: {
      newKeyLabel: "New API key",
      dialogTitle: "Create API key",
      dialogDescription:
        "Name this key so you can identify where it is being used. Keep generated keys secure and never share them publicly.",
      keyNameLabel: "Key name",
      keyNamePlaceholder: "Production, staging, local development…",
      cancelLabel: "Cancel",
      generateLabel: "Generate key",
      filterPlaceholder: "Filter by name…",
      emptyMessage: "No API keys yet.",
      paginationLabel: "Page 1",
    },
  },
  {
    ...common(
      "api-logs",
      "API Logs",
      "View your 100 most recent API requests and errors."
    ),
    apiLogs: {
      refreshLabel: "Refresh",
      clearLabel: "Clear logs",
      searchPlaceholder: "Search logs…",
      errorsOnlyLabel: "Errors only",
      emptyMessage: "No API logs yet. Make an API request to see it here.",
    },
  },
  {
    ...common(
      "billing",
      "Billing",
      "Review usage, manage payment details, and download invoices."
    ),
    billing: {
      ctas: [{ _key: "support", label: "Billing support", href: "/contact" }],
      managePaymentLabel: "Update",
    },
  },
  {
    ...common(
      "compute",
      "Compute",
      "Monitor network compute supply and orchestrator performance."
    ),
    compute: {
      actionLabel: "Run an Orchestrator",
      actionHref:
        "https://docs.livepeer.org/v1/orchestrators/guides/get-started",
      servicePayoutsLabel: "Service payouts (USD)",
      protocolRewardsLabel: "Protocol rewards (USD)",
      periodLabel: "24h",
      dataNote:
        "On-chain registry and performance leaderboard data, cached for 10 minutes.",
    },
  },
  {
    ...common(
      "inference",
      "Inference",
      "Inspect and deploy an inference container."
    ),
    inference: {
      breadcrumbLabel: "Inference",
      deployLabel: "Deploy",
      pullsLabel: "Pulls",
      starsLabel: "Stars",
      lastPushLabel: "Last push",
      imagesTitle: "Images",
      tagColumnLabel: "Tag",
      sizeColumnLabel: "Size",
      pushedColumnLabel: "Pushed",
      endpointsTitle: "Endpoints",
      runLocallyTitle: "Run locally",
      runLocallyDescription:
        "Start the container and ping it to verify it’s serving.",
      dataNote: "Live from Docker Hub and GitHub, cached for an hour.",
    },
  },
  {
    ...common(
      "account",
      "Manage profile",
      "Update the profile information associated with your Livepeer account."
    ),
    account: {
      profileDetailsTitle: "Profile details",
      profileDetailsDescription:
        "Keep this information current so collaborators can identify you.",
      uploadLabel: "Upload new",
      uploadHelp: "Upload a square image, ideally 512×512.",
      usernameLabel: "Username",
      usernameHelp: "Letters, numbers, underscores, and hyphens only.",
      displayNameLabel: "Display name",
      roleLabel: "Role",
      rolePlaceholder: "Developer, operator, creator…",
      locationLabel: "Location",
      locationPlaceholder: "City, Country",
      bioLabel: "Bio",
      bioPlaceholder: "Tell people about your work.",
      resetLabel: "Reset",
      saveLabel: "Save changes",
    },
  },
  {
    ...common(
      "project-settings",
      "Project settings",
      "Manage project defaults and access."
    ),
    projectSettings: {
      generalTabLabel: "General",
      membersTabLabel: "Members",
      projectNameLabel: "Project name",
      projectIdLabel: "Project ID",
      projectIdHelp:
        "Used to identify this project in API requests and usage data.",
      regionLabel: "Default compute region",
      regionHelp: "Used when a request does not specify a compute region.",
      allowKeysLabel: "Allow project API keys",
      saveLabel: "Save",
      membersDescription: "Add organization members to this project.",
      addMemberLabel: "Add member",
      memberColumnLabel: "Member",
      accessColumnLabel: "Access",
      sourceColumnLabel: "Source",
    },
  },
  {
    ...common(
      "organization",
      "Organization settings",
      "Manage organization details, members, and billing."
    ),
    organization: {
      generalTabLabel: "General",
      membersTabLabel: "Members",
      billingTabLabel: "Billing",
      organizationNameLabel: "Organization name",
      organizationIdLabel: "Organization ID",
      saveLabel: "Save",
      membersDescription:
        "Members can be assigned to projects after joining the organization.",
      inviteMemberLabel: "Invite member",
      currentPeriodLabel: "Current period",
      creditBalanceLabel: "Credit balance",
      addCreditsLabel: "Add credits",
      creditBalanceDescription:
        "Applied before charging the default payment method.",
      paymentMethodsTitle: "Payment methods",
      addPaymentMethodLabel: "Add payment method",
      invoicesTitle: "Invoices",
      downloadLabel: "Download",
      memberColumnLabel: "Member",
      emailColumnLabel: "Email",
      roleColumnLabel: "Role",
      methodColumnLabel: "Method",
      expiresColumnLabel: "Expires",
      invoiceColumnLabel: "Invoice",
      periodColumnLabel: "Period",
      amountColumnLabel: "Amount",
      statusColumnLabel: "Status",
    },
  },
] satisfies Array<AgentConsolePageDocument & { _type: "agentConsolePage" }>

export const agentConsoleSeedDocuments = [
  { ...agentConsoleShellFixture, _type: "agentConsoleShell" as const },
  ...agentConsolePageFixtures,
]
