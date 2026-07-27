"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Box, Button, Card, Flex, Stack, Text } from "@sanity/ui"
import {
  CalendarIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
} from "lucide-react"
import type { LayoutProps } from "sanity"

const contentStreams = [
  {
    label: "Planner",
    href: "/studio/structure/planner",
    icon: CalendarIcon,
  },
  {
    label: "Agent Waitlist",
    href: "/studio/structure/agent-waitlist",
    icon: GalleryVerticalEndIcon,
  },
  {
    label: "Agent Console",
    href: "/studio/structure/agent-console",
    icon: CreditCardIcon,
  },
  {
    label: "Livepeer.org",
    href: "/studio/structure/livepeer-org",
    icon: GalleryVerticalEndIcon,
  },
]

export function StudioLayout(props: LayoutProps) {
  const pathname = usePathname()

  return (
    <Flex style={{ height: "100dvh", minWidth: 0 }}>
      <Card
        borderRight
        padding={3}
        style={{ width: 224, flexShrink: 0, overflowY: "auto" }}
      >
        <Stack space={3}>
          <Box paddingX={2} paddingY={1}>
            <Text muted size={1} weight="semibold">
              Content
            </Text>
          </Box>
          <Stack space={1}>
            {contentStreams.map((stream) => {
              const selected = pathname.startsWith(stream.href)

              return (
                <Button
                  key={stream.href}
                  as={Link}
                  href={stream.href}
                  icon={stream.icon}
                  justify="flex-start"
                  mode={selected ? "default" : "bleed"}
                  padding={3}
                  selected={selected}
                  text={stream.label}
                />
              )
            })}
          </Stack>
        </Stack>
      </Card>
      <Box flex={1} style={{ minWidth: 0 }}>
        {props.renderDefault(props)}
      </Box>
    </Flex>
  )
}
