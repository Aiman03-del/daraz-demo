"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getViews } from "@/lib/store"

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: number
    image: string
    reseller: string
    views: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [views, setViews] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setViews(getViews(product.id))
  }, [product.id])

  return (
    <div suppressHydrationWarning>
      <motion.div
        initial={isMounted ? false : undefined}
      >
        <Card className="overflow-hidden h-full">
        <div className="relative h-40 sm:h-48 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <CardContent className="p-3 sm:p-4 space-y-2">
          <h3 className="font-semibold line-clamp-2 text-sm sm:text-base">
            {product.title}
          </h3>

          <p className="text-base sm:text-lg font-bold text-primary">
            ৳ {product.price}
          </p>

          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
            <span className="truncate mr-2">{product.reseller}</span>
            <span className="flex items-center gap-1 shrink-0">
              <Eye size={14} className="sm:w-4 sm:h-4" /> {views}
            </span>
          </div>

          <Link href={`/product/${product.id}`}>
            <Button className="w-full mt-2 h-9 sm:h-10 text-xs sm:text-sm">
              <ShoppingCart size={14} className="mr-2 sm:w-4 sm:h-4" />
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  )
}
