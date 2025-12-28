import AdminSidebar from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-muted/30">
        {children}
      </main>
    </div>
  )
}
