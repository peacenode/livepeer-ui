"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { DownloadIcon, ImagePlusIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { formatCompact } from "@/lib/livepeer"

type ContainerPostCardProps = {
  creator: string
  description: string
  image: string
  preload?: boolean
  pullCount?: number
  slug: string
}

function ContainerPostCard({
  creator,
  description,
  image,
  preload = false,
  pullCount,
  slug,
}: ContainerPostCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState(image)

  useEffect(() => {
    return () => {
      if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  function assignImage(file?: File) {
    if (!file) return

    setImageSrc((current) => {
      if (current.startsWith("blob:")) URL.revokeObjectURL(current)
      return URL.createObjectURL(file)
    })
  }

  return (
    <Card className="h-full gap-0 bg-background py-0">
      <div className="flex items-center justify-between gap-3 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback className="bg-foreground text-background">
              {creator.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className="truncate text-sm font-medium">{creator}</p>
        </div>
        {pullCount !== undefined && (
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium tabular-nums">
            <DownloadIcon
              className="size-3.5 text-muted-foreground"
              aria-hidden="true"
            />
            {formatCompact(pullCount)}
            <span className="sr-only">pulls</span>
          </span>
        )}
      </div>

      <div className="group/media relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={`${slug} container thumbnail`}
          fill
          preload={preload && !imageSrc.startsWith("blob:")}
          unoptimized={imageSrc.startsWith("blob:")}
          className="object-cover transition-transform duration-300 group-hover/media:scale-[1.015]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <Link
          href={`/mockups/api-console/inference/${slug}`}
          className="absolute inset-0 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
        >
          <span className="sr-only">Open {slug}</span>
        </Link>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="absolute top-3 right-3 z-10 opacity-0 shadow-sm transition-opacity group-hover/media:opacity-100 focus-visible:opacity-100 max-sm:opacity-100"
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlusIcon />
          Change image
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={(event) => assignImage(event.target.files?.[0])}
        />
      </div>

      <CardContent className="px-0 pt-3 pb-5">
        <div className="flex flex-col gap-1.5">
          <Link
            href={`/mockups/api-console/inference/${slug}`}
            className="w-fit rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            <CardTitle className="text-base">{slug}</CardTitle>
          </Link>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}

export { ContainerPostCard }
