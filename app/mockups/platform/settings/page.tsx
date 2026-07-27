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
import {
  getAgentConsolePage,
  type ProjectSettingsPageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = {
  title: "Project settings",
}

export default async function MockupSettingsPage() {
  const editorial =
    await getAgentConsolePage<ProjectSettingsPageContent>("project-settings")
  if (!editorial?.projectSettings) {
    throw new Error(
      "Required Sanity document agentConsolePage-project-settings is missing or incomplete."
    )
  }
  const content = editorial.projectSettings

  return (
    <PlatformPage title={editorial.heading} description={editorial.description}>
      <Tabs defaultValue="general" className="gap-8">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto border-b px-0 pb-1"
        >
          <TabsTrigger value="general" className="flex-none">
            {content.generalTabLabel}
          </TabsTrigger>
          <TabsTrigger value="members" className="flex-none">
            {content.membersTabLabel}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <form className="flex max-w-xl flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="project-name">{content.projectNameLabel}</Label>
              <Input id="project-name" defaultValue="Default project" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="project-id">{content.projectIdLabel}</Label>
              <Input
                id="project-id"
                defaultValue="proj_livepeer_default"
                readOnly
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                {content.projectIdHelp}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="compute-region">{content.regionLabel}</Label>
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
                {content.regionHelp}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="project-api-keys" defaultChecked />
              <Label htmlFor="project-api-keys">{content.allowKeysLabel}</Label>
            </div>
            <Button type="submit" className="h-10 self-start rounded-sm px-4">
              {content.saveLabel}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="members">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                {content.membersDescription}
              </p>
              <Button className="h-10 rounded-sm px-4">
                {content.addMemberLabel}
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{content.memberColumnLabel}</TableHead>
                  <TableHead>{content.accessColumnLabel}</TableHead>
                  <TableHead className="text-right">
                    {content.sourceColumnLabel}
                  </TableHead>
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
      </Tabs>
    </PlatformPage>
  )
}
