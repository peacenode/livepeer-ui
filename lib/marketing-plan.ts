export interface PlanLink {
  label: string
  href: string
}

export interface PlanDeliverable {
  title: string
  links?: PlanLink[]
}

export interface PlanGroup {
  title?: string
  deliverables: PlanDeliverable[]
}

export interface MarketingWeek {
  week: number
  startsAt: string
  displayDate: string
  outcome?: string
  groups: PlanGroup[]
  note?: string
}

export const marketingWeeks: MarketingWeek[] = [
  {
    week: 3,
    startsAt: "2026-07-27",
    displayDate: "July 27, 2026",
    groups: [
      {
        title: "Outcomes",
        deliverables: [
          {
            title:
              "Socials revamped with new assets & supported by agent playbooks for content",
            links: [
              { label: "Social Kit", href: "/marketing/press-kit" },
              {
                label: "Agent Playbooks",
                href: "/marketing/agent-playbooks",
              },
            ],
          },
          {
            title: "Agent website revamp",
            links: [
              {
                label: "Billing/API mockup",
                href: "/mockups/livepeer-agent",
              },
              {
                label: "Marketing page mockup",
                href: "/mockups/livepeer-org/agent",
              },
              { label: "UI Registry", href: "/docs" },
              { label: "design.md", href: "/design.md" },
            ],
          },
          {
            title: "Waitlist ready to go live",
            links: [{ label: "Waitlist mockup", href: "/mockups/waitlist" }],
          },
        ],
      },
      {
        title: "Outreach",
        deliverables: [
          {
            title:
              "Partner outreach to Anthropic, Blockchain Capital & CoinFund",
            links: [
              {
                label: "Livepeer.org mockup",
                href: "/mockups/livepeer-org",
              },
              { label: "Social Kit", href: "/marketing/press-kit" },
            ],
          },
        ],
      },
      {
        title: "User Interviews",
        deliverables: [
          { title: "Complete eight post-install web interviews" },
          {
            title:
              "Recruit interview participants around video creation, trailers & game mechanics",
            links: [
              {
                label: "Livepeer.org mockup",
                href: "/mockups/livepeer-org",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 4,
    startsAt: "2026-08-03",
    displayDate: "August 3, 2026",
    groups: [
      {
        title: "Outcomes",
        deliverables: [
          {
            title: "Waitlist goes live",
            links: [{ label: "Waitlist mockup", href: "/mockups/waitlist" }],
          },
          { title: "Inbound pitch forms are tracked" },
          {
            title: "Integrations fixed",
            links: [
              {
                label: "Livepeer Agent mockup",
                href: "/mockups/livepeer-agent",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 5,
    startsAt: "2026-08-10",
    displayDate: "August 10, 2026",
    outcome: "Scale the full beta and creative AI.",
    groups: [
      {
        title: "Outcomes",
        deliverables: [
          { title: "Steph: scaling full beta and creative AI" },
          {
            title: "20 people can have their first generations",
            links: [
              { label: "Client mockup", href: "/mockups/client" },
              {
                label: "Agent Playbooks",
                href: "/marketing/agent-playbooks",
              },
            ],
          },
        ],
      },
      {
        title: "Base",
        deliverables: [
          { title: "Plan basics to go in on week seed" },
          { title: "Joe / Mehrdad development" },
        ],
      },
      {
        title: "Website",
        deliverables: [
          {
            title: "Decide what needs to be on the website",
            links: [
              {
                label: "Livepeer.org mockup",
                href: "/mockups/livepeer-org",
              },
            ],
          },
          {
            title: "Livepeer: “why?”",
            links: [
              {
                label: "Livepeer.org mockup",
                href: "/mockups/livepeer-org",
              },
            ],
          },
          {
            title: "Livepeer’s history, including GIFs and videos",
            links: [
              {
                label: "Livepeer.org mockup",
                href: "/mockups/livepeer-org",
              },
              { label: "Brand Kit", href: "/marketing/brand-kit" },
            ],
          },
        ],
      },
      {
        title: "Closed beta",
        deliverables: [
          {
            title: "Livepeer Automations machine for closed beta group",
            links: [
              {
                label: "Agent Playbooks",
                href: "/marketing/agent-playbooks",
              },
            ],
          },
          {
            title: "Have a minimum of three organizations running Livepeer 2.0",
            links: [
              {
                label: "Livepeer Agent mockup",
                href: "/mockups/livepeer-agent",
              },
            ],
          },
        ],
      },
    ],
    note: "Transcribed from a photographed planning board. Several phrases are difficult to read and should be checked against the original.",
  },
]
