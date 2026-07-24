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
import { imageGroupRadius } from "../image-grid-utils"
import { ProjectPicker } from "../project-picker"

const sampleImage = "/generated/2026-07-23-1730/cobalt-runner.png"

type ImageBatch = {
  id: number
  name: string
  images: number[]
  uploaded: string
  project: string
}

const initialBatches: ImageBatch[] = [
  {
    id: 4,
    name: "Orbit launch film",
    images: Array.from({ length: 30 }, (_, index) => index),
    uploaded: "Today, 2:14 PM",
    project: "Default project",
  },
  {
    id: 3,
    name: "Product reveal v2",
    images: Array.from({ length: 18 }, (_, index) => index),
    uploaded: "Today, 9:42 AM",
    project: "Default project",
  },
  {
    id: 2,
    name: "Homepage loops",
    images: Array.from({ length: 12 }, (_, index) => index),
    uploaded: "Yesterday",
    project: "Default project",
  },
  {
    id: 1,
    name: "Opening sequence",
    images: Array.from({ length: 8 }, (_, index) => index),
    uploaded: "Jul 21",
    project: "Default project",
  },
]

export function StoryboardsWorkspace() {
  const [batches, setBatches] = useState(initialBatches)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [draggedImage, setDraggedImage] = useState<{
    batchId: number
    imageId: number
  } | null>(null)
  const [dropTarget, setDropTarget] = useState<{
    batchId: number
    imageId: number
    position: "before" | "after"
  } | null>(null)
  const [projects, setProjects] = useState([
    "Default project",
    "Orbit",
    "Soft launch",
  ])
  const [projectTargetId, setProjectTargetId] = useState<number | null>(null)
  const [newProjectName, setNewProjectName] = useState("")
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
        images: Array.from({ length: uploadFiles.length }, (_, index) => index),
        uploaded: "Just now",
        project: "Default project",
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

  function moveImage(batchId: number, fromIndex: number, toIndex: number) {
    setBatches((current) =>
      current.map((batch) => {
        if (batch.id !== batchId || fromIndex === toIndex) return batch
        const images = [...batch.images]
        const [image] = images.splice(fromIndex, 1)
        images.splice(toIndex, 0, image)
        return { ...batch, images }
      })
    )
  }

  function dropImage(
    batchId: number,
    targetImageId: number,
    position: "before" | "after"
  ) {
    if (!draggedImage || draggedImage.batchId !== batchId) return
    const batch = batches.find((item) => item.id === batchId)
    if (!batch) return
    const fromIndex = batch.images.indexOf(draggedImage.imageId)
    const targetIndex = batch.images.indexOf(targetImageId)
    let insertIndex = targetIndex + (position === "after" ? 1 : 0)
    if (fromIndex < insertIndex) insertIndex -= 1
    moveImage(batchId, fromIndex, insertIndex)
    setDraggedImage(null)
    setDropTarget(null)
  }

  function updateDropTarget(
    event: DragEvent<HTMLDivElement>,
    batchId: number,
    imageId: number
  ) {
    event.preventDefault()
    const bounds = event.currentTarget.getBoundingClientRect()
    setDropTarget({
      batchId,
      imageId,
      position:
        event.clientX < bounds.left + bounds.width / 2 ? "before" : "after",
    })
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden md:h-dvh">
      <section className="min-h-0 flex-1 overflow-y-auto overscroll-none">
        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <header className="flex items-center justify-between gap-4 py-4">
            <h1 className="text-xl font-medium">Storyboards</h1>
            <Button
              className="h-10 px-5"
              onClick={() => setIsUploadOpen(true)}
            >
              <PlusIcon className="size-6" />
              New storyboard
            </Button>
          </header>

          {batches.map((batch) => (
            <section key={batch.id} className="py-6">
              <div className="mb-4 flex min-h-9 items-center justify-between gap-3">
                <div className="flex min-w-0 flex-wrap items-center gap-3">
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
                      {batch.images.length} images · {batch.uploaded}
                    </span>
                  </>
                )}
                </div>
                <ProjectPicker
                  value={batch.project}
                  projects={projects}
                  onChange={(project) =>
                    setBatches((current) =>
                      current.map((item) =>
                        item.id === batch.id ? { ...item, project } : item
                      )
                    )
                  }
                  onNew={() => setProjectTargetId(batch.id)}
                />
              </div>

              <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-9 md:grid-cols-12">
                {batch.images.map((imageId, index) => (
                  <div
                    key={imageId}
                    draggable
                    onDragStart={() =>
                      setDraggedImage({ batchId: batch.id, imageId })
                    }
                    onDragEnd={() => {
                      setDraggedImage(null)
                      setDropTarget(null)
                    }}
                    onDragOver={(event) =>
                      updateDropTarget(event, batch.id, imageId)
                    }
                    onDrop={(event) => {
                      event.preventDefault()
                      dropImage(
                        batch.id,
                        imageId,
                        dropTarget?.position ?? "before"
                      )
                    }}
                    className={cn(
                      "relative aspect-square cursor-grab active:cursor-grabbing",
                      imageGroupRadius(index, batch.images.length)
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 overflow-hidden rounded-[inherit] bg-muted",
                        draggedImage?.batchId === batch.id &&
                          draggedImage.imageId === imageId &&
                          "opacity-40"
                      )}
                    >
                      <Image
                        src={sampleImage}
                        alt=""
                        fill
                        className={cn(
                          "object-cover",
                          imageId % 4 === 1 && "hue-rotate-15",
                          imageId % 4 === 2 && "saturate-50",
                          imageId % 4 === 3 && "contrast-125"
                        )}
                      />
                    </div>
                    {dropTarget?.batchId === batch.id &&
                      dropTarget.imageId === imageId &&
                      draggedImage?.imageId !== imageId && (
                        <span
                          className={cn(
                            "pointer-events-none absolute inset-y-0 z-20 w-0.5 rounded-full bg-foreground",
                            dropTarget.position === "before"
                              ? "-left-1"
                              : "-right-1"
                          )}
                        />
                      )}
                  </div>
                ))}
                <label
                  className={cn(
                    "flex aspect-square items-center justify-center border border-dashed text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    "rounded-md"
                  )}
                >
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
                            ? {
                                ...item,
                                images: [
                                  ...item.images,
                                  ...Array.from(
                                    { length: count },
                                    (_, index) =>
                                      (Math.max(-1, ...item.images) + 1 + index)
                                  ),
                                ],
                              }
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

      <Dialog
        open={projectTargetId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setProjectTargetId(null)
            setNewProjectName("")
          }
        }}
      >
        <DialogContent className="gap-5 rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>
              Create and assign a project to this storyboard.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newProjectName}
            onChange={(event) => setNewProjectName(event.target.value)}
            placeholder="Project name"
            aria-label="Project name"
            autoFocus
          />
          <Button
            disabled={!newProjectName.trim()}
            onClick={() => {
              const project = newProjectName.trim()
              if (!project || projectTargetId === null) return
              setProjects((current) =>
                current.includes(project) ? current : [...current, project]
              )
              setBatches((current) =>
                current.map((item) =>
                  item.id === projectTargetId ? { ...item, project } : item
                )
              )
              setProjectTargetId(null)
              setNewProjectName("")
            }}
          >
            Create project
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  )
}
