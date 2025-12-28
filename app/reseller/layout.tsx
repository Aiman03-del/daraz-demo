import Sidebar from "@/components/sidebar"

export default function ResellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-muted/30">
        {children}
      </main>
    </div>
  )
}
