import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { siteConfig } from "@/lib/docs"
import { cn } from "@/lib/utils"

const fontSans = localFont({
  src: [
    { path: "../assets/fonts/FavoritPro-Light.woff2", weight: "300" },
    { path: "../assets/fonts/FavoritPro-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/FavoritPro-Book.woff2", weight: "450" },
    { path: "../assets/fonts/FavoritPro-Medium.woff2", weight: "500" },
    { path: "../assets/fonts/FavoritPro-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sans",
})

const fontMono = localFont({
  src: [
    { path: "../assets/fonts/FavoritMono-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/FavoritMono-Medium.woff2", weight: "500" },
    { path: "../assets/fonts/FavoritMono-Bold.woff2", weight: "700" },
  ],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: "/brand/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/brand/og.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", fontSans.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
