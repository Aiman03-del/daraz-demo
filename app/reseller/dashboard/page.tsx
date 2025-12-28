"use client"

import { useState, useEffect } from "react"
import StatCard from "@/components/stat-card"
import { getViews } from "@/lib/store"
import { Eye, Package } from "lucide-react"
import { getUserInfo } from "@/lib/auth"
import { getProductsByOwner, type Product } from "@/lib/product-store"
import { getOrdersByReseller, type Order } from "@/lib/orders-store"

export default function ResellerDashboard() {
  const [myProducts, setMyProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [totalViews, setTotalViews] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getUserInfo()
    if (user) {
      const products = getProductsByOwner(user.email)
      const views = products.reduce((sum, p) => sum + getViews(p.id), 0)
      const productOrders = getOrdersByReseller(user.email, products.map(p => p.id))
      
      setMyProducts(products)
      setTotalViews(views)
      setOrders(productOrders)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Loading your stats...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Quick snapshot of your products, views, and orders</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={myProducts.length} icon={<Package />} />
        <StatCard title="Total Views" value={totalViews} icon={<Eye />} />
        <StatCard title="Orders" value={orders.length} icon={<Package />} />
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Product Views</h2>
        <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3">Views</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3 text-center">{getViews(p.id)}</td>
                </tr>
              ))}
              {myProducts.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-muted-foreground" colSpan={2}>
                    No products yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
