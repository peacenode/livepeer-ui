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
      title: "Mockups",
      external: true,
      items: [
        { title: "Console", href: "/mockups/platform" },
        { title: "Agent", href: "/mockups/agent" },
      ],
    },
    {
      title: "Components",
      items: components.map((component) => ({
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
