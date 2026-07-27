import { CalendarIcon, LinkIcon, ListIcon } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

const relativeOrHttpUrl = (value: string | undefined) => {
  if (!value) return true
  if (value.startsWith("/") && !value.startsWith("//")) return true

  try {
    const url = new URL(value)
    return ["http:", "https:"].includes(url.protocol)
      ? true
      : "Use a site-relative path or an HTTP(S) URL"
  } catch {
    return "Use a site-relative path or an HTTP(S) URL"
  }
}

export const marketingWeekType = defineType({
  name: "marketingWeek",
  title: "Marketing week",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "startsAt",
      title: "Start date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      description: "Reserved for planning context; not shown on the public page.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "groups",
      title: "Groups",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "marketingGroup",
          title: "Group",
          type: "object",
          icon: ListIcon,
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "deliverables",
              title: "Deliverables",
              type: "array",
              validation: (rule) => rule.required().min(1),
              of: [
                defineArrayMember({
                  name: "marketingDeliverable",
                  title: "Deliverable",
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "links",
                      title: "Links",
                      type: "array",
                      of: [
                        defineArrayMember({
                          name: "marketingLink",
                          title: "Link",
                          type: "object",
                          icon: LinkIcon,
                          fields: [
                            defineField({
                              name: "label",
                              title: "Label",
                              type: "string",
                              validation: (rule) => rule.required(),
                            }),
                            defineField({
                              name: "href",
                              title: "URL or path",
                              type: "string",
                              validation: (rule) =>
                                rule.required().custom(relativeOrHttpUrl),
                            }),
                          ],
                          preview: {
                            select: {
                              title: "label",
                              subtitle: "href",
                            },
                          },
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title",
                      links: "links",
                    },
                    prepare({ title, links }) {
                      const count = Array.isArray(links) ? links.length : 0
                      return {
                        title,
                        subtitle: count
                          ? `${count} ${count === 1 ? "link" : "links"}`
                          : undefined,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              deliverables: "deliverables",
            },
            prepare({ title, deliverables }) {
              const count = Array.isArray(deliverables)
                ? deliverables.length
                : 0
              return {
                title: title || "Untitled group",
                subtitle: `${count} ${
                  count === 1 ? "deliverable" : "deliverables"
                }`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      startsAt: "startsAt",
      outcome: "outcome",
    },
    prepare({ startsAt, outcome }) {
      const title = startsAt
        ? new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(`${startsAt}T00:00:00Z`))
        : "Week without a date"

      return {
        title,
        subtitle: outcome,
      }
    },
  },
  orderings: [
    {
      title: "Start date, newest",
      name: "startsAtDesc",
      by: [{ field: "startsAt", direction: "desc" }],
    },
    {
      title: "Start date, oldest",
      name: "startsAtAsc",
      by: [{ field: "startsAt", direction: "asc" }],
    },
  ],
})
