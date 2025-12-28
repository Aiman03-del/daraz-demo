import Sidebar from "@/components/sidebar"
import DashboardHeader from "@/components/dashboard-header"

export default function ResellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  )
}
