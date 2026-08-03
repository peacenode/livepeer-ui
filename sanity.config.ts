"use client"

import {
  CalendarIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
  ImagesIcon,
  PanelsTopLeftIcon,
} from "lucide-react"
import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"

import { dataset, projectId } from "@/sanity/env"
import { schemaTypes } from "@/sanity/schema-types"
import { StockImageManager } from "@/sanity/stock-images/stock-image-manager"

const singletonSchemaTypes = new Set([
  "agentRolloutFlow",
  "mockupRoundup",
  "agentConsoleEditorialPage",
  "waitlistPageContent",
  "welcomeEmailContent",
  "agentConsoleShell",
  "agentConsolePage",
  "livepeerOrgSite",
  "livepeerOrgPage",
])

const flowsStructure: StructureResolver = (S) =>
  S.list()
    .title("Flows")
    .items(
      [
        ["internal-testing", "Internal testing"],
        ["private-beta", "Private beta"],
        ["public-beta", "Public beta"],
      ].map(([id, title]) =>
        S.listItem()
          .id(id)
          .title(title)
          .icon(PanelsTopLeftIcon)
          .child(
            S.document()
              .id(`agent-rollout-flow-${id}`)
              .title(title)
              .schemaType("agentRolloutFlow")
              .documentId("agentRolloutFlow")
          )
      )
    )

const plannerStructure: StructureResolver = (S) =>
  S.documentTypeList("marketingWeek")
    .title("Weeks")
    .defaultOrdering([{ field: "startsAt", direction: "asc" }])

const waitlistStructure: StructureResolver = (S) =>
  S.list()
    .title("Waitlist")
    .items([
      S.listItem()
        .title("Waitlist")
        .icon(GalleryVerticalEndIcon)
        .child(
          S.document()
            .schemaType("waitlistPageContent")
            .documentId("waitlistPageContent-waitlist")
        ),
      S.listItem()
        .title("Welcome email")
        .icon(GalleryVerticalEndIcon)
        .child(
          S.document()
            .schemaType("welcomeEmailContent")
            .documentId("welcomeEmailContent-private-beta")
        ),
    ])

const agentConsoleStructure: StructureResolver = (S) =>
  S.list()
    .title("Agent Console")
    .items([
      S.listItem()
        .title("Shared shell")
        .child(
          S.document()
            .schemaType("agentConsoleShell")
            .documentId("agentConsoleShell")
        ),
      S.divider(),
      S.listItem()
        .title("Home")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-home")
        ),
      S.listItem()
        .title("Usage")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-usage")
        ),
      S.listItem()
        .title("API Keys")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-api-keys")
        ),
      S.listItem()
        .title("API Logs")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-api-logs")
        ),
      S.listItem()
        .title("Billing")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-billing")
        ),
      S.listItem()
        .title("Compute")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-compute")
        ),
      S.listItem()
        .title("Inference")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-inference")
        ),
      S.listItem()
        .title("Account")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-account")
        ),
      S.listItem()
        .title("Project settings")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-project-settings")
        ),
      S.listItem()
        .title("Organization")
        .child(
          S.document()
            .schemaType("agentConsolePage")
            .documentId("agentConsolePage-organization")
        ),
    ])

const livepeerOrgStructure: StructureResolver = (S) =>
  S.list()
    .title("Livepeer.org")
    .items([
      S.listItem()
        .title("Shared site")
        .child(
          S.document()
            .schemaType("livepeerOrgSite")
            .documentId("livepeerOrgSite")
        ),
      S.divider(),
      S.listItem()
        .title("Home")
        .icon(GalleryVerticalEndIcon)
        .child(
          S.document()
            .schemaType("livepeerOrgPage")
            .documentId("livepeerOrgPage-home")
        ),
      S.listItem()
        .title("Livepeer Agent")
        .child(
          S.document()
            .schemaType("livepeerOrgPage")
            .documentId("livepeerOrgPage-livepeer-agent")
        ),
      S.listItem()
        .title("Playbook library")
        .child(
          S.document()
            .schemaType("livepeerOrgPage")
            .documentId("livepeerOrgPage-playbook-library")
        ),
      S.listItem()
        .title("Ecosystem")
        .child(
          S.document()
            .schemaType("livepeerOrgPage")
            .documentId("livepeerOrgPage-ecosystem")
        ),
      S.listItem()
        .title("Provide GPU compute")
        .child(
          S.document()
            .schemaType("livepeerOrgPage")
            .documentId("livepeerOrgPage-provide-gpu-compute")
        ),
      S.divider(),
      S.listItem()
        .title("Blog")
        .icon(GalleryVerticalEndIcon)
        .child(
          S.documentTypeList("livepeerBlogPost")
            .title("Blog posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
    ])

export default defineConfig({
  name: "livepeer-ui",
  title: "Livepeer UI",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      name: "flows",
      title: "Flows",
      icon: PanelsTopLeftIcon,
      structure: flowsStructure,
    }),
    structureTool({
      name: "planner",
      title: "Planner",
      icon: CalendarIcon,
      structure: plannerStructure,
    }),
    structureTool({
      name: "waitlist",
      title: "Waitlist",
      icon: GalleryVerticalEndIcon,
      structure: waitlistStructure,
    }),
    structureTool({
      name: "agent-console",
      title: "Agent Console",
      icon: CreditCardIcon,
      structure: agentConsoleStructure,
    }),
    structureTool({
      name: "livepeer-org",
      title: "Livepeer.org",
      icon: GalleryVerticalEndIcon,
      structure: livepeerOrgStructure,
    }),
  ],
  tools: (prev) => [
    ...prev,
    {
      name: "stock-images",
      title: "Stock Images",
      icon: ImagesIcon,
      component: StockImageManager,
    },
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter(
        (template) =>
          !singletonSchemaTypes.has(template.schemaType) &&
          template.schemaType !== "plannerMarkdownDocument"
      ),
      {
        id: "planner-markdown-internal-meeting",
        title: "Internal meeting",
        schemaType: "plannerMarkdownDocument",
        value: { kind: "internal-meeting" },
      },
      {
        id: "planner-markdown-user-interview",
        title: "User interview",
        schemaType: "plannerMarkdownDocument",
        value: { kind: "user-interview" },
      },
    ],
  },
  document: {
    actions: (actions, context) =>
      singletonSchemaTypes.has(context.schemaType)
        ? actions.filter((action) => action.action !== "duplicate")
        : actions,
  },
})
