"use client"

import { useState, useEffect } from "react"
import { getProductsByOwner, deleteProduct, type Product } from "@/lib/product-store"
import { getUserInfo } from "@/lib/auth"
import { getViews } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const loadProducts = () => {
    const user = getUserInfo()
    if (user) {
      setProducts(getProductsByOwner(user.email))
    }
  }

  useEffect(() => {
    loadProducts()
    setIsLoading(false)
  }, [])

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId)
      toast.success("Product deleted successfully")
      loadProducts()
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
          <div className="h-10 bg-muted" />
          <div className="p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">My Products</h1>
        <p className="text-muted-foreground">Manage your listings and keep them fresh</p>
      </div>

      <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3 text-center">৳ {p.price}</td>
                <td className="px-4 py-3 text-center">{getViews(p.id)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/reseller/edit-product/${p.id}`}>
                      <Button size="sm" variant="outline" className="h-9">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteId(p.id)}
                      className="h-9 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-muted-foreground" colSpan={4}>
                  No products yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
