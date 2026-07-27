import type { Metadata } from "next"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  getAgentConsolePage,
  type AccountPageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = {
  title: "Manage profile",
}

export default async function MockupAccountPage() {
  const editorial = await getAgentConsolePage<AccountPageContent>("account")
  if (!editorial?.account) {
    throw new Error(
      "Required Sanity document agentConsolePage-account is missing or incomplete."
    )
  }
  const content = editorial.account

  return (
    <PlatformPage title={editorial.heading} description={editorial.description}>
      <form className="flex max-w-2xl flex-col gap-10">
        <section className="flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-medium">
              {content.profileDetailsTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {content.profileDetailsDescription}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-foreground text-xl text-background">
                P
              </AvatarFallback>
            </Avatar>
            <div>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-16 rounded-sm px-4"
              >
                {content.uploadLabel}
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                {content.uploadHelp}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-username">{content.usernameLabel}</Label>
              <Input
                id="profile-username"
                defaultValue="peace-node"
                className="rounded-sm"
              />
              <p className="text-xs text-muted-foreground">
                {content.usernameHelp}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-display-name">
                {content.displayNameLabel}
              </Label>
              <Input
                id="profile-display-name"
                defaultValue="Peace Node"
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-role">{content.roleLabel}</Label>
              <Input
                id="profile-role"
                placeholder={content.rolePlaceholder}
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-location">{content.locationLabel}</Label>
              <Input
                id="profile-location"
                placeholder={content.locationPlaceholder}
                className="rounded-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="profile-bio">{content.bioLabel}</Label>
            <Textarea
              id="profile-bio"
              placeholder={content.bioPlaceholder}
              className="min-h-28 rounded-sm"
            />
          </div>
        </section>

        <div className="flex justify-end gap-2">
          <Button
            type="reset"
            variant="secondary"
            size="lg"
            className="h-16 rounded-sm px-4"
          >
            {content.resetLabel}
          </Button>
          <Button type="submit" size="lg" className="h-16 rounded-sm px-4">
            {content.saveLabel}
          </Button>
        </div>
      </form>
    </PlatformPage>
  )
}
