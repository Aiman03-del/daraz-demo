// app/layout.tsx
import ConditionalNavbar from "@/components/conditional-navbar"
import "./globals.css"
import { Toaster } from "sonner"
import ConditionalMain from "@/components/conditional-main"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <ConditionalNavbar />
        <ConditionalMain>
          {children}
        </ConditionalMain>
        <Toaster />
      </body>
    </html>
  )
}
