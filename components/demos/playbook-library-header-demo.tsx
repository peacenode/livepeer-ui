import { PlaybookLibraryHeader } from "@/components/livepeer-ui/playbook-library-header"
import { livepeerOrgLibraryFixture } from "@/app/mockups/_data/livepeer-org"

export default function PlaybookLibraryHeaderDemo() {
  return (
    <div className="w-full px-4 py-16">
      <PlaybookLibraryHeader
        heading={livepeerOrgLibraryFixture.heading}
        description={livepeerOrgLibraryFixture.description}
      />
    </div>
  )
}
