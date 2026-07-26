import type { Metadata } from "next"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  title: "Organization settings",
}

const members = [
  {
    name: "Username",
    email: "username@example.com",
    role: "Owner",
  },
]

const paymentMethods = [
  {
    brand: "Visa",
    last4: "4242",
    expires: "08/2029",
    role: "Default",
  },
  {
    brand: "Mastercard",
    last4: "1881",
    expires: "11/2028",
    role: "Fallback",
  },
]

const invoices = [
  {
    id: "INV-2026-006",
    period: "June 2026",
    amount: "$1,982.44",
    status: "Paid",
  },
  {
    id: "INV-2026-005",
    period: "May 2026",
    amount: "$2,204.10",
    status: "Paid",
  },
  {
    id: "INV-2026-004",
    period: "April 2026",
    amount: "$1,730.28",
    status: "Paid",
  },
]

export default async function MockupOrganizationPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>
}) {
  const requestedTab = (await searchParams).tab
  const defaultTab =
    typeof requestedTab === "string" &&
    ["general", "members", "billing"].includes(requestedTab)
      ? requestedTab
      : "general"

  return (
    <PlatformPage title="Organization settings">
      <Tabs defaultValue={defaultTab} className="gap-8">
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
          <TabsTrigger value="billing" className="flex-none">
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <form className="flex max-w-xl flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="organization-name">Organization name</Label>
              <Input id="organization-name" defaultValue="Personal" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="organization-id">Organization ID</Label>
              <Input
                id="organization-id"
                defaultValue="org_personal"
                readOnly
                className="font-mono"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-16 self-start rounded-sm px-6"
            >
              Save
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="members">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Members can be assigned to projects after joining the
                organization.
              </p>
              <Button size="lg" className="h-16 rounded-sm px-6">
                Invite member
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-foreground text-xs text-background">
                            U
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {member.email}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{member.role}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="billing">
          <div className="flex flex-col gap-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="gap-2 rounded-sm">
                <CardHeader>
                  <CardDescription>Current period</CardDescription>
                  <CardTitle className="text-2xl font-medium tabular-nums">
                    $2,148.90
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    July 1 – July 23 · next invoice August 1
                  </p>
                </CardContent>
              </Card>
              <Card className="gap-2 rounded-sm">
                <CardHeader>
                  <CardDescription>Credit balance</CardDescription>
                  <CardTitle className="text-2xl font-medium tabular-nums">
                    $500.00
                  </CardTitle>
                  <CardAction>
                    <Button variant="outline" size="sm">
                      Add credits
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Applied before charging the default payment method.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-medium">Payment methods</h2>
                <Button variant="outline" size="sm">
                  Add payment method
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentMethods.map((method) => (
                    <TableRow key={`${method.brand}-${method.last4}`}>
                      <TableCell className="font-medium">
                        {method.brand} ···· {method.last4}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {method.expires}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            method.role === "Default" ? "secondary" : "outline"
                          }
                        >
                          {method.role}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-medium">Invoices</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-xs">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.period}</TableCell>
                      <TableCell className="text-right text-xs tabular-nums">
                        {invoice.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="xs">
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PlatformPage>
  )
}
