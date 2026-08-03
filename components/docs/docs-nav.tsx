"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { componentGroups, primitives } from "@/lib/docs"

export function DocsNav({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  const pathname = usePathname()
  const groups = [
    {
      title: "Sprint",
      items: [
        { title: "Planner", href: "/marketing/planner" },
        { title: "Flows", href: "/marketing/agent-ftue-flow" },
        { title: "Social Kit", href: "/marketing/press-kit" },
        { title: "Brand Kit", href: "/marketing/brand-kit" },
        { title: "Stock Images", href: "/marketing/stock-images" },
        { title: "Agent Playbooks", href: "/marketing/agent-playbooks" },
      ],
    },
    {
      title: "Mockups",
      items: [
        {
          title: "Internal Testing",
          href: "/docs/mockups/internal-testing",
        },
        { title: "Private Beta", href: "/docs/mockups/private-beta" },
        { title: "Public Beta", href: "/docs/mockups/public-beta" },
      ],
    },
    {
      title: "Foundations",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Brand", href: "/docs/brand" },
        { title: "Assets", href: "/docs/assets" },
        { title: "Colors", href: "/docs/colors" },
        { title: "Slides", href: "/docs/slides" },
        { title: "Font display", href: "/docs/favorit-pro" },
        { title: "Font sans", href: "/docs/inter" },
      ],
    },
    ...componentGroups
      .filter((group) => group.title !== "Planner")
      .map((group) => ({
        title: group.title,
        items: group.items.map((component) => ({
          title: component.title,
          href: `/docs/components/${component.name}`,
        })),
      })),
    {
      title: "Primitives",
      items: primitives.map((component) => ({
        title: component.title,
        href: `/docs/components/${component.name}`,
      })),
    },
  ]

  return (
    <nav className={cn("flex flex-col gap-6", className)}>
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col items-start">
          <h4 className="px-2 py-1 text-sm font-medium">{group.title}</h4>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              target={
                (
                  "external" in item
                    ? item.external
                    : "external" in group
                      ? group.external
                      : false
                )
                  ? "_blank"
                  : undefined
              }
              className={cn(
                "rounded-md px-2 py-2.5 text-sm transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                pathname === item.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
