"use client"

import type { ComponentProps, ReactNode } from "react"
import {
  ArrowDownToLineIcon,
  CopyIcon,
  ExternalLinkIcon,
  RotateCwIcon,
  Trash2Icon,
} from "lucide-react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"

type MediaContextMenuProps = {
  children: ReactNode
  className?: string
  triggerProps?: Omit<ComponentProps<"div">, "children" | "className">
  onOpen?: () => void
  openLabel?: string
  onDownload?: () => void
  onDuplicate?: () => void
  duplicateLabel?: string
  onRemove?: () => void
  removeLabel?: string
}

export function MediaContextMenu({
  children,
  className,
  triggerProps,
  onOpen,
  openLabel = "Open",
  onDownload,
  onDuplicate,
  duplicateLabel = "Duplicate",
  onRemove,
  removeLabel = "Remove",
}: MediaContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        className={cn("min-w-0", className)}
        {...triggerProps}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        {onOpen && (
          <ContextMenuItem onClick={onOpen}>
            <ExternalLinkIcon />
            {openLabel}
          </ContextMenuItem>
        )}
        {onDownload && (
          <ContextMenuItem onClick={onDownload}>
            <ArrowDownToLineIcon />
            Download
          </ContextMenuItem>
        )}
        {onDuplicate && (
          <ContextMenuItem onClick={onDuplicate}>
            {duplicateLabel.toLowerCase().includes("reroll") ? (
              <RotateCwIcon />
            ) : (
              <CopyIcon />
            )}
            {duplicateLabel}
          </ContextMenuItem>
        )}
        {onRemove && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive" onClick={onRemove}>
              <Trash2Icon />
              {removeLabel}
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function downloadMedia(url: string, filename: string) {
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
}
