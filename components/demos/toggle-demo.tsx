import { BoldIcon, ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Toggle bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="Toggle text">Toggle</Toggle>
    </div>
  )
}
