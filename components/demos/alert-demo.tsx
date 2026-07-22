import { CheckCircle2Icon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your changes have been saved.</AlertTitle>
        <AlertDescription>
          This is an alert with an icon, title and description.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          Please verify your billing information and try again.
        </AlertDescription>
      </Alert>
    </div>
  )
}
