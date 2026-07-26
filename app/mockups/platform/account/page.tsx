import type { Metadata } from "next"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Account settings",
}

export default function MockupAccountPage() {
  return (
    <PlatformPage title="Account settings">
      <Tabs defaultValue="profile" className="gap-8">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto border-b px-0 pb-1"
        >
          <TabsTrigger value="profile" className="flex-none">
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-none">
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex-none">
            Preferences
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <form className="flex max-w-xl flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="account-name">Name</Label>
              <Input id="account-name" defaultValue="Username" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="account-email">Email</Label>
              <Input
                id="account-email"
                type="email"
                defaultValue="username@example.com"
              />
              <p className="text-xs text-muted-foreground">
                Used for sign-in, security alerts, and account recovery.
              </p>
            </div>
            <Button
              type="submit"
              className="h-10 self-start rounded-sm px-4"
            >
              Save
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="security">
          <div className="flex max-w-xl flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Password</span>
                <span className="text-xs text-muted-foreground">
                  Last changed 3 months ago
                </span>
              </div>
              <Button
                variant="outline"
                className="h-10 rounded-sm px-4"
              >
                Change password
              </Button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="account-mfa">Two-factor authentication</Label>
                <span className="text-xs text-muted-foreground">
                  Require a verification code when signing in.
                </span>
              </div>
              <Switch id="account-mfa" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preferences">
          <div className="flex max-w-xl flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="account-timezone">Time zone</Label>
              <Select defaultValue="Eastern Time">
                <SelectTrigger id="account-timezone" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eastern Time">Eastern Time</SelectItem>
                  <SelectItem value="Central Time">Central Time</SelectItem>
                  <SelectItem value="Pacific Time">Pacific Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="account-emails">Product emails</Label>
                <span className="text-xs text-muted-foreground">
                  Receive product updates and platform announcements.
                </span>
              </div>
              <Switch id="account-emails" defaultChecked />
            </div>
            <Button
              className="h-10 self-start rounded-sm px-4"
            >
              Save
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </PlatformPage>
  )
}
