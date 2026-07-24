"use client"

import { type DragEvent, useRef, useState } from "react"
import Image from "next/image"
import {
  ApertureIcon,
  CheckIcon,
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
const characterProperties = [
  "Front",
  "Profile",
  "Three-quarter",
  "Full body",
  "Close-up",
  "Neutral",
  "Expression",
  "Outfit",
]

type Character = {
  id: number
  name: string
  images: number[]
  updated: string
}

const initialCharacters: Character[] = [
  {
    id: 3,
    name: "Mara",
    images: Array.from({ length: 18 }, (_, index) => index),
    updated: "Today, 1:48 PM",
  },
  {
    id: 2,
    name: "The Courier",
    images: Array.from({ length: 12 }, (_, index) => index),
    updated: "Yesterday",
  },
  {
    id: 1,
    name: "June",
    images: Array.from({ length: 8 }, (_, index) => index),
    updated: "Jul 21",
  },
]

export function CharactersWorkspace() {
  const [characters, setCharacters] = useState(initialCharacters)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [characterName, setCharacterName] = useState("")
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [selectedImage, setSelectedImage] = useState<{
    characterId: number
    imageId: number
  } | null>(null)
  const [imageProperties, setImageProperties] = useState<
    Record<string, string[]>
  >({})
  const uploadRef = useRef<HTMLInputElement>(null)

  function renameCharacter(id: number, name: string) {
    setCharacters((current) =>
      current.map((character) =>
        character.id === id ? { ...character, name } : character
      )
    )
  }

  function setFiles(files: FileList | null) {
    if (!files?.length) return
    setUploadFiles(
      Array.from(files).filter((file) => file.type.startsWith("image/"))
    )
  }

  function createCharacter() {
    const name = characterName.trim()
    if (!name || uploadFiles.length === 0) return
    setCharacters((current) => [
      {
        id: (current[0]?.id ?? 0) + 1,
        name,
        images: Array.from({ length: uploadFiles.length }, (_, index) => index),
        updated: "Just now",
      },
      ...current,
    ])
    setCharacterName("")
    setUploadFiles([])
    setIsCreateOpen(false)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    setFiles(event.dataTransfer.files)
  }

  function toggleProperty(property: string) {
    if (!selectedImage) return
    const key = `${selectedImage.characterId}-${selectedImage.imageId}`
    setImageProperties((current) => {
      const properties = current[key] ?? []
      return {
        ...current,
        [key]: properties.includes(property)
          ? properties.filter((item) => item !== property)
          : [...properties, property],
      }
    })
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden md:h-dvh">
      <section className="min-h-0 flex-1 overflow-y-auto overscroll-none">
        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <header className="flex items-center justify-between gap-4 py-4">
            <h1 className="text-xl font-medium">Characters</h1>
            <Button
              className="h-10 px-5"
              onClick={() => setIsCreateOpen(true)}
            >
              <PlusIcon className="size-6" />
              New character
            </Button>
          </header>

          {characters.map((character) => (
            <section key={character.id} className="py-6">
              <div className="mb-4 flex min-h-9 flex-wrap items-center gap-3">
                {editingId === character.id ? (
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <Input
                      value={character.name}
                      aria-label="Character name"
                      className="max-w-sm"
                      onChange={(event) =>
                        renameCharacter(character.id, event.target.value)
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
                      onClick={() => setEditingId(character.id)}
                    >
                      <h2 className="truncate text-sm font-medium">
                        {character.name}
                      </h2>
                      <PencilIcon className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {character.images.length} images · {character.updated}
                    </span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-9 md:grid-cols-12">
                {character.images.map((imageId) => (
                  <button
                    type="button"
                    key={imageId}
                    aria-label={`Open ${character.name} reference ${imageId + 1}`}
                    onClick={() =>
                      setSelectedImage({
                        characterId: character.id,
                        imageId,
                      })
                    }
                    className="group relative aspect-square overflow-hidden rounded-md bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Image
                      src={sampleImage}
                      alt=""
                      fill
                      className={cn(
                        "object-cover transition-transform group-hover:scale-105",
                        imageId % 4 === 1 && "hue-rotate-15",
                        imageId % 4 === 2 && "saturate-50",
                        imageId % 4 === 3 && "contrast-125"
                      )}
                    />
                  </button>
                ))}
                <label className="flex aspect-square items-center justify-center rounded-md border border-dashed text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <PlusIcon className="size-4" />
                  <span className="sr-only">
                    Add reference images to {character.name}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(event) => {
                      const count = event.target.files?.length ?? 0
                      setCharacters((current) =>
                        current.map((item) =>
                          item.id === character.id
                            ? {
                                ...item,
                                images: [
                                  ...item.images,
                                  ...Array.from(
                                    { length: count },
                                    (_, index) =>
                                      Math.max(-1, ...item.images) + 1 + index
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

      {characters.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <ApertureIcon className="size-5 text-muted-foreground" />
          <p className="text-sm font-medium">No characters yet</p>
        </div>
      )}

      <Dialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          setIsCreateOpen(open)
          if (!open) {
            setIsDragging(false)
            setCharacterName("")
            setUploadFiles([])
          }
        }}
      >
        <DialogContent className="gap-5 rounded-2xl sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>New character</DialogTitle>
            <DialogDescription>
              Name the character and add reference images.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label htmlFor="character-name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="character-name"
              value={characterName}
              onChange={(event) => setCharacterName(event.target.value)}
              placeholder="Character name"
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
                : "Drop character images here"}
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
            onClick={createCharacter}
            disabled={!characterName.trim() || uploadFiles.length === 0}
          >
            Create character
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedImage(null)
        }}
      >
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-4xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Character reference</DialogTitle>
            <DialogDescription>
              Review this reference and assign character properties.
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="grid min-h-0 overflow-y-auto md:grid-cols-[minmax(0,1fr)_300px]">
              <div className="flex min-h-80 items-center bg-background">
                <div className="relative aspect-square w-full max-h-[70dvh]">
                  <Image
                    src={sampleImage}
                    alt="Character reference"
                    fill
                    className={cn(
                      "object-cover",
                      selectedImage.imageId % 4 === 1 && "hue-rotate-15",
                      selectedImage.imageId % 4 === 2 && "saturate-50",
                      selectedImage.imageId % 4 === 3 && "contrast-125"
                    )}
                    priority
                  />
                </div>
              </div>
              <aside className="bg-background p-5 sm:p-6">
                <div className="pr-10">
                  <p className="text-sm font-medium">
                    {
                      characters.find(
                        (character) =>
                          character.id === selectedImage.characterId
                      )?.name
                    }
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Reference image {selectedImage.imageId + 1}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="mb-3 text-xs font-medium text-muted-foreground">
                    Properties
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {characterProperties.map((property) => {
                      const key = `${selectedImage.characterId}-${selectedImage.imageId}`
                      const isSelected = (
                        imageProperties[key] ?? []
                      ).includes(property)
                      return (
                        <Button
                          key={property}
                          type="button"
                          size="sm"
                          variant={isSelected ? "secondary" : "outline"}
                          aria-pressed={isSelected}
                          onClick={() => toggleProperty(property)}
                        >
                          {property}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
