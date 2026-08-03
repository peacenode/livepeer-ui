"use client"

import { type DragEvent, useRef, useState } from "react"
import Image from "next/image"
import { CheckIcon, CopyIcon, FileIcon, UploadIcon, XIcon } from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import { sanityStaticAssets } from "@/sanity/lib/static-assets"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type Field = {
  id: string
  label: string
  placeholder?: string
  type?: "input" | "textarea" | "dropzone"
}

type Option = {
  id: string
  label: string
  defaultChecked?: boolean
}

type Playbook = {
  id: string
  title: string
  description: string
  outcome: string
  image: string
  deliverables: string[]
  time: string
  budget: string
  reliability: string
  fields: Field[]
  options: Option[]
}

const playbooks: Playbook[] = [
  {
    id: "generate",
    title: "Generate video",
    description:
      "Turn a campaign prompt into a cinematic short film. Start quickly with a creative brief or add references for a more controlled, consistent result.",
    outcome: "Cinematic campaign short",
    image: sanityStaticAssets.playbooks.campaignVideo.generate,
    deliverables: [
      "Cinematic campaign short",
      "Final video in the selected aspect ratio",
      "Soundtrack and captions when selected",
    ],
    time: "2–8 minutes",
    budget: "$0.25–$4.00",
    reliability: "4.3 / 5",
    fields: [
      {
        id: "concept",
        label: "Creative prompt",
        type: "textarea",
        placeholder:
          "A single continuous shot that introduces Livepeer through a surreal broadcast signal…",
      },
      {
        id: "audience",
        label: "Audience",
        placeholder: "Creative developers and AI video makers",
      },
      {
        id: "style",
        label: "Visual direction",
        placeholder: "Cinematic, tactile, high contrast",
      },
      {
        id: "references",
        label: "Reference assets",
        type: "dropzone",
      },
    ],
    options: [
      {
        id: "brand-consistency",
        label: "Preserve brand consistency",
        defaultChecked: true,
      },
      { id: "soundtrack", label: "Generate soundtrack", defaultChecked: true },
      { id: "captions", label: "Add captions" },
    ],
  },
  {
    id: "edit",
    title: "Edit video",
    description:
      "Cut and stitch source footage, layer or replace audio, remove distractions, and composite a new background for a polished launch video.",
    outcome: "Edited launch video",
    image: sanityStaticAssets.playbooks.campaignVideo.edit,
    deliverables: [
      "Edited launch video",
      "Cleaned and mixed audio",
      "Composited background when selected",
    ],
    time: "3–12 minutes",
    budget: "$0.50–$6.00",
    reliability: "4.5 / 5",
    fields: [
      {
        id: "source-footage",
        label: "Source footage",
        placeholder: "Paste video URLs, separated by commas",
      },
      {
        id: "edit-brief",
        label: "Edit brief",
        type: "textarea",
        placeholder:
          "Open on the product demo, cut to the creator reaction, and end on the launch date…",
      },
      {
        id: "audio-direction",
        label: "Audio direction",
        placeholder: "Keep dialogue, replace room tone, add subtle score",
      },
      {
        id: "remove",
        label: "Remove or replace",
        placeholder: "Background clutter, pauses, watermark",
      },
    ],
    options: [
      { id: "auto-cut", label: "Remove pauses", defaultChecked: true },
      { id: "audio-cleanup", label: "Clean up dialogue", defaultChecked: true },
      { id: "green-screen", label: "Replace background" },
    ],
  },
  {
    id: "augment",
    title: "Augment video",
    description:
      "Add prompted overlays, filters, object detection, or interactive visual layers to footage you already have, then extend the video or supporting imagery.",
    outcome: "Augmented video experience",
    image: sanityStaticAssets.playbooks.campaignVideo.augment,
    deliverables: [
      "Augmented campaign video",
      "Tracked overlays and visual effects",
      "Alpha overlay export when selected",
    ],
    time: "3–10 minutes",
    budget: "$0.50–$5.00",
    reliability: "4.2 / 5",
    fields: [
      {
        id: "source-video",
        label: "Source video",
        placeholder: "Paste a video URL",
      },
      {
        id: "overlay-brief",
        label: "Overlay prompt",
        type: "textarea",
        placeholder:
          "Track the speaker and place a responsive signal field behind them; label detected objects…",
      },
      {
        id: "visual-treatment",
        label: "Visual treatment",
        placeholder: "Technical broadcast graphics, minimal typography",
      },
      {
        id: "interaction",
        label: "Interaction or detection",
        placeholder: "Object detection, tracked labels, viewer input",
      },
    ],
    options: [
      { id: "track-objects", label: "Track objects", defaultChecked: true },
      { id: "extend-video", label: "Extend video" },
      { id: "export-alpha", label: "Export overlay with alpha" },
    ],
  },
]

