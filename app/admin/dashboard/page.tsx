"use client"

import { useState, useEffect } from "react"
import { getProducts } from "@/lib/product-store"
import { getUsers } from "@/lib/user-store"
import StatCard from "@/components/stat-card"
import { Package, Eye, Users } from "lucide-react"
import { getViews } from "@/lib/store"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    views: 0,
    resellers: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const products = getProducts()
    const totalViews = products.reduce((sum, p) => sum + getViews(p.id), 0)
    const users = getUsers()
    const resellersCount = users.filter(u => u.role === "reseller").length

    setStats({
      products: products.length,
      views: totalViews,
      resellers: resellersCount
    })
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-xl p-6 bg-card">
              <Skeleton className="h-5 w-28 mb-2" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground">Platform statistics and performance metrics</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Products"
          value={stats.products}
          icon={<Package />}
        />

        <StatCard
          title="Total Views"
          value={stats.views}
          icon={<Eye />}
        />

        <StatCard
          title="Total Resellers"
          value={stats.resellers}
          icon={<Users />}
        />
      </div>
    </div>
  )
}
