"use client"

import { ArrowUpRightIcon } from "lucide-react"

import { CopyButton } from "@/components/copy-button"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type SubmissionContent = {
  heading: string
  description: string
  steps: { _key: string; heading: string; description: string }[]
  templatePath: string
  template: string
  closeLabel: string
  githubCta: { label: string; href: string }
}
export function SubmitEcosystemDialog({
  label,
  content,
}: {
  label: string
  content: SubmissionContent
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            size="lg"
            variant="outline"
            className="h-16 rounded-sm px-5"
          />
        }
      >
        {label}
        <ArrowUpRightIcon aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-8 overflow-x-hidden overflow-y-auto rounded-sm p-6 sm:max-w-2xl sm:p-8">
        <DialogHeader className="items-start gap-3 text-left">
          <DialogTitle className="pr-8 font-sans text-2xl font-medium tracking-tight sm:text-3xl">
            {content.heading}
          </DialogTitle>
          <DialogDescription className="max-w-xl leading-relaxed">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <ol className="grid gap-5">
          {content.steps.map((step, index) => (
            <li key={step._key} className="grid grid-cols-[1.5rem_1fr] gap-3">
              <span className="font-mono text-xs leading-6 text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-medium">{step.heading}</h3>
                <p className="mt-1 text-sm leading-relaxed break-words text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">
              {content.templatePath}
            </p>
            <CopyButton
              value={content.template}
              className="size-8 rounded-sm"
            />
          </div>
          <pre className="max-w-full overflow-x-auto rounded-sm bg-muted p-4 font-mono text-xs leading-relaxed">
            <code>{content.template}</code>
          </pre>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="secondary"
                className="h-16 w-full rounded-sm px-4 sm:w-auto"
              />
            }
          >
            {content.closeLabel}
          </DialogClose>
          <Button
            size="lg"
            nativeButton={false}
            render={
              <a
                href={content.githubCta.href}
                target="_blank"
                rel="noreferrer"
              />
            }
            className="h-16 w-full rounded-sm px-5 sm:w-auto"
          >
            {content.githubCta.label}
            <ArrowUpRightIcon aria-hidden="true" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
