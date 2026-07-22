import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner />
      <Button disabled>
        <Spinner />
        Loading...
      </Button>
    </div>
  )
}
