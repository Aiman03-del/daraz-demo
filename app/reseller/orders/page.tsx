"use client"

import { useState, useEffect } from "react"
import { getUserInfo } from "@/lib/auth"
import { getOrdersByReseller, type Order } from "@/lib/orders-store"
import { getProductsByOwner } from "@/lib/product-store"

export default function ResellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [productMap, setProductMap] = useState<Map<string, string>>(new Map())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getUserInfo()
    if (user) {
      const ownedProducts = getProductsByOwner(user.email)
      const ownedIds = ownedProducts.map(p => p.id)
      const productOrders = getOrdersByReseller(user.email, ownedIds)
      
      setOrders(productOrders)
      setProductMap(new Map(ownedProducts.map(p => [p.id, p.title])))
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Orders</h1>
        <p className="text-muted-foreground">Fetching your latest orders...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Review recent purchases for your products</p>
      </div>

      <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3">Buyer</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-3">{productMap.get(o.productId) || o.productId}</td>
                <td className="px-4 py-3 text-center">{o.buyerName}</td>
                <td className="px-4 py-3 text-center">{o.buyerEmail}</td>
                <td className="px-4 py-3 text-center">{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-muted-foreground" colSpan={4}>
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}