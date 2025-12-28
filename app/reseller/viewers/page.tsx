"use client"

import { useState, useEffect } from "react"
import { getUserInfo } from "@/lib/auth"
import { getProductsByOwner } from "@/lib/product-store"
import { getViewers } from "@/lib/store"

interface ViewerData {
  email: string
  name: string
  timestamp: number
}

export default function ViewersPage() {
  const [viewersData, setViewersData] = useState<{ productTitle: string; viewers: ViewerData[] }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getUserInfo()
    if (user) {
      const myProducts = getProductsByOwner(user.email)
      const data = myProducts.map(p => ({
        productTitle: p.title,
        viewers: getViewers(p.id)
      }))
      setViewersData(data)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Product Viewers</h1>
        <p className="text-muted-foreground">Loading viewer data...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Product Viewers</h1>
        <p className="text-muted-foreground">See who viewed your products</p>
      </div>

      <div className="space-y-8">
        {viewersData.map((item, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-xl font-semibold">{item.productTitle}</h2>
            <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {item.viewers.map((viewer, vIdx) => (
                    <tr key={vIdx} className="border-t">
                      <td className="px-4 py-3">{viewer.name}</td>
                      <td className="px-4 py-3 text-center">{viewer.email}</td>
                      <td className="px-4 py-3 text-center">
                        {new Date(viewer.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {item.viewers.length === 0 && (
                    <tr>
                      <td className="px-4 py-6 text-center text-muted-foreground" colSpan={3}>
                        No views yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {viewersData.length === 0 && (
          <p className="text-center text-muted-foreground">No products yet</p>
        )}
      </div>
    </div>
  )
}
