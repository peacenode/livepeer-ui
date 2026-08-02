"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  return (
    <Tabs
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList
        aria-label={ariaLabel}
        className="mx-auto h-auto! max-w-full justify-start overflow-x-auto rounded-sm sm:justify-center"
      >
        {items.map((item) => (
          <TabsTrigger
            key={item}
            value={item}
            className="h-auto flex-none rounded-sm py-2"
          >
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
