import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-provider"
import { SubscriptionProvider } from "@/lib/subscription-provider"
import Header from "@/components/header"
import { Analytics } from "@/components/analytics"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Latih - Certification Exam Practice",
  description: "Practice for certification exams with customized tests",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <SubscriptionProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <div className="flex flex-1 pt-16">
                  <Suspense fallback={<div className="flex-1">Loading...</div>}>
                    <main className="flex-1 pb-16 animate-fade-in">{children}</main>
                  </Suspense>
                </div>
              </div>
              <Toaster />
            </SubscriptionProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
