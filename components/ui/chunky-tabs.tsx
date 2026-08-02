"use client"

import { ChevronsUpDownIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

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
    <div className={cn(className)}>
      <div className="mx-auto w-full max-w-xs sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={ariaLabel}
            render={
              <button className="flex h-11 w-full items-center justify-between rounded-sm border bg-muted px-3 text-sm outline-none transition-colors hover:bg-muted/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" />
            }
          >
            <span>{value}</span>
            <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-sm p-1" align="center">
            <DropdownMenuRadioGroup
              value={value}
              onValueChange={onValueChange}
            >
              {items.map((item) => (
                <DropdownMenuRadioItem
                  key={item}
                  value={item}
                  className="rounded-sm"
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
      >
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
      </Tabs>
    </div>
  )
}
