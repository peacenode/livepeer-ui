import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <p className="text-sm text-muted-foreground">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command menu
      </p>
    </div>
  )
}
