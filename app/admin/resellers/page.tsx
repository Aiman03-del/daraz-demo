"use client"

import { useState, useEffect } from "react"
import { getUsers, type User } from "@/lib/user-store"
import { getProductsByOwner } from "@/lib/product-store"

interface ResellerData {
  email: string
  name: string
  products: number
}

export default function AdminResellersPage() {
  const [resellers, setResellers] = useState<ResellerData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const users = getUsers()
    const resellerUsers = users.filter(u => u.role === "reseller")
    
    const resellerData = resellerUsers.map(user => ({
      email: user.email,
      name: user.name,
      products: getProductsByOwner(user.email).length
    }))
    
    setResellers(resellerData)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Resellers</h1>
          <p className="text-muted-foreground">Loading resellers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Resellers</h1>
        <p className="text-muted-foreground">Manage and monitor all resellers on the platform</p>
      </div>

      <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3">Total Products</th>
            </tr>
          </thead>

          <tbody>
            {resellers.map((r) => (
              <tr key={r.email} className="border-t">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3 text-center">{r.products}</td>
              </tr>
            ))}
            {resellers.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-muted-foreground" colSpan={3}>
                  No resellers yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
