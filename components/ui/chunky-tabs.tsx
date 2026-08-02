"use client"

import { ChevronDownIcon } from "lucide-react"
import LiquidGlass from "liquid-glass-react"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const subscribeToGlassVariant = () => () => undefined

function getGlassVariantSnapshot() {
  const requested =
    new URLSearchParams(window.location.search).get("glass") === "liquid"
  const chromium = /Chrom(e|ium)|Edg\//.test(navigator.userAgent)
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  return requested && chromium && !reducedMotion
}

export function ChunkyTabs({
  items,
  value,
  onValueChange,
  ariaLabel,
  className,
}: {
  items: readonly string[]
  value: string
  onValueChange: (value: string) => void
  ariaLabel: string
  className?: string
}) {
  const tabsListRef = useRef<HTMLDivElement>(null)
  const [tabBarSize, setTabBarSize] = useState({ width: 0, height: 0 })
  const useLiquidGlass = useSyncExternalStore(
    subscribeToGlassVariant,
    getGlassVariantSnapshot,
    () => false
  )

  useEffect(() => {
    const tabsList = tabsListRef.current
    if (!tabsList) return

    const updateSize = () => {
      const { width, height } = tabsList.getBoundingClientRect()
      setTabBarSize({ width, height })
    }
    const frame = requestAnimationFrame(updateSize)
    const observer = new ResizeObserver(updateSize)
    observer.observe(tabsList)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return (
    <div className={cn(className)}>
      <div className="flex justify-center sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={ariaLabel}
            render={
              <button className="inline-flex h-11 w-fit items-center gap-2 rounded-sm border bg-muted px-3 text-sm outline-none transition-colors hover:bg-muted/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" />
            }
          >
            <span>{value}</span>
            <ChevronDownIcon className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[calc(100vw-2rem)] max-w-xs rounded-sm p-1"
            align="center"
          >
            <DropdownMenuRadioGroup
              value={value}
              onValueChange={onValueChange}
            >
              {items.map((item) => (
                <DropdownMenuRadioItem
                  key={item}
                  value={item}
                  className="rounded-sm text-sm"
                >
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs
        value={value}
        onValueChange={onValueChange}
        className="hidden sm:flex"
        data-glass-variant={useLiquidGlass ? "liquid" : "frosted"}
      >
        <div className="relative mx-auto">
          {useLiquidGlass && tabBarSize.width > 0 && (
            <div
              className="pointer-events-none absolute inset-0 translate-x-1/2 translate-y-1/2 [&>*]:absolute!"
              aria-hidden
            >
            <LiquidGlass
              padding="0px"
              cornerRadius={6}
              displacementScale={28}
              blurAmount={0.04}
              saturation={135}
              aberrationIntensity={1.25}
              elasticity={0.12}
              style={{ width: tabBarSize.width, height: tabBarSize.height }}
            >
                <div
                  style={{ width: tabBarSize.width, height: tabBarSize.height }}
                />
            </LiquidGlass>
            </div>
          )}
          <TabsList
            ref={tabsListRef}
            aria-label={ariaLabel}
            className={cn(
              "relative z-10 mx-auto h-auto! min-w-max rounded-sm",
              useLiquidGlass && "bg-white/15 shadow-none backdrop-blur-none"
            )}
          >
            {items.map((item) => (
              <TabsTrigger
                key={item}
                value={item}
                className="h-auto flex-none rounded-sm py-2 text-sm"
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  )
}
