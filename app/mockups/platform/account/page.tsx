import type { Metadata } from "next"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "Manage profile",
}

export default function MockupAccountPage() {
  return (
    <PlatformPage
      title="Manage profile"
      description="Update the profile information associated with your Livepeer account."
    >
      <form className="flex max-w-2xl flex-col gap-10">
        <section className="flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-medium">Profile details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep this information current so collaborators can identify you.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-foreground text-xl text-background">
                P
              </AvatarFallback>
            </Avatar>
            <div>
              <Button type="button" variant="outline" className="rounded-sm">
                Upload new
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Upload a square image, ideally 512×512.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-username">Username</Label>
              <Input
                id="profile-username"
                defaultValue="peace-node"
                className="rounded-sm"
              />
              <p className="text-xs text-muted-foreground">
                Letters, numbers, underscores, and hyphens only.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-display-name">Display name</Label>
              <Input
                id="profile-display-name"
                defaultValue="Peace Node"
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-role">Role</Label>
              <Input
                id="profile-role"
                placeholder="Developer, operator, creator…"
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-location">Location</Label>
              <Input
                id="profile-location"
                placeholder="City, Country"
                className="rounded-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              placeholder="Tell people about your work."
              className="min-h-28 rounded-sm"
            />
          </div>
        </section>

        <div className="flex justify-end gap-2">
          <Button type="reset" variant="secondary" className="rounded-sm">
            Reset
          </Button>
          <Button type="submit" className="rounded-sm">
            Save changes
          </Button>
        </div>
      </form>
    </PlatformPage>
  )
}
