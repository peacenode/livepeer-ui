import type {
  LivepeerOrgPage,
  LivepeerOrgSite,
} from "@/sanity/lib/livepeer-org-pages"

export const livepeerOrgSiteFixture: LivepeerOrgSite = {
  _id: "livepeerOrgSite",
  homeHref: "/mockups/livepeer-org",
  menuLinks: [
    { label: "Home", href: "/mockups/livepeer-org" },
    { label: "Ecosystem", href: "/mockups/livepeer-org/ecosystem" },
    { label: "GPU", href: "/mockups/livepeer-org/earn" },
    { label: "Livepeer Agent", href: "/mockups/livepeer-org/agent" },
    { label: "Agent Playbooks", href: "/mockups/livepeer-org/library" },
  ],
  footerTagline: "The open inference network.",
  footerGroups: [
    {
      _key: "network",
      title: "Network",
      links: [{ label: "Ecosystem", href: "/mockups/livepeer-org/ecosystem" }],
    },
  ],
  socialLinks: [
    {
      label: "Livepeer on Discord",
      href: "https://discord.gg/livepeer",
      service: "discord",
    },
    { label: "Livepeer on X", href: "https://x.com/Livepeer", service: "x" },
    {
      label: "Livepeer on GitHub",
      href: "https://github.com/livepeer",
      service: "github",
    },
    {
      label: "Livepeer website",
      href: "https://livepeer.org",
      service: "website",
    },
  ],
  copyright: "© 2026 Livepeer Foundation. All rights reserved.",
}

export const livepeerOrgHomeFixture: NonNullable<
  LivepeerOrgPage["homeContent"]
> = {
  hero: {
    heading: "The open inference network.",
    accent: "Connect GPUs, power AI and media workloads on Livepeer.",
    primaryCta: { label: "Get Started", href: "/mockups/livepeer-org/agent" },
    secondaryCta: {
      label: "Sign in with Discord",
      href: "/mockups/livepeer-agent",
    },
  },
  agentFeature: {
    description:
      "A video agent harness for multimodal media generation, from right within Claude. Running on Livepeer's open network.",
    installCta: { label: "Install", href: "/mockups/livepeer-org/agent" },
    libraryCta: {
      label: "Browse Playbooks",
      href: "/mockups/livepeer-org/library",
    },
  },
  providerCta: {
    heading: "Become an Orchestrator",
    description:
      "Put a GPU on the Livepeer network and earn from inference workloads, service payouts, and protocol rewards.",
    cta: { label: "Get Started", href: "/mockups/livepeer-org/earn" },
  },
}

export const livepeerOrgAgentFixture: NonNullable<
  LivepeerOrgPage["agentContent"]
> = {
  hero: {
    heading: "Create and edit images and video with your agent.",
    description: "In your agent's MCP / connector settings, add this server:",
    serverUrl: "https://storyboard.daydream.monster/api/mcp",
    signInCta: { label: "Sign in", href: "/mockups/livepeer-agent" },
    createAccountCta: {
      label: "Create account",
      href: "/mockups/livepeer-agent",
    },
  },
  access: {
    heading: "Install Livepeer Agent in your app today",
    description:
      "Create an API key to add Livepeer Agent’s image and video workflows to your own product.",
    cta: { label: "Create an API key", href: "/mockups/livepeer-agent/api" },
  },
  capabilities: {
    heading:
      "Livepeer Agent brings image, video, audio, 3D, editing, rendering, and production tools across the Livepeer network into one interface.",
    cta: { label: "See more", href: "/mockups/livepeer-org/library" },
  },
  playbooks: {
    heading: "Playbooks, ready to run.",
    description:
      "Start from a complete recipe for image, video, or audio generation. Copy it into Livepeer Agent, customize the inputs, and create from your agent.",
    cta: { label: "Browse Playbooks", href: "/mockups/livepeer-org/library" },
  },
}

export const livepeerOrgLibraryFixture: NonNullable<
  LivepeerOrgPage["libraryContent"]
