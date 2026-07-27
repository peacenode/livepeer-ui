import { PlaybookLibraryHeader } from "@/components/mockups/playbook-library-header"
import { livepeerOrgLibraryFixture } from "@/components/demos/fixtures/livepeer-org"

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
