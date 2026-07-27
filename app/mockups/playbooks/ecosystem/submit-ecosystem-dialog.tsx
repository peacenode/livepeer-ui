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

const githubTemplateUrl =
  "https://github.com/livepeer/website/new/main/content/ecosystem?filename=your-app.md"

const ecosystemTemplate = `---
name: Your App
url: https://your-app.com
description: What your app does, in one sentence.
categories:
  - AI Video
  - API
logo: your-app.svg
---`

const submissionSteps = [
  {
    title: "Add your app entry",
    description:
      "Create content/ecosystem/your-app.md and complete the required frontmatter.",
  },
  {
    title: "Add a logo",
    description:
      "Add a square SVG or PNG, at least 128 × 128, to public/ecosystem in the same branch.",
  },
  {
    title: "Open a pull request",
    description:
      "Include both files in one PR. The Livepeer team will review it before adding the app to the directory.",
  },
]

export function SubmitEcosystemDialog() {
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
        Submit app
        <ArrowUpRightIcon aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-8 overflow-x-hidden overflow-y-auto rounded-sm p-6 sm:max-w-2xl sm:p-8">
        <DialogHeader className="items-start gap-3 text-left">
          <DialogTitle className="pr-8 font-sans text-2xl font-medium tracking-tight sm:text-3xl">
            Add your app to the ecosystem
          </DialogTitle>
          <DialogDescription className="max-w-xl leading-relaxed">
            Add your project details and logo to the Livepeer website
            repository, then open a pull request for review.
          </DialogDescription>
        </DialogHeader>

        <ol className="grid gap-5">
          {submissionSteps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[1.5rem_1fr] gap-3"
            >
              <span className="font-mono text-xs leading-6 text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">
              content/ecosystem/your-app.md
            </p>
            <CopyButton
              value={ecosystemTemplate}
              className="size-8 rounded-sm"
            />
          </div>
          <pre className="max-w-full overflow-x-auto rounded-sm bg-muted p-4 font-mono text-xs leading-relaxed">
            <code>{ecosystemTemplate}</code>
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
            Close
          </DialogClose>
          <Button
            size="lg"
            nativeButton={false}
            render={
              <a
                href={githubTemplateUrl}
                target="_blank"
                rel="noreferrer"
              />
            }
            className="h-16 w-full rounded-sm border border-emerald-500 bg-emerald-500 px-5 text-white hover:bg-emerald-500 sm:w-auto"
            style={{
              backgroundImage:
                "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
            }}
          >
            Open GitHub template
            <ArrowUpRightIcon aria-hidden="true" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
