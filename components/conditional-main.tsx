"use client"

import { usePathname } from "next/navigation"

export default function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't wrap in main container for admin and reseller routes
  const isDashboard = pathname?.startsWith("/admin") || pathname?.startsWith("/reseller")
  
  if (isDashboard) {
    return <>{children}</>
  }
  
  return (
    <main className="container mx-auto py-4 sm:py-6 px-3 sm:px-4">
      {children}
    </main>
  )
}
