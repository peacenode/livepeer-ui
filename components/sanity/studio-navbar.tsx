"use client"

import { Box, Button, Card, Flex } from "@sanity/ui"
import { ArrowUpRightIcon } from "lucide-react"
import type { NavbarProps } from "sanity"

const pageLinks = [
  { label: "Agent Console", href: "/mockups/livepeer-agent" },
  { label: "Marketing Page", href: "/mockups/livepeer-org/agent" },
]

export function StudioNavbar(props: NavbarProps) {
  return (
    <>
      {props.renderDefault(props)}
      <Card borderTop padding={2}>
        <Flex align="center" justify="flex-end" gap={1}>
          {pageLinks.map((link) => (
            <Box key={link.href}>
              <Button
                as="a"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                mode="bleed"
                padding={2}
                text={link.label}
                iconRight={ArrowUpRightIcon}
              />
            </Box>
          ))}
        </Flex>
      </Card>
    </>
  )
}
