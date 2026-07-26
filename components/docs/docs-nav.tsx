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
    {
      title: "Mockups",
      external: true,
      items: [
        { title: "Waitlist", href: "/mockups/waitlist" },
        { title: "Livepeer Agent", href: "/mockups/livepeer-agent" },
        { title: "Livepeer.org", href: "/mockups/livepeer-org" },
      ],
    },
    ...componentGroups.map((group) => ({
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
    {
      title: "Archive",
      external: true,
      items: [{ title: "Client", href: "/mockups/client" }],
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
              target={group.external ? "_blank" : undefined}
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
