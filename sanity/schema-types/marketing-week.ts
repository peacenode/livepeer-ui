import { CalendarIcon, LinkIcon, ListChecksIcon } from "lucide-react"
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

export const marketingLinkType = defineType({
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
      validation: (rule) => rule.required().custom(relativeOrHttpUrl),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
})

export const marketingItemType = defineType({
  name: "marketingItem",
  title: "Planner item",
  type: "object",
  icon: ListChecksIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "marketingLink" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
})

const plannerListField = ({
  name,
  title,
  description,
}: {
  name: "outcomes" | "outreach" | "sources"
  title: string
  description: string
}) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [defineArrayMember({ type: "marketingItem" })],
  })

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
    plannerListField({
      name: "outcomes",
      title: "Outcomes",
      description: "Results and deliverables planned for this week.",
    }),
    plannerListField({
      name: "outreach",
      title: "Outreach",
      description: "Partner and community outreach planned for this week.",
    }),
    plannerListField({
      name: "sources",
      title: "Sources",
      description: "Interviews and other source material informing the work.",
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
    },
    prepare({ startsAt }) {
      const title = startsAt
        ? new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(`${startsAt}T00:00:00Z`))
        : "Week without a date"

      return { title }
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
