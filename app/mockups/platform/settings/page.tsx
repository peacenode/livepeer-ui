import type { Metadata } from "next"
import { ArrowUpRightIcon, Building2Icon } from "lucide-react"

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
  title: "Project settings",
}

export default function MockupSettingsPage() {
  return (
    <PlatformPage
      title="Project settings"
      action={
        <Button variant="outline">
          <Building2Icon data-icon="inline-start" />
          <span className="hidden sm:inline">Organization settings</span>
          <ArrowUpRightIcon
            data-icon="inline-end"
            className="hidden sm:block"
          />
          <span className="sr-only sm:hidden">Organization settings</span>
        </Button>
      }
    >
      <Tabs defaultValue="general" className="gap-8">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto border-b px-0 pb-1"
        >
          <TabsTrigger value="general" className="flex-none">
            General
          </TabsTrigger>
          <TabsTrigger value="members" className="flex-none">
            Members
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex-none">
            Webhooks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <form className="flex max-w-xl flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="project-name">Project name</Label>
              <Input id="project-name" defaultValue="Default project" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="project-id">Project ID</Label>
              <Input
                id="project-id"
                defaultValue="proj_livepeer_default"
                readOnly
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Used to identify this project in API requests and usage data.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="compute-region">Default compute region</Label>
              <Select defaultValue="Automatic">
                <SelectTrigger id="compute-region" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Used when a request does not specify a compute region.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="project-api-keys" defaultChecked />
              <Label htmlFor="project-api-keys">Allow project API keys</Label>
            </div>
            <Button type="submit" className="self-start">
              Save
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="members">
          <p className="text-sm text-muted-foreground">
            Project members inherit access from the organization.
          </p>
        </TabsContent>
        <TabsContent value="webhooks">
          <p className="text-sm text-muted-foreground">
            No webhooks have been configured for this project.
          </p>
        </TabsContent>
      </Tabs>
    </PlatformPage>
  )
}
