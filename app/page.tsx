"use client"

// Home page should be accessible to all; no redirects
import { useEffect, useState } from "react"
import ProductCard from "@/components/product-card"
import ProductSlider from "@/components/product-slider"
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
    <section className="space-y-8 sm:space-y-12">
      {/* Product Slider Banner */}
      {!isLoading && products.length > 0 && (
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-8 md:p-12 border border-slate-200 dark:border-slate-700">
          <ProductSlider products={products.slice(0, 10)} />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 space-y-4 sm:space-y-6 px-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">No Products Available</h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-md px-4">
              There are currently no products listed. Please check back later or become a seller to add products!
            </p>
          </div>
        </div>
      )}

      {/* Trending Products Grid */}
      {products.length > 0 && (
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Trending Products</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-xl p-4 bg-card shadow-sm">
              <Skeleton className="h-32 sm:h-40 w-full mb-3" />
              <Skeleton className="h-4 sm:h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 sm:h-5 w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      </div>      )}    </section>
  )
}
