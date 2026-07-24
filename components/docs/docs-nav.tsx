"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { components } from "@/lib/docs"

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
      title: "Components",
      items: components.map((component) => ({
        title: component.title,
        href: `/docs/components/${component.name}`,
      })),
    },
    {
      title: "Mockups",
      external: true,
      items: [
        { title: "Platform", href: "/mockups/platform" },
        { title: "Agent", href: "/mockups/agent" },
      ],
    },
  ]

  return (
    <nav className={cn("flex flex-col gap-6", className)}>
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <h4 className="px-2 py-1 text-sm font-medium">{group.title}</h4>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              target={group.external ? "_blank" : undefined}
              className={cn(
                "rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "bg-accent font-medium text-accent-foreground"
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
