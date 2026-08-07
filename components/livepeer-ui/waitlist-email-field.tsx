import type { ChangeEventHandler } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WaitlistEmailField({
  id,
  placeholder,
  submitAriaLabel,
  value,
  onChange,
}: {
  id: string
  placeholder: string
  submitAriaLabel: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <div className="mt-3 flex h-16 gap-1 rounded-sm border border-white/25 bg-transparent p-1 text-white">
      <Input
        id={id}
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        autoComplete="email"
        className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-base text-white shadow-none placeholder:text-white/45 focus-visible:ring-0"
      />
      <Button
        type="submit"
        size="icon-lg"
        aria-label={submitAriaLabel}
        className="h-full w-14 rounded-[3px]"
      >
        <ArrowRight aria-hidden="true" />
      </Button>
    </div>
  )
}
