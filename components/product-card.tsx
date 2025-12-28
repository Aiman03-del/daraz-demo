"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold line-clamp-2">
            {product.title}
          </h3>

          <p className="text-lg font-bold text-primary">
            ৳ {product.price}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{product.reseller}</span>
            <span className="flex items-center gap-1">
              <Eye size={14} /> {product.views}
            </span>
          </div>

          <Link href={`/product/${product.id}`}>
            <Button className="w-full mt-2">
              <ShoppingCart size={16} className="mr-2" />
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
