// app/layout.tsx
import Navbar from "@/components/navbar"
import "./globals.css"
import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <Navbar />
        <main className="container mx-auto py-6">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
