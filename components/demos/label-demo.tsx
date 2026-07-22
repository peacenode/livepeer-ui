import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="flex items-center gap-3">
        <Checkbox id="label-terms" />
        <Label htmlFor="label-terms">Accept terms and conditions</Label>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="label-username">Username</Label>
        <Input id="label-username" placeholder="Username" />
      </div>
    </div>
  )
}
