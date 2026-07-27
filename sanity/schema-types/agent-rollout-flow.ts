import { PanelsTopLeftIcon } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

const requiredString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (rule) => rule.required(),
  })

export const agentRolloutFlowType = defineType({
  name: "agentRolloutFlow",
  title: "Agent rollout flow",
  type: "document",
  icon: PanelsTopLeftIcon,
  fields: [
    requiredString("title", "Page title"),
    requiredString("subtitle", "Page subtitle"),
    defineField({
      name: "phases",
      title: "Phases",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "phase",
          title: "Phase",
          type: "object",
          fields: [
            requiredString("name", "Name"),
            defineField({
              name: "summary",
              title: "User flow",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "primaryCta",
              title: "Primary CTA",
              description: "Leave empty when the phase has no primary CTA.",
              type: "string",
            }),
            defineField({
              name: "callout",
              title: "Callout",
              type: "string",
            }),
            defineField({
              name: "screens",
              title: "Screens",
              type: "array",
              validation: (rule) => rule.required().min(1),
              of: [
                defineArrayMember({
                  name: "screen",
                  title: "Screen",
                  type: "object",
                  fields: [
                    defineField({
                      name: "section",
                      title: "Section",
                      type: "string",
                      initialValue: "userFlow",
                      options: {
                        layout: "radio",
                        list: [
                          { title: "Marketing pages", value: "marketing" },
                          { title: "User flow", value: "userFlow" },
                        ],
                      },
                      validation: (rule) => rule.required(),
                    }),
                    requiredString("title", "Title"),
                    defineField({
                      name: "image",
                      title: "16:9 screen image",
                      type: "image",
                      options: { hotspot: true },
                      validation: (rule) => rule.required(),
                      fields: [
                        requiredString("alt", "Alternative text"),
                      ],
                    }),
                    defineField({
                      name: "mockupHref",
                      title: "External mockup URL",
                      description:
                        "Leave empty when there is no separate mockup to open.",
                      type: "url",
                      validation: (rule) =>
                        rule.uri({
                          allowRelative: true,
                          scheme: ["http", "https"],
                        }),
                    }),
                    defineField({
                      name: "needs",
                      title: "What needs to happen",
                      type: "array",
                      of: [defineArrayMember({ type: "string" })],
                      validation: (rule) => rule.required().min(1),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title",
                      subtitle: "section",
                      media: "image",
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "primaryCta",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
})
