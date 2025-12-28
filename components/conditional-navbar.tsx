"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar on admin and reseller routes
  const hideNavbar = pathname?.startsWith("/admin") || pathname?.startsWith("/reseller")
  
  if (hideNavbar) return null
  
  return <Navbar />
}
