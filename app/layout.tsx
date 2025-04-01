import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { VAComponentsProvider } from "@/components/theming/va-components-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VA Rapid Prototyping Tool",
  description: "A tool for rapidly prototyping VA applications",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add Font Awesome for VA icons but only for specific components */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <VAComponentsProvider>{children}</VAComponentsProvider>
      </body>
    </html>
  )
}



import './globals.css'