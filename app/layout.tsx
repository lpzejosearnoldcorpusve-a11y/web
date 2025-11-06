import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "La Paz - Dashboard",
  description: "Sistema de Login y Dashboard - La Paz",
  generator: "v0.app",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  keywords: "dashboard, login, la paz, sistema",
  authors: [{ name: "La Paz" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f766e" />
      </head>
      <body className={`${_geist.className} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
