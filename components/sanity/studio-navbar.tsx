"use client"

import { Box, Button, Card, Flex } from "@sanity/ui"
import { ArrowLeftIcon, ArrowUpRightIcon, HouseIcon } from "lucide-react"
import type { NavbarProps } from "sanity"

const pageLinks = [
  { label: "Agent Console", href: "/mockups/livepeer-agent" },
  { label: "Livepeer.org", href: "/mockups/livepeer-org" },
]

export function StudioNavbar(props: NavbarProps) {
  return (
    <>
      {props.renderDefault(props)}
      <Card borderTop padding={2}>
        <Flex align="center" justify="space-between" gap={2} wrap="wrap">
          <Flex align="center" gap={1} wrap="wrap">
            <Box>
              <Button
                as="a"
                href="/studio/structure"
                mode="bleed"
                padding={2}
                text="Content home"
                icon={HouseIcon}
              />
            </Box>
            <Box>
              <Button
                as="a"
                href="/docs"
                mode="bleed"
                padding={2}
                text="Back to registry"
                icon={ArrowLeftIcon}
              />
            </Box>
          </Flex>
          <Flex align="center" gap={1} wrap="wrap">
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
        </Flex>
      </Card>
    </>
  )
}
