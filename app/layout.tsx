import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { TranslationProvider } from "@/contexts/translation-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jharkhand Tourism - Discover Tribal Heritage & Natural Beauty",
  description:
    "Explore the rich tribal culture, stunning waterfalls, and pristine forests of Jharkhand. Book guides, homestays, and authentic experiences.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TranslationProvider>
          <Navigation />
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </TranslationProvider>
      </body>
    </html>
  )
}
