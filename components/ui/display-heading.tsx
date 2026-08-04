import * as React from "react"

import { cn } from "@/lib/utils"

type DisplayHeadingProps = React.ComponentPropsWithoutRef<"h1"> & {
  as?: "h1" | "h2"
}

function DisplayHeading({
  as: Comp = "h1",
  className,
  ...props
}: DisplayHeadingProps) {
  return (
    <Comp
      className={cn(
        "font-display text-display-sm text-balance sm:text-display-fluid",
        className
      )}
      {...props}
    />
  )
}

export { DisplayHeading }
