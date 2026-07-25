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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Project settings",
}

export default function MockupSettingsPage() {
  return (
    <PlatformPage title="Project settings">
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
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Add organization members to this project.
              </p>
              <Button>Add member</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead className="text-right">Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Username</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    Organization
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="webhooks">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Deliver project events to external services.
              </p>
              <Button>Add webhook</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No webhooks configured
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </PlatformPage>
  )
}
