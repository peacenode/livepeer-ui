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
            .schemaType("mockupRoundup")
            .documentId("mockupRoundup-agent-waitlist")
        ),
    ])

const agentConsoleStructure: StructureResolver = (S) =>
  S.list()
    .title("Agent Console")
    .items([
      S.listItem()
        .title("Usage")
        .child(
          S.document()
            .schemaType("agentConsoleEditorialPage")
            .documentId("agentConsoleEditorialPage-usage")
        ),
      S.listItem()
        .title("Billing")
        .child(
          S.document()
            .schemaType("agentConsoleEditorialPage")
            .documentId("agentConsoleEditorialPage-billing")
        ),
    ])

const livepeerOrgStructure: StructureResolver = (S) =>
  S.list()
    .title("Livepeer.org")
    .items([
      S.listItem()
        .title("Home")
        .icon(GalleryVerticalEndIcon)
        .child(
          S.document()
            .schemaType("mockupRoundup")
            .documentId("mockupRoundup-livepeer-org")
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
