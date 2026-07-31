"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type SlideAlignment = "left" | "center" | "right"
type SlideField =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "hero"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight"

const initialContent: Record<SlideField, string> = {
  topLeft: "LIVEPEER",
  topCenter: "PRESENTATION",
  topRight: "JULY 2026",
  hero: "A clear statement goes here.",
  bottomLeft: "LIVEPEER.ORG",
  bottomCenter: "FOUNDATIONS",
  bottomRight: "01",
}

const fields: {
  id: SlideField
  label: string
}[] = [
  { id: "topLeft", label: "Top left" },
  { id: "topCenter", label: "Top center" },
  { id: "topRight", label: "Top right" },
  { id: "hero", label: "Hero text" },
  { id: "bottomLeft", label: "Bottom left" },
  { id: "bottomCenter", label: "Bottom center" },
  { id: "bottomRight", label: "Bottom right" },
]

const alignments: SlideAlignment[] = ["left", "center", "right"]

function isSlideAlignment(value: string): value is SlideAlignment {
  return alignments.some((alignment) => alignment === value)
}

function SlideEdgeRow({
  left,
  center,
  right,
  className,
}: {
  left: string
  center: string
  right: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "absolute inset-x-[5%] grid grid-cols-3 gap-3 font-mono text-[clamp(0.4rem,1.15vw,0.75rem)] leading-none tracking-wide uppercase",
        className
      )}
    >
      <span className="truncate text-left">{left}</span>
      <span className="truncate text-center">{center}</span>
      <span className="truncate text-right">{right}</span>
    </div>
  )
}

function SlidePreview({
  content,
  alignment,
}: {
  content: Record<SlideField, string>
  alignment: SlideAlignment
}) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 text-white shadow-sm">
      <SlideEdgeRow
        left={content.topLeft}
        center={content.topCenter}
        right={content.topRight}
        className="top-[7%]"
      />

      <div
        className={cn(
          "absolute inset-x-[5%] inset-y-[18%] flex items-center",
          alignment === "left" && "justify-start",
          alignment === "center" && "justify-center",
          alignment === "right" && "justify-end"
        )}
      >
        <p
          className={cn(
            "max-w-[88%] font-display text-[clamp(1.5rem,5.75vw,4.75rem)] leading-[0.92] font-light tracking-[-0.055em] text-balance",
            alignment === "left" && "text-left",
            alignment === "center" && "text-center",
            alignment === "right" && "text-right"
          )}
        >
          {content.hero}
        </p>
      </div>

      <SlideEdgeRow
        left={content.bottomLeft}
        center={content.bottomCenter}
        right={content.bottomRight}
        className="bottom-[7%]"
      />
    </div>
  )
}

export function SlideComposer() {
  const [content, setContent] =
    React.useState<Record<SlideField, string>>(initialContent)
  const [alignment, setAlignment] =
    React.useState<SlideAlignment>("left")

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(16rem,18rem)_minmax(0,1fr)] lg:items-start">
      <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend className="mb-4 text-sm font-medium">Slide content</legend>
          <div className="grid gap-3">
            {fields.map((field) => (
              <div key={field.id} className="grid gap-2">
                <Label htmlFor={`slide-${field.id}`}>{field.label}</Label>
                <Input
                  id={`slide-${field.id}`}
                  value={content[field.id]}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      [field.id]: event.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Hero alignment</legend>
          <ToggleGroup
            value={[alignment]}
            onValueChange={(value) => {
              const nextAlignment = value[0]
              if (nextAlignment && isSlideAlignment(nextAlignment)) {
                setAlignment(nextAlignment)
              }
            }}
            variant="outline"
            spacing={0}
            aria-label="Hero alignment"
            className="w-full"
          >
            {alignments.map((value) => (
              <ToggleGroupItem
                key={value}
                value={value}
                aria-label={`Align hero ${value}`}
                className="flex-1 capitalize"
              >
                {value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </fieldset>
      </form>

      <div className="min-w-0">
        <SlidePreview content={content} alignment={alignment} />
        <p className="mt-3 text-sm text-muted-foreground">
          16:9 layout with fixed top and bottom rails and one flexible hero
          statement.
        </p>
      </div>
    </div>
  )
}
