import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Catalogo NIÑOS",
  description: "Catalogo digital de NIÑOS",
  icons: {
    icon: "/niños-logo.svg"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}