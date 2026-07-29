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
  { label: "2xl", className: "text-2xl" },
  { label: "3xl", className: "text-3xl" },
  { label: "4xl", className: "text-4xl" },
  { label: "5xl", className: "text-5xl" },
  { label: "6xl", className: "text-6xl" },
  { label: "7xl", className: "text-7xl" },
  { label: "8xl", className: "text-8xl" },
  { label: "9xl", className: "text-9xl" },
]

const weights = [
  "font-thin",
  "font-extralight",
  "font-light",
  "font-normal",
  "font-medium",
  "font-semibold",
  "font-bold",
  "font-extrabold",
  "font-black",
] as const

export function SansTypeScale() {
  const [weight, setWeight] = useState<(typeof weights)[number]>("font-normal")

  return (
    <div className="mt-10">
      <Tabs
        value={weight}
        onValueChange={(value) => setWeight(value as (typeof weights)[number])}
      >
        <div className="max-w-full overflow-x-auto pb-1">
          <TabsList aria-label="Sans font weight">
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
                font-sans
              </Badge>
              <Badge variant="secondary" className="font-normal">
                {weight}
              </Badge>
            </div>
            <p
              className={`font-sans leading-none whitespace-nowrap ${weight} ${size.className}`}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
