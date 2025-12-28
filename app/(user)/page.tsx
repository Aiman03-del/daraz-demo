"use client"

import { useEffect, useState } from "react"
import ProductCard from "@/components/product-card"
import ProductSlider from "@/components/product-slider"
import { getProducts } from "@/lib/product-store"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Users, TrendingUp, Award, Zap, Heart, Truck, Shield } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setProducts(getProducts())
    setIsLoading(false)
  }, [])

  return (
    <section className="space-y-20">
      {/* Product Slider Banner */}
      {!isLoading && products.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8 md:p-12 border border-slate-200 dark:border-slate-700">
          <ProductSlider products={products.slice(0, 10)} />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold">No Products Available</h2>
            <p className="text-muted-foreground text-lg max-w-md">
              There are currently no products listed. Please check back later or become a seller to add products!
            </p>
          </div>
          <Link href="/login">
            <Button size="lg">
              Become a Seller
            </Button>
          </Link>
        </div>
      )}

      {products.length > 0 && (
      <>
      {/* Stats with better design */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-8 rounded-xl text-center space-y-3 border border-blue-200 dark:border-blue-800">
          <ShoppingBag className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400" />
          <p className="text-3xl font-bold">{products.length}</p>
          <p className="text-sm text-muted-foreground">Products Listed</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-8 rounded-xl text-center space-y-3 border border-purple-200 dark:border-purple-800">
          <Users className="h-8 w-8 mx-auto text-purple-600 dark:text-purple-400" />
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-muted-foreground">Verified Sellers</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 p-8 rounded-xl text-center space-y-3 border border-orange-200 dark:border-orange-800">
          <TrendingUp className="h-8 w-8 mx-auto text-orange-600 dark:text-orange-400" />
          <p className="text-3xl font-bold">500+</p>
          <p className="text-sm text-muted-foreground">Product Views</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-8 rounded-xl text-center space-y-3 border border-green-200 dark:border-green-800">
          <Award className="h-8 w-8 mx-auto text-green-600 dark:text-green-400" />
          <p className="text-3xl font-bold">100%</p>
          <p className="text-sm text-muted-foreground">Verified & Safe</p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-muted rounded-xl p-4 sm:p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
          <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span className="font-semibold text-xs sm:text-sm">Fast Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span className="font-semibold text-xs sm:text-sm">Secure Payment</span>
        </div>
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span className="font-semibold text-xs sm:text-sm">Quality Assured</span>
        </div>
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
          <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span className="font-semibold text-xs sm:text-sm">Best Prices</span>
        </div>
      </div>

      {/* Trending Products Section */}
      <div id="trending" className="space-y-6 sm:space-y-10">
        <div className="space-y-2 sm:space-y-3">
          <div className="inline-block bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-primary">
            Hot Deals
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Trending Products
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Explore our most popular items right now. Hand-picked from verified sellers.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-xl p-4 bg-card shadow-sm">
                <Skeleton className="h-40 w-full mb-3" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/3" />
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

        <div className="text-center">
          <Link href="#trending">
            <Button variant="outline" size="lg">
              View All Products →
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Shop on Daraz?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide the best shopping experience with quality, trust, and value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 p-8 border rounded-xl hover:shadow-lg transition">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Wide Selection</h3>
            <p className="text-muted-foreground">
              Browse thousands of products across multiple categories from trusted sellers.
            </p>
          </div>

          <div className="space-y-4 p-8 border rounded-xl hover:shadow-lg transition">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Best Prices</h3>
            <p className="text-muted-foreground">
              Competitive pricing and regular discounts to ensure great value for money.
            </p>
          </div>

          <div className="space-y-4 p-8 border rounded-xl hover:shadow-lg transition">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Verified Sellers</h3>
            <p className="text-muted-foreground">
              All our resellers are verified and trusted to provide quality products.
            </p>
          </div>

          <div className="space-y-4 p-8 border rounded-xl hover:shadow-lg transition">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <Truck className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Fast Delivery</h3>
            <p className="text-muted-foreground">
              Get your orders quickly with our reliable and fast delivery network.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section - Seller */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/95 to-primary/75 text-white p-12 md:p-16">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40"></div>
        <div className="relative z-10 space-y-6 max-w-2xl">
          <h3 className="text-4xl md:text-5xl font-bold">
            Ready to Become a Seller?
          </h3>
          <p className="text-lg text-white/90">
            Join hundreds of successful resellers on Daraz. Start your business today with zero commission on first 50 sales and dedicated seller support.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Selling Now →
            </Button>
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="space-y-6 p-12 border rounded-2xl bg-muted">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold">Stay Updated</h3>
          <p className="text-muted-foreground">
            Get the latest deals, new products, and exclusive offers delivered to your inbox.
          </p>
        </div>
        <div className="flex gap-3 max-w-md">
          <Input
            placeholder="Enter your email"
            type="email"
            className="flex-1"
          />
          <Button>Subscribe</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold">
          Everything You Need in One Place
        </h2>
        <Link href="#trending">
          <Button size="lg" variant="outline">
            Explore Our Collection
          </Button>
        </Link>
      </div>
      </>
      )}
    </section>
  )
}
