import { LivepeerAgentOnboardingSection } from "@/components/livepeer-ui/livepeer-agent-onboarding-section"

export default function LivepeerAgentOnboardingSectionDemo() {
  return (
    <div className="w-full">
      <LivepeerAgentOnboardingSection
        title="Get started with Livepeer Agent"
        steps={[
          {
            label: "Install Livepeer Agent",
            href: "/mockups/livepeer-org/agent",
          },
          {
            label: "Add credits",
            href: "/mockups/livepeer-agent/billing",
          },
        ]}
      />
    </div>
  )
}
