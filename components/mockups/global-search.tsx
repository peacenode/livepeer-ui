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

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Kbd } from "@/components/ui/kbd"

const pages = [
  {
    title: "Compute",
    description: "GPU fleet and capacity",
    href: "/mockups/platform/compute",
    icon: CpuIcon,
  },
  {
    title: "Inference",
    description: "Pipelines and models",
    href: "/mockups/platform/inference",
    icon: ZapIcon,
  },
  {
    title: "Billing",
    description: "Invoices and payment",
    href: "/mockups/platform/billing",
    icon: CreditCardIcon,
  },
  {
    title: "API",
    description: "Keys and quick start",
    href: "/mockups/platform/api",
    icon: KeyRoundIcon,
  },
]

const actions = [
  { title: "Add compute capacity", page: "Compute", href: "/mockups/platform/compute" },
  { title: "New pipeline", page: "Inference", href: "/mockups/platform/inference" },
  { title: "View invoices", page: "Billing", href: "/mockups/platform/billing" },
  { title: "Update payment method", page: "Billing", href: "/mockups/platform/billing" },
  { title: "Create API key", page: "API", href: "/mockups/platform/api" },
]

export function GlobalSearch({ shortcut = true }: { shortcut?: boolean }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    if (!shortcut) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [shortcut])

  React.useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const matches = (text: string) =>
    text.toLowerCase().includes(query.trim().toLowerCase())

  const pageResults = pages.filter(
    (page) => matches(page.title) || matches(page.description)
  )
  const actionResults = actions.filter(
    (action) => matches(action.title) || matches(action.page)
  )

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button className="flex h-9 w-full max-w-xs items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground shadow-xs transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" />
        }
      >
        <SearchIcon className="size-4" />
        <span>Search</span>
        <Kbd className="ml-auto">⌘K</Kbd>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="top-24 max-w-lg translate-y-0 gap-0 p-0"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="flex items-center gap-3 border-b px-4">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const first = pageResults[0] ?? actionResults[0]
                if (first) go(first.href)
              }
            }}
            placeholder="Search pages and actions"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
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
                    onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted"
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
      </DialogContent>
    </Dialog>
  )
}
