"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { getProducts } from "@/lib/product-store"
import { increaseView, getViews } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Eye, ShoppingCart } from "lucide-react"
import { getUserInfo } from "@/lib/auth"
import { createOrder } from "@/lib/orders-store"
import { toast } from "sonner"

export default function ProductDetails() {
  const params = useParams()
  const router = useRouter()
  const productId = typeof params.id === "string" ? params.id : params.id?.[0]
  const products = getProducts()
  const product = products.find((p) => p.id === (productId ?? ""))
  const hasIncreasedView = useRef(false)
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    // Check if user is logged in
    const user = getUserInfo()
    if (!user) {
      toast.error("Please login to view product details")
      router.push("/login")
      return
    }

    // Increase view count only once per user
    if (product && !hasIncreasedView.current) {
      hasIncreasedView.current = true
      increaseView(product.id, user.email, user.name)
      setViewCount(getViews(product.id))
    }
  }, [product, router])

  if (!product) return <p>Product not found</p>

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative h-80 w-full rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {product.title}
        </h1>

        <p className="text-xl font-semibold text-primary">
          ৳ {product.price}
        </p>

        <p className="text-sm text-muted-foreground">
          Sold by {product.reseller}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <Eye size={16} />
          {viewCount || getViews(product.id)} views
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            const user = getUserInfo()
            if (!user) {
              toast.error("Please login to place an order")
              router.push("/login")
              return
            }
            createOrder(product.id, { name: user.name, email: user.email })
            toast.success("Order placed successfully")
          }}
        >
          <ShoppingCart className="mr-2" size={18} />
          Order Now
        </Button>
      </div>
    </div>
  )
}
