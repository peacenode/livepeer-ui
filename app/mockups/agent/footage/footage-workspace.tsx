"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { FilmIcon, PlayIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sampleImage = "/generated/2026-07-23-1730/cobalt-runner.png"

type FootageItem = {
  id: number
  name: string
  duration: string
  uploaded: string
  imageClass?: string
}

const initialFootage: FootageItem[] = [
  {
    id: 3,
    name: "Studio orbit take 04.mp4",
    duration: "0:18",
    uploaded: "Today, 3:08 PM",
  },
  {
    id: 2,
    name: "Chrome detail macro.mov",
    duration: "0:12",
    uploaded: "Yesterday",
    imageClass: "contrast-125",
  },
  {
    id: 1,
    name: "Lighting sweep reference.mp4",
    duration: "0:24",
    uploaded: "Jul 21",
    imageClass: "hue-rotate-15",
  },
]

export function FootageWorkspace() {
  const [footage, setFootage] = useState(initialFootage)
  const uploadRef = useRef<HTMLInputElement>(null)

  function addFootage(files: FileList | null) {
    if (!files?.length) return
    const additions = Array.from(files)
      .filter((file) => file.type.startsWith("video/"))
      .map((file, index) => ({
        id: (footage[0]?.id ?? 0) + index + 1,
        name: file.name,
        duration: "0:00",
        uploaded: "Just now",
      }))
    setFootage((current) => [...additions.reverse(), ...current])
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden md:h-dvh">
      <section className="min-h-0 flex-1 overflow-y-auto overscroll-none">
        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <header className="flex items-center justify-between gap-4 py-4">
            <h1 className="text-xl font-medium">Footage</h1>
            <Button
              className="h-10 px-5"
              onClick={() => uploadRef.current?.click()}
            >
              <PlusIcon className="size-6" />
              Upload footage
            </Button>
            <input
              ref={uploadRef}
              type="file"
              accept="video/*"
              multiple
              className="sr-only"
              onChange={(event) => addFootage(event.target.files)}
            />
          </header>

          {footage.length > 0 ? (
            <div className="space-y-2 py-6">
              {footage.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-4 py-1 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-6"
                >
                  <button
                    type="button"
                    className="group relative aspect-video overflow-hidden rounded-xl bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Image
                      src={sampleImage}
                      alt=""
                      fill
                      className={cn(
                        "object-cover transition-transform group-hover:scale-105",
                        item.imageClass
                      )}
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20">
                      <span className="flex size-11 items-center justify-center rounded-full bg-background/90">
                        <PlayIcon className="ml-0.5 size-5 fill-current" />
                      </span>
                    </span>
                    <span className="absolute right-2 bottom-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] text-white">
                      {item.duration}
                    </span>
                  </button>
                  <div className="flex min-w-0 flex-col py-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="mt-2 text-xs text-muted-foreground lg:mt-auto">
                      {item.uploaded}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <FilmIcon className="size-5 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">No footage yet</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
