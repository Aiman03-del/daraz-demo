"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import DashboardHeader from "@/components/dashboard-header"

export default function ResellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  )
}
