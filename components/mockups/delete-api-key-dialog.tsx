"use client"

import { useState } from "react"
import { Trash2Icon, TriangleAlertIcon, XIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type DeleteApiKeyDialogProps = {
  createdAt: string
  name: string
}

function DeleteApiKeyDialog({
  createdAt,
  name,
}: DeleteApiKeyDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-red-500"
            aria-label={`Delete ${name} API key`}
          />
        }
      >
        <Trash2Icon aria-hidden="true" />
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-6 rounded-sm p-6 sm:max-w-lg sm:p-8">
        <AlertDialogHeader className="flex flex-col items-start text-left!">
          <AlertDialogTitle className="w-full text-left font-sans text-2xl font-medium tracking-tight">
            Delete API key
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Permanently delete the {name} API key.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4 bg-secondary"
        >
          <XIcon aria-hidden="true" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>

        <Alert variant="destructive" className="rounded-sm">
          <TriangleAlertIcon aria-hidden="true" />
          <AlertTitle>Are you sure you want to delete this API key?</AlertTitle>
          <AlertDescription className="text-muted-foreground!">
            This action is permanent and cannot be reversed. Any applications
            using this key will immediately lose access to the API.
          </AlertDescription>
        </Alert>

        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-6">
            <dt className="text-muted-foreground">Key name</dt>
            <dd className="text-right font-medium">{name}</dd>
          </div>
          <div className="flex items-center justify-between gap-6">
            <dt className="text-muted-foreground">Created at</dt>
            <dd className="text-right">{createdAt}</dd>
          </div>
        </dl>

        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel
            variant="ghost"
            className="h-16 w-full shrink-0 rounded-sm px-4 sm:flex-1"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="h-16 w-full shrink-0 rounded-sm bg-red-500 px-4 text-white hover:bg-red-600 sm:flex-1"
            onClick={() => setOpen(false)}
          >
            Delete key
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteApiKeyDialog }
