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
        "font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-[clamp(2.5rem,4.5vw,4rem)]",
        className
      )}
      {...props}
    />
  )
}

export { DisplayHeading }
