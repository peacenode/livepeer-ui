import { Input } from "@/components/ui/input"

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Input type="email" placeholder="Email" />
      <Input type="text" placeholder="Error" aria-invalid />
      <Input type="text" placeholder="Disabled" disabled />
    </div>
  )
}
