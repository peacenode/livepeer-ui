"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CornerDownLeftIcon,
  CpuIcon,
  CreditCardIcon,
  KeyRoundIcon,
  SearchIcon,
  ZapIcon,
} from "lucide-react"

import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"

const pages = [
  {
    title: "Compute",
    description: "GPU fleet and capacity",
    href: "/mockups/compute",
    icon: CpuIcon,
  },
  {
    title: "Inference",
    description: "Pipelines and models",
    href: "/mockups/inference",
    icon: ZapIcon,
  },
  {
    title: "Billing",
    description: "Invoices and payment",
    href: "/mockups/billing",
    icon: CreditCardIcon,
  },
  {
    title: "API",
    description: "Keys and quick start",
    href: "/mockups/api",
    icon: KeyRoundIcon,
  },
]

const actions = [
  { title: "Add compute capacity", page: "Compute", href: "/mockups/compute" },
  { title: "New pipeline", page: "Inference", href: "/mockups/inference" },
  { title: "View invoices", page: "Billing", href: "/mockups/billing" },
  { title: "Update payment method", page: "Billing", href: "/mockups/billing" },
  { title: "Create API key", page: "API", href: "/mockups/api" },
]

export function GlobalSearch() {
  const router = useRouter()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [])

  function close() {
    setOpen(false)
    setQuery("")
    inputRef.current?.blur()
  }

  const matches = (text: string) =>
    text.toLowerCase().includes(query.trim().toLowerCase())

  const pageResults = pages.filter(
    (page) => matches(page.title) || matches(page.description)
  )
  const actionResults = actions.filter(
    (action) => matches(action.title) || matches(action.page)
  )

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "relative z-50 flex h-9 items-center gap-2 px-3",
          !open &&
            "rounded-md border border-input bg-background shadow-xs transition-colors hover:bg-muted"
        )}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          role="combobox"
          aria-expanded={open}
          aria-label="Search"
          onFocus={() => setOpen(true)}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") close()
            if (event.key === "Enter") {
              const first = pageResults[0] ?? actionResults[0]
              if (first) {
                close()
                router.push(first.href)
              }
            }
          }}
          placeholder="Search"
          className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {!open && <Kbd>⌘K</Kbd>}
      </div>
      {open && (
        <div className="absolute inset-x-0 top-0 z-40 rounded-xl bg-popover pt-9 shadow-lg ring-1 ring-foreground/10">
          <div className="mx-3 border-t" />
          <div className="flex max-h-96 flex-col gap-4 overflow-y-auto p-3">
            {pageResults.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="px-1 text-xs font-medium text-muted-foreground">
                  Pages
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {pageResults.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={close}
                      className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-muted"
                    >
                      <page.icon className="size-5" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">{page.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {page.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {actionResults.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="px-1 text-xs font-medium text-muted-foreground">
                  Actions
                </span>
                {actionResults.map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    onClick={close}
                    className="flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <CornerDownLeftIcon className="size-4 text-muted-foreground" />
                    <span>{action.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {action.page}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            {pageResults.length === 0 && actionResults.length === 0 && (
              <p className="px-1 py-6 text-center text-sm text-muted-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
