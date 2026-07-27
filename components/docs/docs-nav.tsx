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
  const activeComponentGroups = componentGroups.filter(
    (group) => group.title !== "Client Archived"
  )
  const archivedClientGroup = componentGroups.find(
    (group) => group.title === "Client Archived"
  )
  const productGroupHrefs: Record<string, string> = {
    "Agent Waitlist": "/docs/products/agent-waitlist",
    "Agent Console": "/docs/products/agent-console",
    "Livepeer.org": "/docs/products/livepeer-org",
  }

  const groups = [
    {
      title: "Foundations",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Brand", href: "/docs/brand" },
        { title: "Assets", href: "/docs/assets" },
        { title: "Colors", href: "/docs/colors" },
        { title: "Favorit Pro", href: "/docs/favorit-pro" },
        { title: "Favorit Mono", href: "/docs/favorit-mono" },
      ],
    },
    {
      title: "Marketing",
      items: [
        { title: "Planner", href: "/marketing/planner" },
        { title: "Social Kit", href: "/marketing/press-kit" },
        { title: "Brand Kit", href: "/marketing/brand-kit" },
        { title: "Agent Playbooks", href: "/marketing/agent-playbooks" },
      ],
    },
    ...activeComponentGroups.map((group) => ({
      title: group.title,
      titleHref: productGroupHrefs[group.title],
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
    ...(archivedClientGroup
      ? [
          {
            title: archivedClientGroup.title,
            items: [
              {
                title: "Client Archive",
                href: "/mockups/client",
                external: true,
              },
              ...archivedClientGroup.items.map((component) => ({
                title: component.title,
                href: `/docs/components/${component.name}`,
                external: false,
              })),
            ],
          },
        ]
      : []),
  ]

  return (
    <nav className={cn("flex flex-col gap-6", className)}>
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col items-start">
          <h4 className="text-sm font-medium">
            {"titleHref" in group && group.titleHref ? (
              <Link
                href={group.titleHref}
                onClick={onNavigate}
                className={cn(
                  "block rounded-md px-2 py-1 transition-colors hover:bg-muted",
                  pathname === group.titleHref && "bg-muted"
                )}
              >
                {group.title}
              </Link>
            ) : (
              <span className="block px-2 py-1">{group.title}</span>
            )}
          </h4>
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
                "rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-muted",
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
