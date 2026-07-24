import { cn } from "@/lib/utils"

export function imageRowRadius(index: number, isLast = false) {
  return cn(
    "rounded-none",
    index % 6 === 0 && "rounded-l-md sm:rounded-none",
    index % 6 === 5 && "rounded-r-md sm:rounded-none",
    index % 9 === 0 && "sm:rounded-l-md md:rounded-none",
    index % 9 === 8 && "sm:rounded-r-md md:rounded-none",
    index % 12 === 0 && "md:rounded-l-md",
    index % 12 === 11 && "md:rounded-r-md",
    isLast && "rounded-r-md sm:rounded-r-md md:rounded-r-md"
  )
}