> = {
  heading: "Playbooks",
  description:
    "Playbooks are step-by-step production recipes for AI agents. Choose one, customize the brief, then copy it into your agent to run.",
  searchPlaceholder: "Search playbooks",
  allCategoryLabel: "All",
  emptyMessage: "No playbooks match your search.",
  footerHeading: "Run any playbook with Livepeer Agent.",
}

export const livepeerOrgEcosystemFixture: NonNullable<
  LivepeerOrgPage["ecosystemContent"]
> = {
  heading: "Built on Livepeer",
  description:
    "Explore what developers and teams are building with real-time AI video inference on Livepeer.",
  submitLabel: "Submit app",
  searchPlaceholder: "Search",
  emptyMessage: "No ecosystem apps match your search.",
  apps: [
    {
      _key: "daydream",
      name: "Daydream",
      domain: "daydream.live",
      href: "https://daydream.live",
      description:
        "Open-source, local-first platform for running real-time interactive generative AI video pipelines.",
      image: "/ecosystem/20260726-1500/daydream.svg",
      tags: ["AI Video", "Generative", "API"],
    },
  ],
  submission: {
    heading: "Add your app to the ecosystem",
    description:
      "Add your project details and logo to the Livepeer website repository, then open a pull request for review.",
    steps: [
      {
        _key: "entry",
        heading: "Add your app entry",
        description:
          "Create the app entry and complete the required frontmatter.",
      },
    ],
    templatePath: "content/ecosystem/your-app.md",
    template: "---\nname: Your App\nurl: https://your-app.com\n---",
    closeLabel: "Close",
    githubCta: {
      label: "Open GitHub template",
      href: "https://github.com/livepeer/website/new/main/content/ecosystem",
    },
  },
}

export const livepeerOrgEarnFixture: NonNullable<
  LivepeerOrgPage["earnContent"]
