"use client"

import { SearchIcon, XIcon } from "lucide-react"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

function FilterBadge({
  label,
  onActivate,
  onRemove,
}: {
  label: string
  onActivate: () => void
  onRemove: () => void
}) {
  return (
    <Badge
      variant="secondary"
      render={<div onClick={onActivate} />}
      className="h-7 max-w-52 cursor-pointer gap-1 rounded-sm px-2.5 text-xs font-normal hover:bg-secondary/80"
    >
      <span className="truncate">{label}</span>
      <button
        type="button"
        className="-mr-1 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        aria-label={`Remove ${label}`}
        onClick={(event) => {
          event.stopPropagation()
          onRemove()
        }}
      >
        <XIcon className="size-3!" aria-hidden="true" />
      </button>
    </Badge>
  )
}

export function FilterSearch({
  categories,
  category,
  onCategoryChange,
  query,
  onQueryChange,
  placeholder,
  searchLabel,
  categoriesLabel,
  className,
  categoryGridClassName,
}: {
  categories: string[]
  category: string
  onCategoryChange: (category: string) => void
  query: string
  onQueryChange: (query: string) => void
  placeholder: string
  searchLabel: string
  categoriesLabel: string
  className?: string
  categoryGridClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const hasFilters = category !== "All" || query.trim().length > 0

  function close() {
    setOpen(false)
  }

  function selectCategory(item: string) {
    onCategoryChange(item)
    close()
  }

  useEffect(() => {
    if (!open) return

    const focusFrame = window.requestAnimationFrame(() =>
      inputRef.current?.focus()
    )

    function handlePointerDown(event: PointerEvent) {
      if (!panelRef.current?.contains(event.target as Node)) close()
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close()
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("relative z-30 flex h-11 justify-center", className)}>
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.div
              ref={panelRef}
              key="expanded"
              className="absolute -top-4 left-1/2 w-full max-w-2xl overflow-hidden rounded-sm bg-white shadow-xl sm:-top-5"
              style={{ transformOrigin: "top center" }}
              initial={{ x: "-50%", opacity: 0, scale: 0.985 }}
              animate={{ x: "-50%", opacity: 1, scale: 1 }}
              exit={{
                x: "-50%",
                opacity: 0,
                scale: 0.985,
                y: -2,
                transition: { duration: 0.08, ease: "easeOut" },
              }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border-x border-t border-black/[0.08] [mask-image:linear-gradient(to_bottom,#000_0%,#000_1px,transparent_45%)]"
              />
              <div className="relative px-4 pt-4 sm:px-5 sm:pt-5">
                <InputGroup className="h-11 rounded-sm border bg-background has-[[data-slot=input-group-control]:focus-visible]:ring-0">
                  <InputGroupAddon
                    align="inline-start"
                    className="h-full gap-1.5 py-0 pr-0 pl-0"
                  >
                    <SearchIcon className="size-4" aria-hidden="true" />
                    {category !== "All" && (
                      <FilterBadge
                        label={category}
                        onActivate={() => inputRef.current?.focus()}
                        onRemove={() => onCategoryChange("All")}
                      />
                    )}
                  </InputGroupAddon>
                  <InputGroupInput
                    ref={inputRef}
                    type="text"
                    inputMode="search"
                    enterKeyHint="search"
                    className="h-11 py-0 pr-0 pl-1.5 text-sm leading-none"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") close()
                    }}
                    placeholder={category === "All" ? placeholder : ""}
                    aria-label={searchLabel}
                  />
                  <InputGroupAddon align="inline-end" className="pr-0">
                    <InputGroupButton
                      size="icon-xs"
                      className="justify-end text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:ring-0"
                      aria-label="Close search"
                      onClick={close}
                    >
                      <XIcon className="-translate-x-0.5" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <motion.div
                className={cn(
                  "mt-6 grid w-full gap-x-6 gap-y-3 px-4 pb-5 sm:px-5 sm:pb-6 md:gap-x-8",
                  categoryGridClassName
                )}
                aria-label={categoriesLabel}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.06 }}
              >
                {categories.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "h-auto w-full min-w-0 justify-start rounded-none p-0 font-medium hover:bg-transparent hover:text-foreground",
                      category === item
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                    onClick={() => selectCategory(item)}
                  >
                    {item}
                  </Button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="trigger"
              className="flex w-full max-w-2xl justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.08, ease: "easeOut" }}
            >
              <div className="relative h-11 w-fit">
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    "h-11 cursor-pointer gap-1.5 rounded-sm px-0 font-normal hover:bg-transparent active:translate-y-0",
                    hasFilters && "invisible"
                  )}
                  aria-label={searchLabel}
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  onClick={() => setOpen(true)}
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center">
                    <SearchIcon className="size-4" />
                  </span>
                  <span>{placeholder}</span>
                </Button>
                {hasFilters && (
                  <div className="absolute top-0 left-0 flex h-11 cursor-pointer items-center gap-1.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="shrink-0 cursor-pointer rounded-sm hover:bg-transparent active:translate-y-0"
                      aria-label={searchLabel}
                      aria-haspopup="dialog"
                      aria-expanded={open}
                      onClick={() => setOpen(true)}
                    >
                      <SearchIcon className="size-4" />
                    </Button>
                    {category !== "All" && (
                      <FilterBadge
                        label={category}
                        onActivate={() => setOpen(true)}
                        onRemove={() => onCategoryChange("All")}
                      />
                    )}
                    {query.trim().length > 0 && (
                      <FilterBadge
                        label={query.trim()}
                        onActivate={() => setOpen(true)}
                        onRemove={() => onQueryChange("")}
                      />
                    )}
                    <button
                      type="button"
                      className="h-11 w-24 shrink-0 cursor-pointer sm:w-40"
                      aria-label={searchLabel}
                      onClick={() => setOpen(true)}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
