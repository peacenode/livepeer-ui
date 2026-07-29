"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const textSizes = [
  { label: "xs", className: "text-xs" },
  { label: "sm", className: "text-sm" },
  { label: "base", className: "text-base" },
  { label: "lg", className: "text-lg" },
  { label: "xl", className: "text-xl" },
  { label: "2xl", className: "text-2xl", tracking: "tracking-tight" },
  { label: "3xl", className: "text-3xl", tracking: "tracking-tight" },
  { label: "4xl", className: "text-4xl", tracking: "tracking-tight" },
  { label: "5xl", className: "text-5xl", tracking: "tracking-tighter" },
  { label: "6xl", className: "text-6xl", tracking: "tracking-tighter" },
  { label: "7xl", className: "text-7xl", tracking: "tracking-tighter" },
  { label: "8xl", className: "text-8xl", tracking: "tracking-tighter" },
  { label: "9xl", className: "text-9xl", tracking: "tracking-tighter" },
]

const weights = [
  "font-light",
  "font-book",
  "font-normal",
  "font-medium",
  "font-bold",
] as const

export function DisplayTypeScale() {
  const [weight, setWeight] = useState<(typeof weights)[number]>("font-light")

  return (
    <div className="mt-10">
      <Tabs
        value={weight}
        onValueChange={(value) => setWeight(value as (typeof weights)[number])}
      >
        <div className="max-w-full overflow-x-auto pb-1">
          <TabsList aria-label="Display font weight">
            {weights.map((weightToken) => (
              <TabsTrigger key={weightToken} value={weightToken}>
                {weightToken}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <div className="mt-4 flex flex-col divide-y rounded-lg border">
        {textSizes.map((size) => (
          <div
            key={size.label}
            className="flex flex-col gap-3 overflow-x-auto p-6"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary" className="font-normal">
                text-{size.label}
              </Badge>
              <Badge variant="secondary" className="font-normal">
                font-display
              </Badge>
              <Badge variant="secondary" className="font-normal">
                {weight}
              </Badge>
              {"tracking" in size && (
                <Badge variant="secondary" className="font-normal">
                  {size.tracking}
                </Badge>
              )}
            </div>
            <p
              className={`font-display leading-none whitespace-nowrap ${weight} ${size.className} ${"tracking" in size ? size.tracking : ""}`}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
