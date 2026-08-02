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
      <div className="max-w-full overflow-x-auto pb-1">
        <TabsList
          aria-label={ariaLabel}
          className="mx-auto h-auto! min-w-max rounded-sm"
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
      </div>
    </Tabs>
  )
}
