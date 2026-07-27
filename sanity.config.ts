"use client"

import {
  CalendarIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
} from "lucide-react"
import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"

import { dataset, projectId } from "@/sanity/env"
import { schemaTypes } from "@/sanity/schema-types"

const singletonSchemaTypes = new Set([
  "mockupRoundup",
  "agentConsoleEditorialPage",
  "waitlistPageContent",
  "agentConsoleShell",
  "agentConsolePage",
  "livepeerOrgSite",
  "livepeerOrgPage",
  "plannerPageContent",
])

const plannerStructure: StructureResolver = (S) =>
  S.list()
    .title("Planner")
    .items([
      S.listItem()
        .title("Weeks")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("marketingWeek")
            .title("Weeks")
            .defaultOrdering([{ field: "startsAt", direction: "desc" }])
        ),
      S.divider(),
      ...[
        ["Home", "home"],
        ["Characters", "characters"],
        ["Footage", "footage"],
        ["Install", "install"],
        ["Projects", "projects"],
        ["Protocol", "protocol"],
        ["Storyboards", "storyboards"],
      ].map(([title, page]) =>
        S.listItem()
          .title(title)
          .child(
            S.document()
              .schemaType("plannerPageContent")
              .documentId(`plannerPageContent-${page}`)
          )
      ),
    ])

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
    ])

export default defineConfig({
  name: "livepeer-ui",
  title: "Livepeer UI",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
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
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (template) => !singletonSchemaTypes.has(template.schemaType)
      ),
  },
  document: {
    actions: (actions, context) =>
      singletonSchemaTypes.has(context.schemaType)
        ? actions.filter((action) => action.action !== "duplicate")
        : actions,
  },
})
