"use client"

import { type FormEvent, useState } from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type ApiKeyActionsContent = {
  newKeyLabel: string
  dialogTitle: string
  dialogDescription: string
  keyNameLabel: string
  keyNamePlaceholder: string
  cancelLabel: string
  generateLabel: string
}

function ApiKeyActions({ content }: { content: ApiKeyActionsContent }) {
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)

  function generateKey(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim()) return
    setOpen(false)
    setName("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button size="lg" className="h-16 rounded-sm px-4" />}
      >
        {content.newKeyLabel}
      </DialogTrigger>
      <DialogContent className="gap-6 rounded-sm p-6 sm:max-w-lg sm:p-8">
        <DialogHeader className="gap-2">
          <DialogTitle className="font-sans text-2xl font-medium tracking-tight">
            {content.dialogTitle}
          </DialogTitle>
          <DialogDescription className="leading-relaxed">
            {content.dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={generateKey}>
          <div>
            <Label htmlFor="api-key-name">{content.keyNameLabel}</Label>
            <Input
              id="api-key-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={content.keyNamePlaceholder}
              autoComplete="off"
              autoFocus
              className="mt-3 h-12 rounded-sm"
            />
          </div>
          <DialogFooter className="mt-8">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="secondary"
                  className="h-16 w-full shrink-0 rounded-sm px-4 sm:flex-1"
                />
              }
            >
              {content.cancelLabel}
            </DialogClose>
            <Button
              type="submit"
              variant="secondary"
              disabled={!name.trim()}
              className="h-16 w-full shrink-0 rounded-sm border border-emerald-500 bg-emerald-500 px-4 text-white hover:bg-emerald-500 sm:flex-1"
              style={{
                backgroundImage:
                  "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
              }}
            >
              {content.generateLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { ApiKeyActions }
