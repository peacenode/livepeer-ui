"use client"
import { useRef } from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
export function ClipsHeader({
  title,
  actionLabel,
  onUpload,
}: {
  title: string
  actionLabel: string
  onUpload: (files: FileList | null) => void
}) {
  const uploadRef = useRef<HTMLInputElement>(null)
  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <h1 className="text-xl font-medium">{title}</h1>
      <Button className="h-10 px-5" onClick={() => uploadRef.current?.click()}>
        <PlusIcon className="size-6" />
        {actionLabel}
      </Button>
      <input
        ref={uploadRef}
        type="file"
        accept="video/*"
        multiple
        className="sr-only"
        onChange={(event) => onUpload(event.target.files)}
      />
    </header>
  )
}
