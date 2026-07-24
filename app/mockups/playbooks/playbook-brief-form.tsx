"use client"

import { type ChangeEvent, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

function labelFor(name: string) {
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

export function PlaybookBriefForm({
  brief,
  markdown,
}: {
  brief: Brief | null
  markdown: string
}) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  async function copyPlaybook() {
    let final = markdown

    if (brief) {
      let nextYaml = brief.yamlBlock
      Object.entries(values).forEach(([name, value]) => {
        if (!value.trim()) return
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
    <section className="rounded-4xl bg-muted p-5 sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-medium">Set up this playbook</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Add your details, copy the complete recipe, and paste it into your
            agent.
          </p>
        </div>
      </div>

      {brief && brief.fields.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {brief.fields.map((field) => {
            const long = (field.hint || field.defaultValue).length > 60
            const id = `brief-${field.name}`
            const shared = {
              id,
              name: field.name,
              value: values[field.name] ?? "",
              placeholder: field.defaultValue || field.hint,
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
                className={long ? "sm:col-span-2" : undefined}
              >
                <Label htmlFor={id}>{labelFor(field.name)}</Label>
                {field.hint && (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {field.hint}
                  </p>
                )}
                {long ? (
                  <Textarea {...shared} className="mt-2 min-h-24" />
                ) : (
                  <Input {...shared} className="mt-2 bg-background" />
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          This playbook is ready to use without additional details.
        </p>
      )}

      <Button type="button" onClick={copyPlaybook} className="mt-6">
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "Copied — paste into your agent" : "Copy playbook"}
      </Button>
    </section>
  )
}
