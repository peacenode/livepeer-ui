"use client"

import { type ChangeEvent, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Brief = {
  yamlBlock: string
  fields: { name: string; defaultValue: string; hint: string }[]
  fenceStart: number
  fenceEnd: number
}

const abbreviations = new Set([
  "ai",
  "api",
  "css",
  "eu",
  "hex",
  "html",
  "id",
  "ig",
  "ip",
  "iso",
  "qr",
  "rsvp",
  "tts",
  "uk",
  "url",
  "us",
])

const fieldsWithoutDescriptions = new Set([
  "brand_name",
  "one_liner",
  "aesthetic",
  "aspect",
  "aspect_ratio",
])

const fieldLabels: Record<string, string> = {
  one_liner: "Brand tagline",
  aspect: "Aspect ratio",
  aspect_ratio: "Aspect ratio",
  packshot: "Product packshot",
  teaser: "5s motion teaser",
  music: "Licensed soundtrack",
  reel: "Reel",
  shots: "Shot list",
  train_brand_lora: "Train brand LoRA",
}

function labelFor(name: string) {
  if (fieldLabels[name]) return fieldLabels[name]

  return name
    .split("_")
    .map((part, index) => {
      const lower = part.toLowerCase()
      if (abbreviations.has(lower)) return lower.toUpperCase()
      return index === 0
        ? lower.charAt(0).toUpperCase() + lower.slice(1)
        : lower
    })
    .join(" ")
}

function AspectRatioSelect({
  id,
  labelId,
  value,
  options,
  onChange,
}: {
  id: string
  labelId: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <div
      id={id}
      className="mt-2 flex flex-wrap justify-start gap-6"
      role="radiogroup"
      aria-labelledby={labelId}
    >
      {options.map((option) => {
        const selected = value === option

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className="group flex w-fit flex-col items-center gap-2 rounded-sm py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex h-14 items-center justify-center">
              <span
                className={
                  selected
                    ? "block h-12 max-w-full rounded-sm border border-foreground bg-foreground"
                    : "block h-12 max-w-full rounded-sm border border-muted-foreground/60 transition-colors group-hover:border-foreground"
                }
                style={{ aspectRatio: option.replace(":", " / ") }}
                aria-hidden="true"
              />
            </span>
            <span
              className={
                selected
                  ? "text-xs font-medium tabular-nums"
                  : "text-xs font-medium text-muted-foreground tabular-nums"
              }
            >
              {option}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function PlaybookBriefForm({
  brief,
  markdown,
}: {
  brief: Brief | null
  markdown: string
}) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const fields = brief?.fields ?? []
  const booleanFields = fields.filter(
    (field) =>
      /^(true|false)$/i.test(field.defaultValue.trim()) &&
      field.name !== "train_brand_lora"
  )
  const trainBrandLoraField = fields.find(
    (field) => field.name === "train_brand_lora"
  )
  const hasFinishingPasses = fields.some((field) =>
    ["packshot", "teaser", "music", "reel"].includes(field.name)
  )
  const aspectFields = fields.filter((field) =>
    field.name.toLowerCase().includes("aspect")
  )
  const hasBrandCompositionLayout = [
    "brand_name",
    "one_liner",
    "shots",
    "aesthetic",
  ].every((name) => fields.some((field) => field.name === name))
  const orderedFields = fields.flatMap((field) => {
    if (/^(true|false)$/i.test(field.defaultValue.trim())) return []
    if (field.name === "finish" && hasFinishingPasses) return []
    if (field.name.toLowerCase().includes("aspect")) return []
    if (field.name.toLowerCase() === "aesthetic") {
      return [field, ...aspectFields]
    }
    return [field]
  })
  if (
    aspectFields.length > 0 &&
    !fields.some((field) => field.name.toLowerCase() === "aesthetic")
  ) {
    orderedFields.push(...aspectFields)
  }
  if (hasBrandCompositionLayout) {
    const compositionOrder = [
      "brand_name",
      "one_liner",
      "shots",
      "aesthetic",
      ...aspectFields.map((field) => field.name),
    ]
    orderedFields.sort((a, b) => {
      const aIndex = compositionOrder.indexOf(a.name)
      const bIndex = compositionOrder.indexOf(b.name)

      return (
        (aIndex === -1 ? compositionOrder.length : aIndex) -
        (bIndex === -1 ? compositionOrder.length : bIndex)
      )
    })
  }

  async function copyPlaybook() {
    let final = markdown

    if (brief) {
      let nextYaml = brief.yamlBlock
      Object.entries(values).forEach(([name, value]) => {
        if (!value.trim()) return
        if (name === "shots") {
          const shots = value
            .split(",")
            .map((shot) => shot.trim())
            .filter(Boolean)
          if (!shots.length) return
          nextYaml = nextYaml.replace(
            /^(\s*)shots:\s*[^\n]*(?:\n\1[ \t]+-[^\n]*)*/m,
            (_, indent) =>
              `${indent}shots:\n${shots
                .map((shot) => `${indent}  - ${JSON.stringify(shot)}`)
                .join("\n")}`
          )
          return
        }
        const expression = new RegExp(
          `^(\\s*)(${name}:\\s*)([^\\n#]*)(\\s*#?.*)$`,
          "m"
        )
        nextYaml = nextYaml.replace(
          expression,
          (_, indent, key, _old, comment) =>
            `${indent}${key}${value.trim()}${comment}`
        )
      })
      final =
        markdown.slice(0, brief.fenceStart) +
        "```yaml\n" +
        nextYaml +
        "\n```" +
        markdown.slice(brief.fenceEnd + 3)
    }

    await navigator.clipboard.writeText(final)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-medium">Customize this playbook</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Fill in the fields below. Your answers are inserted into the
            complete recipe when you copy it.
          </p>
        </div>
      </div>

      {brief && brief.fields.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {orderedFields.map((field) => {
            const long = (field.hint || field.defaultValue).length > 60
            const isAspectRatio = field.name.toLowerCase().includes("aspect")
            const isAesthetic = field.name.toLowerCase() === "aesthetic"
            const compositionClass =
              hasBrandCompositionLayout &&
              {
                brand_name: "order-1 sm:col-start-1 sm:row-start-1",
                one_liner: "order-2 sm:col-start-1 sm:row-start-2",
                shots: "order-4 sm:col-start-2 sm:row-start-1",
                aesthetic: "order-5 sm:col-start-2 sm:row-start-2",
              }[field.name]
            const aspectOptions = Array.from(
              new Set(
                `${field.defaultValue} ${field.hint}`.match(/\d+\s*:\s*\d+/g) ??
                  []
              )
            ).map((option) => option.replace(/\s/g, ""))
            const id = `brief-${field.name}`
            const labelId = `${id}-label`
            const shared = {
              id,
              name: field.name,
              value: values[field.name] ?? "",
              placeholder:
                field.name === "shots"
                  ? "hero portrait, full-length look, macro detail, lifestyle scene"
                  : field.defaultValue,
              onChange: (
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) =>
                setValues((current) => ({
                  ...current,
                  [field.name]: event.target.value,
                })),
            }

            return (
              <div
                key={field.name}
                className={cn(
                  long && !isAesthetic && !compositionClass && "sm:col-span-2",
                  compositionClass,
                  hasBrandCompositionLayout &&
                    isAspectRatio &&
                    "order-6 sm:col-start-2 sm:row-start-3"
                )}
              >
                <Label id={labelId} htmlFor={isAspectRatio ? undefined : id}>
                  {labelFor(field.name)}
                </Label>
                {field.hint && !fieldsWithoutDescriptions.has(field.name) && (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {field.hint}
                  </p>
                )}
                {isAspectRatio && aspectOptions.length > 0 ? (
                  <AspectRatioSelect
                    id={id}
                    labelId={labelId}
                    value={
                      values[field.name] ??
                      aspectOptions.find((option) =>
                        field.defaultValue.includes(option)
                      ) ??
                      aspectOptions[0]
                    }
                    options={aspectOptions}
                    onChange={(value) =>
                      setValues((current) => ({
                        ...current,
                        [field.name]: value,
                      }))
                    }
                  />
                ) : long ? (
                  <Textarea {...shared} className="mt-2 min-h-24 rounded-sm" />
                ) : (
                  <Input {...shared} className="mt-2 rounded-sm" />
                )}
                {hasBrandCompositionLayout &&
                  field.name === "one_liner" &&
                  trainBrandLoraField && (
                    <div className="mt-7 mb-2 flex items-start gap-2">
                      <Checkbox
                        id="brief-train_brand_lora"
                        className="rounded-sm"
                        checked={
                          (values[trainBrandLoraField.name] ??
                            trainBrandLoraField.defaultValue) === "true"
                        }
                        onCheckedChange={(checked) =>
                          setValues((current) => ({
                            ...current,
                            [trainBrandLoraField.name]: String(checked),
                          }))
                        }
                      />
                      <Label htmlFor="brief-train_brand_lora">
                        {labelFor(trainBrandLoraField.name)}
                      </Label>
                    </div>
                  )}
              </div>
            )
          })}
          {hasBrandCompositionLayout && booleanFields.length > 0 && (
            <div className="order-7 flex flex-col gap-3 sm:col-start-2 sm:row-start-4">
              {booleanFields.map((field) => {
                const id = `brief-${field.name}`
                const checked =
                  (values[field.name] ?? field.defaultValue).toLowerCase() ===
                  "true"

                return (
                  <div key={field.name} className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      className="rounded-sm"
                      checked={checked}
                      onCheckedChange={(nextChecked) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: String(nextChecked),
                        }))
                      }
                    />
                    <Label htmlFor={id}>{labelFor(field.name)}</Label>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          This playbook is ready to use without additional details.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {((booleanFields.length > 0 && !hasBrandCompositionLayout) ||
          (trainBrandLoraField && !hasBrandCompositionLayout)) && (
          <div className="grid gap-4 pt-1 sm:grid-cols-2">
            {trainBrandLoraField && !hasBrandCompositionLayout && (
              <div className="flex items-start gap-2">
                <Checkbox
                  id="brief-train_brand_lora"
                  className="rounded-sm"
                  checked={
                    (values[trainBrandLoraField.name] ??
                      trainBrandLoraField.defaultValue) === "true"
                  }
                  onCheckedChange={(checked) =>
                    setValues((current) => ({
                      ...current,
                      [trainBrandLoraField.name]: String(checked),
                    }))
                  }
                />
                <Label htmlFor="brief-train_brand_lora">
                  {labelFor(trainBrandLoraField.name)}
                </Label>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {booleanFields.map((field) => {
                const id = `brief-${field.name}`
                const checked =
                  (values[field.name] ?? field.defaultValue).toLowerCase() ===
                  "true"

                return (
                  <div key={field.name} className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      className="rounded-sm"
                      checked={checked}
                      onCheckedChange={(nextChecked) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: String(nextChecked),
                        }))
                      }
                    />
                    <Label htmlFor={id}>{labelFor(field.name)}</Label>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <Button
          type="button"
          size="lg"
          onClick={copyPlaybook}
          className="h-24 w-full rounded-sm"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied — paste into your agent" : "Copy playbook"}
        </Button>
      </div>
    </section>
  )
}
