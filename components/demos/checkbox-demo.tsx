import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxDemo() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="newsletter" defaultChecked />
        <Label htmlFor="newsletter">Subscribe to the newsletter</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">Disabled option</Label>
      </div>
    </div>
  )
}
