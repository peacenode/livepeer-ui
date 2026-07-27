import type { VideoBuddyPageContent } from "@/components/mockups/contracts"

const page = (
  name: VideoBuddyPageContent["page"],
  content: Omit<VideoBuddyPageContent, "_id" | "_type" | "page">
): VideoBuddyPageContent => ({
  _id: `videoBuddyPageContent-${name}`,
  _type: "videoBuddyPageContent",
  page: name,
  ...content,
})

export const videoBuddyPageFixtures: VideoBuddyPageContent[] = [
  page("home", { metadataTitle: "Livepeer Agent" }),
  page("characters", {
    metadataTitle: "Characters - Livepeer",
    heading: "Characters",
    primaryActionLabel: "New character",
    emptyStateTitle: "No characters yet",
  }),
  page("footage", {
    metadataTitle: "Clips - Livepeer",
    heading: "Clips",
    primaryActionLabel: "Upload clips",
    emptyStateTitle: "No clips yet",
  }),
  page("install", {
    metadataTitle: "Install Livepeer Agent",
    heading: "Install Livepeer Agent",
    description: "Add Livepeer Agent to Codex or Claude Code with one command.",
    supportingText:
      "Run this once from your terminal. Livepeer Agent will be available across projects.",
  }),
  page("projects", {
    metadataTitle: "Projects - Livepeer",
    heading: "Projects",
    primaryActionLabel: "New project",
    emptyStateTitle: "No finals yet",
  }),
  page("protocol", {
    metadataTitle: "Livepeer Agent, workflows, and compute",
    heading:
      "Livepeer Agent connects applications and agents to media workflows. Compute runs them.",
    description:
      "Workflows define what happens. Livepeer Agent makes them available through the CLI, MCP, and API. The Livepeer network supplies the compute that executes every run.",
    protocol: {
      eyebrow: "Livepeer",
      flowHeading: "Three layers, one request",
      layers: [
        {
          _key: "agent",
          number: "01",
          title: "Livepeer Agent",
          description:
            "Livepeer Agent is the interface between people, agents, applications, and Livepeer. It accepts a task, authenticates the caller, and starts the right workflow.",
          detail: "CLI · MCP with OAuth · API",
          href: "/mockups/livepeer-org/agent",
          icon: "play",
        },
        {
          _key: "inference",
          number: "02",
          title: "Inference",
          description:
            "Inference containers define the models, inputs, and runtime needed to produce a result on the network.",
          detail: "Select · run · measure usage",
          href: "/mockups/livepeer-agent/inference/livepeer-agent",
          icon: "blocks",
        },
        {
          _key: "compute",
          number: "03",
          title: "Compute",
          description:
            "Orchestrators provide the GPUs that execute workflows. The network matches each run with available compute and returns the result to Livepeer Agent.",
          detail: "Orchestrators · GPUs · rewards",
          href: "/mockups/livepeer-agent/compute",
          icon: "cpu",
        },
      ],
      requestHeading: "How a Livepeer Agent request moves",
      requestSteps: [
        {
          _key: "intent",
          title: "Intent",
          description:
            "A person, agent, or application asks Livepeer Agent to create or transform media.",
        },
        {
          _key: "workflow",
          title: "Workflow",
          description:
            "Livepeer Agent selects the saved workflow and validates its inputs.",
        },
        {
          _key: "execution",
          title: "Execution",
          description:
            "An orchestrator runs the workflow on its GPU and returns the output.",
        },
        {
          _key: "result",
          title: "Result",
          description:
            "Livepeer Agent returns the output to the CLI, connected agent, or application.",
        },
      ],
      agentPropertyHeading: "Any agent can use Livepeer Agent",
      agentPropertyDescription:
        "Connect the Livepeer Agent MCP and authorize it with OAuth. The agent gets access to this project’s workflows without handling a long-lived API credential.",
      paymentPropertyHeading: "Payment follows execution",
      paymentPropertyDescription:
        "The project pays when a workflow runs. The orchestrator that supplies the GPU earns service fees, while protocol rewards support active network compute.",
      architectureLinkLabel: "Read the protocol architecture",
      architectureLinkHref:
        "https://docs.livepeer.org/v2/about/protocol/architecture",
    },
  }),
  page("storyboards", {
    metadataTitle: "Storyboards - Livepeer",
    heading: "Storyboards",
    primaryActionLabel: "New storyboard",
    emptyStateTitle: "No image uploads yet",
  }),
]

export function videoBuddyPageFixture(page: VideoBuddyPageContent["page"]) {
  const content = videoBuddyPageFixtures.find((item) => item.page === page)
  if (!content) throw new Error(`Missing VideoBuddy fixture for ${page}`)
  return content
}
