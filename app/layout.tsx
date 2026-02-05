import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "CivicReport - Community Issue Reporting System",
  description: "Report and track civic issues in your community with AI-powered routing and gamification",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
        <AuthProvider>
          <Suspense fallback={null}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
            <Toaster />
            <Analytics />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
