import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sonic | Premium Audio Ecosystem",
  description:
    "Sonic premium audio lineup: over-ear headphones, earbuds, wired studio gear, speakers, and app-controlled sound profiles."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
