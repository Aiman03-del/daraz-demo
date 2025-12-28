"use client"

// Home page should be accessible to all; no redirects
import { useEffect, useState } from "react"
import ProductCard from "@/components/product-card"
import { getProducts } from "@/lib/product-store"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setProducts(getProducts())
    setIsLoading(false)
  }, [])

  return (
    <section className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Trending Products</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-xl p-4 bg-card shadow-sm">
              <Skeleton className="h-40 w-full mb-3" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
