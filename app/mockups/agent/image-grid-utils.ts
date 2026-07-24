import { cn } from "@/lib/utils"

export function imageGroupRadius(index: number, total: number) {
  const topRight6 = Math.min(total, 6) - 1
  const topRight9 = Math.min(total, 9) - 1
  const topRight12 = Math.min(total, 12) - 1
  const bottomLeft6 = Math.floor((total - 1) / 6) * 6
  const bottomLeft9 = Math.floor((total - 1) / 9) * 9
  const bottomLeft12 = Math.floor((total - 1) / 12) * 12

  return cn(
    "rounded-none",
    index === 0 && "rounded-tl-md",
    index === topRight6 && "rounded-tr-md sm:rounded-tr-none",
    index === topRight9 && "sm:rounded-tr-md md:rounded-tr-none",
    index === topRight12 && "md:rounded-tr-md",
    index === bottomLeft6 && "rounded-bl-md sm:rounded-bl-none",
    index === bottomLeft9 && "sm:rounded-bl-md md:rounded-bl-none",
    index === bottomLeft12 && "md:rounded-bl-md",
    index === total - 1 && "rounded-br-md"
  )
}