> = {
  earnings: {
    servicePayoutsLabel: "Service payouts",
    protocolRewardsLabel: "Protocol rewards",
    periodLabel: "24h",
  },
  hero: {
    heading: "Put a GPU on the network.",
    description:
      "Start with the operating model that fits your hardware, stake, and tolerance for infrastructure work. A pool is the shortest path. A solo node gives you control and the full operating burden.",
    cta: {
      label: "Orchestrator docs",
      href: "https://docs.livepeer.org/v2/orchestrators/setup/guide",
    },
  },
  pathsHeading: "Choose the right path",
  pathsDescription:
    "Do not buy tokens or new hardware before deciding which role you actually want to run.",
  paths: [
    {
      _key: "pool",
      heading: "Join a pool",
      fit: "Fastest path",
      icon: "cable",
      description:
        "Connect as a worker behind an existing Orchestrator. The operator handles registration, LPT, routing, and payouts; you provide GPU compute and receive off-chain earnings under the pool’s terms.",
      requirements: [
        "NVIDIA GPU and Linux",
        "Docker or go-livepeer",
        "Verified payout terms",
      ],
      note: "No LPT required",
      cta: {
        label: "Pool setup guide",
        href: "https://docs.livepeer.org/v2/orchestrators/guides/deployment-details/new-join-a-pool",
      },
    },
    {
      _key: "ai-first",
      heading: "Run AI-first",
      fit: "Best with 24 GB+ VRAM",
      icon: "sparkles",
      description:
        "Serve inference workloads where capability, price, latency, and uptime matter more than active-set stake.",
      requirements: ["CUDA 12+", "Docker", "NVIDIA Container Toolkit"],
      note: "Lower stake barrier",
      cta: {
        label: "AI operations",
        href: "https://docs.livepeer.org/v2/orchestrators/guides/ai-and-job-workloads/ai-inference-operations",
      },
    },
    {
      _key: "solo",
      heading: "Run a solo node",
      fit: "Full operator path",
      icon: "server-cog",
      description:
        "Operate go-livepeer, publish your service address, manage the wallet, set prices, and monitor rewards.",
      requirements: ["Arbitrum ETH", "LPT for video", "Public service URI"],
      note: "Most responsibility",
      cta: {
        label: "Solo setup guide",
        href: "https://docs.livepeer.org/v2/orchestrators/setup/guide",
      },
    },
  ],
  baselineHeading: "Baseline requirements",
  baselineDescription:
    "These are the practical requirements that apply before protocol configuration.",
  baseline: [
    {
      _key: "gpu",
      heading: "Supported GPU",
      icon: "cpu",
      description:
        "NVIDIA is the supported hardware-accelerated path. Confirm the host can see the card with nvidia-smi.",
    },
    {
      _key: "host",
      heading: "Production host",
      icon: "server",
      description:
        "Use Linux for production GPU workloads. AI also needs Docker, CUDA 12+, and NVIDIA Container Toolkit.",
    },
    {
      _key: "network",
      heading: "Public network",
      icon: "network",
      description:
        "Use stable, low-latency internet. Solo nodes need a public domain or static IP and an open service port.",
    },
    {
      _key: "budget",
      heading: "Operating budget",
      icon: "dollar",
      description:
        "Account for electricity, storage, bandwidth, and maintenance. Work and earnings are not guaranteed.",
    },
  ],
  arbitrum: {
    heading: "Arbitrum One",
    imageAlt: "Arbitrum",
    description:
      "Solo on-chain nodes need ETH on Arbitrum One for activation, reward calls, ticket redemption, and ongoing gas.",
    cta: {
      label: "Official Arbitrum Bridge",
      href: "https://bridge.arbitrum.io/",
    },
    disclaimer:
      "Use Arbitrum One, not Ethereum mainnet, for the operator wallet’s gas. Confirm the network and destination address before bridging or withdrawing funds, keep an ETH buffer for ongoing transactions, and never paste a private key into a website.",
  },
  stake: {
    heading: "$LPT stake",
    description:
      "Solo video operators need enough self-stake and delegated LPT to enter the active orchestrator set. Pool workers do not manage stake.",
    cta: {
      label: "View active orchestrators",
      href: "https://explorer.livepeer.org/orchestrators",
    },
  },
}

export const livepeerOrgSeedDocuments = [
  { ...livepeerOrgSiteFixture, _type: "livepeerOrgSite" as const },
  {
    _id: "livepeerOrgPage-home",
    _type: "livepeerOrgPage" as const,
    page: "home" as const,
    seoTitle: "Livepeer.org",
    seoDescription: "The open inference network.",
    homeContent: livepeerOrgHomeFixture,
  },
  {
    _id: "livepeerOrgPage-livepeer-agent",
    _type: "livepeerOrgPage" as const,
    page: "livepeer-agent" as const,
    seoTitle: "Livepeer Agent",
    seoDescription: "Create and edit images and video with your agent.",
    agentContent: livepeerOrgAgentFixture,
  },
  {
    _id: "livepeerOrgPage-playbook-library",
    _type: "livepeerOrgPage" as const,
    page: "playbook-library" as const,
    seoTitle: "Playbook library",
    seoDescription: "Production-ready playbooks for Livepeer Agent.",
    libraryContent: livepeerOrgLibraryFixture,
  },
  {
    _id: "livepeerOrgPage-ecosystem",
    _type: "livepeerOrgPage" as const,
    page: "ecosystem" as const,
    seoTitle: "Ecosystem",
    seoDescription: "Applications built on Livepeer.",
    ecosystemContent: livepeerOrgEcosystemFixture,
  },
  {
    _id: "livepeerOrgPage-provide-gpu-compute",
    _type: "livepeerOrgPage" as const,
    page: "provide-gpu-compute" as const,
    seoTitle: "Provide GPU compute",
    seoDescription:
      "Choose a Livepeer GPU provider path, prepare your hardware, and bring a node online.",
    earnContent: livepeerOrgEarnFixture,
  },
]
