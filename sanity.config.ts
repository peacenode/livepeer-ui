"use client"

import {
  CalendarIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
} from "lucide-react"
import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"

import { StudioNavbar } from "@/components/sanity/studio-navbar"
import { dataset, projectId } from "@/sanity/env"
import { schemaTypes } from "@/sanity/schema-types"

const singletonSchemaTypes = new Set([
  "mockupRoundup",
  "agentConsoleEditorialPage",
])

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Marketing planner")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("marketingWeek")
            .title("Weeks")
            .defaultOrdering([{ field: "startsAt", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Mockup roundups")
        .icon(GalleryVerticalEndIcon)
        .child(
          S.list()
            .title("Mockup roundups")
            .items([
              S.listItem()
                .title("Agent Waitlist")
                .child(
                  S.document()
                    .schemaType("mockupRoundup")
                    .documentId("mockupRoundup-agent-waitlist")
                ),
              S.listItem()
                .title("Agent Console")
                .child(
                  S.document()
                    .schemaType("mockupRoundup")
                    .documentId("mockupRoundup-agent-console")
                ),
              S.listItem()
                .title("Livepeer.org")
                .child(
                  S.document()
                    .schemaType("mockupRoundup")
                    .documentId("mockupRoundup-livepeer-org")
                ),
            ])
        ),
      S.listItem()
        .title("Agent Console editorial")
        .icon(CreditCardIcon)
        .child(
          S.list()
            .title("Agent Console editorial")
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
        ),
    ])

export default defineConfig({
  name: "livepeer-ui",
  title: "Livepeer UI",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },
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