const aspectRatios = ["16:9", "9:16", "1:1", "4:5"]
const durations = ["5 seconds", "10 seconds", "15 seconds", "30 seconds"]

function PlaybookConfigurator({ playbook }: { playbook: Playbook }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [values, setValues] = useState<Record<string, string>>({
    aspectRatio: "16:9",
    duration: "15 seconds",
  })
  const [options, setOptions] = useState<Record<string, boolean>>(
    Object.fromEntries(
      playbook.options.map((option) => [
        option.id,
        Boolean(option.defaultChecked),
      ])
    )
  )
  const [referenceFiles, setReferenceFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [copied, setCopied] = useState(false)

  function updateReferenceFiles(files: File[]) {
    setReferenceFiles(files)
    setValues((current) => ({
      ...current,
      references: files.map((file) => file.name).join(", "),
    }))
  }

  function addReferenceFiles(files: FileList | File[]) {
    const incoming = Array.from(files)
    const existing = new Set(
      referenceFiles.map(
        (file) => `${file.name}-${file.size}-${file.lastModified}`
      )
    )
    updateReferenceFiles([
      ...referenceFiles,
      ...incoming.filter(
        (file) =>
          !existing.has(`${file.name}-${file.size}-${file.lastModified}`)
      ),
    ])
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    if (event.dataTransfer.files.length) {
      addReferenceFiles(event.dataTransfer.files)
    }
  }

  async function copyConfiguration() {
    const configuration = [
      `# ${playbook.title}`,
      `Outcome: ${playbook.outcome}`,
      ...playbook.fields.map(
        (field) =>
          `${field.label}: ${values[field.id]?.trim() || "Not provided"}`
      ),
      `Aspect ratio: ${values.aspectRatio}`,
      `Target duration: ${values.duration}`,
      `Processing: ${
        playbook.options
          .filter((option) => options[option.id])
          .map((option) => option.label)
          .join(", ") || "None"
      }`,
    ].join("\n")

    await navigator.clipboard.writeText(configuration)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  return (
    <AccordionItem
      value={playbook.id}
      className="overflow-hidden rounded-sm border bg-background px-0 data-open:bg-background"
    >
      <AccordionTrigger className="bg-muted px-4 py-3 text-left text-sm font-medium hover:bg-muted/80 hover:no-underline sm:px-5">
        {playbook.title}
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-6 sm:px-6 sm:pb-7">
        <div className="pt-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/marketing/agent-playbooks">
                  Playbooks
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage>{playbook.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-8 max-w-3xl">
            <h2 className="text-3xl leading-tight font-light tracking-tight text-balance sm:text-4xl">
              {playbook.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {playbook.description}
            </p>
          </div>

          <section className="mt-10 grid overflow-hidden rounded-sm bg-muted md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-48 overflow-hidden">
              <Image
                src={playbook.image}
                alt=""
                fill
                loading="eager"
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className="mb-5 text-base leading-snug font-medium">Output</p>
              <div className="space-y-4">
                {playbook.deliverables.map((deliverable) => (
                  <div key={deliverable} className="flex items-center gap-3">
                    <LivepeerSymbol
                      className="h-2 w-auto shrink-0 text-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-sm">{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "Time", value: playbook.time },
              { label: "Budget", value: playbook.budget },
              { label: "Reliability", value: playbook.reliability },
            ].map((item) => (
              <div key={item.label} className="min-w-0">
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="mt-2 text-sm font-medium tabular-nums sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <h3 className="font-heading text-2xl font-normal">
              Customize this playbook
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Fill in the brief below. Your answers are assembled into the
              complete prompt when you copy it.
            </p>
          </div>

          <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {playbook.fields.map((field) => (
              <div
                key={field.id}
                className={
                  field.type === "textarea" ? "sm:col-span-2" : undefined
                }
              >
                <Label htmlFor={`${playbook.id}-${field.id}`}>
                  {field.label}
                </Label>
                {field.type === "dropzone" ? (
                  <div className="mt-2">
                    <div
                      onDragEnter={(event) => {
                        event.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragOver={(event) => event.preventDefault()}
                      onDragLeave={(event) => {
                        if (
                          !event.currentTarget.contains(
                            event.relatedTarget as Node | null
                          )
                        ) {
                          setIsDragging(false)
                        }
                      }}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          fileInputRef.current?.click()
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={
                        isDragging
                          ? "flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-foreground bg-muted px-5 py-6 text-center"
                          : "flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed bg-muted/40 px-5 py-6 text-center transition-colors hover:bg-muted"
                      }
                    >
                      <UploadIcon
                        className="size-5 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <p className="mt-3 text-sm font-medium">
                        Drop files here or browse
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Images, video, audio, PDF, TXT, or Markdown
                      </p>
                      <input
                        ref={fileInputRef}
                        id={`${playbook.id}-${field.id}`}
                        type="file"
                        multiple
                        accept="image/*,video/*,audio/*,.pdf,.txt,.md"
                        className="sr-only"
                        onChange={(event) => {
                          if (event.target.files) {
                            addReferenceFiles(event.target.files)
                            event.target.value = ""
                          }
                        }}
                      />
                    </div>

                    {referenceFiles.length > 0 ? (
                      <AttachmentGroup className="mt-3">
                        {referenceFiles.map((file) => (
                          <Attachment
                            key={`${file.name}-${file.size}-${file.lastModified}`}
                            size="sm"
                            className="rounded-sm"
                          >
                            <AttachmentMedia className="rounded-sm">
                              <FileIcon aria-hidden="true" />
                            </AttachmentMedia>
                            <AttachmentContent className="max-w-40">
                              <AttachmentTitle>{file.name}</AttachmentTitle>
                              <AttachmentDescription>
                                {file.size < 1_000_000
                                  ? `${Math.max(1, Math.round(file.size / 1_000))} KB`
                                  : `${(file.size / 1_000_000).toFixed(1)} MB`}
                              </AttachmentDescription>
                            </AttachmentContent>
                            <AttachmentActions>
                              <AttachmentAction
                                aria-label={`Remove ${file.name}`}
                                onClick={() =>
                                  updateReferenceFiles(
                                    referenceFiles.filter(
                                      (candidate) => candidate !== file
                                    )
                                  )
                                }
                              >
                                <XIcon aria-hidden="true" />
                              </AttachmentAction>
                            </AttachmentActions>
                          </Attachment>
                        ))}
                      </AttachmentGroup>
                    ) : null}
                  </div>
                ) : field.type === "textarea" ? (
                  <Textarea
                    id={`${playbook.id}-${field.id}`}
                    value={values[field.id] ?? ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.id]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="mt-2 min-h-28 rounded-md"
                  />
                ) : (
                  <Input
                    id={`${playbook.id}-${field.id}`}
                    value={values[field.id] ?? ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.id]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="mt-2 rounded-md"
                  />
                )}
              </div>
            ))}

            <div>
              <Label htmlFor={`${playbook.id}-aspect-ratio`}>
                Aspect ratio
              </Label>
              <Select
                value={values.aspectRatio}
                onValueChange={(value) =>
                  setValues((current) => ({
                    ...current,
                    aspectRatio: value ?? "16:9",
                  }))
                }
              >
                <SelectTrigger
                  id={`${playbook.id}-aspect-ratio`}
                  className="mt-2 w-full rounded-md"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatios.map((ratio) => (
                    <SelectItem key={ratio} value={ratio}>
                      {ratio}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor={`${playbook.id}-duration`}>Target duration</Label>
              <Select
                value={values.duration}
                onValueChange={(value) =>
                  setValues((current) => ({
                    ...current,
                    duration: value ?? "15 seconds",
                  }))
                }
              >
                <SelectTrigger
                  id={`${playbook.id}-duration`}
                  className="mt-2 w-full rounded-md"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium">Processing</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {playbook.options.map((option) => {
                const id = `${playbook.id}-${option.id}`

                return (
                  <div key={option.id} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={options[option.id]}
                      onCheckedChange={(checked) =>
                        setOptions((current) => ({
                          ...current,
                          [option.id]: Boolean(checked),
                        }))
                      }
                    />
                    <Label htmlFor={id} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={copyConfiguration}
            className="mt-8 h-24 w-full rounded-sm"
          >
            {copied ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
            {copied ? "Copied — paste into your agent" : "Copy prompt"}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export function AgentPlaybookConfigurator() {
  return (
    <Accordion
      defaultValue={["generate"]}
      className="flex flex-col gap-3 overflow-visible rounded-none border-0"
    >
      {playbooks.map((playbook) => (
        <PlaybookConfigurator key={playbook.id} playbook={playbook} />
      ))}
    </Accordion>
  )
}
