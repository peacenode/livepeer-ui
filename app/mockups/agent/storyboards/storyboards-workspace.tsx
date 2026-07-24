"use client"

import { type DragEvent, useRef, useState } from "react"
import Image from "next/image"
import {
  CheckIcon,
  ImagesIcon,
  PencilIcon,
  PlusIcon,
  UploadIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const sampleImage = "/generated/2026-07-23-1730/cobalt-runner.png"

type ImageBatch = {
  id: number
  name: string
  count: number
  uploaded: string
}

const initialBatches: ImageBatch[] = [
  {
    id: 4,
    name: "Orbit launch film",
    count: 30,
    uploaded: "Today, 2:14 PM",
  },
  {
    id: 3,
    name: "Product reveal v2",
    count: 18,
    uploaded: "Today, 9:42 AM",
  },
  {
    id: 2,
    name: "Homepage loops",
    count: 12,
    uploaded: "Yesterday",
  },
  {
    id: 1,
    name: "Opening sequence",
    count: 8,
    uploaded: "Jul 21",
  },
]

export function StoryboardsWorkspace() {
  const [batches, setBatches] = useState(initialBatches)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const uploadRef = useRef<HTMLInputElement>(null)

  function renameBatch(id: number, name: string) {
    setBatches((current) =>
      current.map((batch) => (batch.id === id ? { ...batch, name } : batch))
    )
  }

  function setFiles(files: FileList | null) {
    if (!files?.length) return
    setUploadFiles(
      Array.from(files).filter((file) => file.type.startsWith("image/"))
    )
  }

  function createBatch() {
    const title = uploadTitle.trim()
    if (!title || uploadFiles.length === 0) return
    setBatches((current) => [
      {
        id: (current[0]?.id ?? 0) + 1,
        name: title,
        count: uploadFiles.length,
        uploaded: "Just now",
      },
      ...current,
    ])
    setUploadTitle("")
    setUploadFiles([])
    setIsUploadOpen(false)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    setFiles(event.dataTransfer.files)
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden md:h-dvh">
      <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-xl font-medium">Storyboards</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Image groups in upload order
          </p>
        </div>
        <Button size="sm" onClick={() => setIsUploadOpen(true)}>
          <UploadIcon />
          Upload images
        </Button>
      </header>

      <section className="min-h-0 flex-1 overflow-y-auto overscroll-none">
        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          {batches.map((batch) => (
            <section key={batch.id} className="border-t py-6 first:border-t-0">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {editingId === batch.id ? (
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <Input
                      value={batch.name}
                      aria-label="Storyboard name"
                      className="max-w-sm"
                      onChange={(event) =>
                        renameBatch(batch.id, event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") setEditingId(null)
                      }}
                      autoFocus
                    />
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Save name"
                      onClick={() => setEditingId(null)}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="group flex min-w-0 items-center gap-2"
                      onClick={() => setEditingId(batch.id)}
                    >
                      <h2 className="truncate text-sm font-medium">
                        {batch.name}
                      </h2>
                      <PencilIcon className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {batch.count} images · {batch.uploaded}
                    </span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-9 md:grid-cols-12">
                {Array.from({ length: batch.count }, (_, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-md bg-muted"
                  >
                    <Image
                      src={sampleImage}
                      alt=""
                      fill
                      className={cn(
                        "object-cover",
                        index % 4 === 1 && "hue-rotate-15",
                        index % 4 === 2 && "saturate-50",
                        index % 4 === 3 && "contrast-125"
                      )}
                    />
                  </div>
                ))}
                <label className="flex aspect-square items-center justify-center rounded-md border border-dashed text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <PlusIcon className="size-4" />
                  <span className="sr-only">Add images to {batch.name}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(event) => {
                      const count = event.target.files?.length ?? 0
                      setBatches((current) =>
                        current.map((item) =>
                          item.id === batch.id
                            ? { ...item, count: item.count + count }
                            : item
                        )
                      )
                    }}
                  />
                </label>
              </div>
            </section>
          ))}
        </div>
      </section>

      {batches.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <ImagesIcon className="size-5 text-muted-foreground" />
          <p className="text-sm font-medium">No image uploads yet</p>
        </div>
      )}

      <Dialog
        open={isUploadOpen}
        onOpenChange={(open) => {
          setIsUploadOpen(open)
          if (!open) {
            setIsDragging(false)
            setUploadTitle("")
            setUploadFiles([])
          }
        }}
      >
        <DialogContent className="gap-5 rounded-2xl sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Upload storyboard</DialogTitle>
            <DialogDescription>
              Name this image group and add its frames.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label htmlFor="storyboard-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="storyboard-title"
              value={uploadTitle}
              onChange={(event) => setUploadTitle(event.target.value)}
              placeholder="Storyboard title"
              autoFocus
            />
          </div>

          <div
            onDragEnter={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsDragging(false)
              }
            }}
            onDrop={handleDrop}
            className={cn(
              "flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 text-center transition-colors hover:bg-muted",
              isDragging && "bg-muted"
            )}
            onClick={() => uploadRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                uploadRef.current?.click()
              }
            }}
          >
            <UploadIcon className="size-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">
              {uploadFiles.length > 0
                ? `${uploadFiles.length} image${uploadFiles.length === 1 ? "" : "s"} selected`
                : "Drop storyboard images here"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              or click to choose files
            </p>
            <input
              ref={uploadRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => setFiles(event.target.files)}
            />
          </div>

          <Button
            onClick={createBatch}
            disabled={!uploadTitle.trim() || uploadFiles.length === 0}
          >
            Create storyboard
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  )
}
