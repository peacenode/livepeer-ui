import { SubmitEcosystemDialog } from "@/app/mockups/playbooks/ecosystem/submit-ecosystem-dialog"
import { livepeerOrgEcosystemFixture } from "@/app/mockups/_data/livepeer-org"

export default function SubmitEcosystemDialogDemo() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <SubmitEcosystemDialog
        label={livepeerOrgEcosystemFixture.submitLabel}
        content={livepeerOrgEcosystemFixture.submission}
      />
    </div>
  )
}
