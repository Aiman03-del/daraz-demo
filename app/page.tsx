"use client"

// Home page should be accessible to all; no redirects
import ProductCard from "@/components/product-card"
import { getProducts } from "@/lib/product-store"

export default function HomePage() {
  const products = getProducts()

  return (
    <section className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">
        Trending Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
