"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from "lucide-react"
import { getViews } from "@/lib/store"

interface ProductSliderProps {
  products: any[]
}

export default function ProductSlider({ products }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [views, setViews] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (products.length > 0) {
      setViews(getViews(products[currentIndex].id))
    }
  }, [currentIndex, products])

  // Auto-slide effect
  useEffect(() => {
    if (products.length <= 1) return

    const interval = setInterval(() => {
      paginate(1)
    }, 5000) // Slide every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex, products.length])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      let next = prev + newDirection
      if (next < 0) next = products.length - 1
      if (next >= products.length) next = 0
      return next
    })
  }

  if (products.length === 0) return null

  const product = products[currentIndex]

  return (
    <div className="space-y-10">
      {/* Slider Title */}
      <div className="space-y-3 text-center lg:text-left">
        <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-primary">
          Featured Products
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Browse Our Latest Collection
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
          Swipe through our hand-picked selection of premium products from trusted sellers.
        </p>
      </div>

      {/* Main Slider */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
          {/* Left Side - Content (slides right to left) */}
          <div className="relative h-full flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="space-y-6"
              >
                {/* Product Category */}
                <div className="inline-block bg-primary/20 px-4 py-2 rounded-lg w-fit">
                  <p className="text-sm font-semibold text-primary">
                    {product.reseller}
                  </p>
                </div>

                {/* Product Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {product.title}
                </h3>

                {/* Product Price */}
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                    ৳ {product.price}
                  </span>
                  <span className="text-sm sm:text-base lg:text-lg text-muted-foreground line-through">
                    ৳ {Math.round(product.price * 1.3)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 sm:px-3 py-1 rounded-full">
                    Save 25%
                  </span>
                </div>

                {/* Product Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 py-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Views</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-1 sm:gap-2">
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      {views}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Rating</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold">4.8 ★</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Sold</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold">1.2K</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  High-quality product from a verified seller. Get the best value for your money with our
                  competitive pricing and fast delivery service.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <Link href={`/product/${product.id}`} className="flex-1">
                    <Button size="lg" className="w-full text-sm sm:text-base">
                      <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      View Details
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="sm:w-auto">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm pt-2">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    ✓ Free Shipping
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    ✓ 7 Days Return
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Image (slides left to right) */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] order-first lg:order-last">
            <AnimatePresence initial={false} custom={-direction} mode="wait">
              <motion.div
                key={`image-${currentIndex}`}
                custom={-direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Image Badge */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 bg-white dark:bg-slate-900 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg border border-primary/20">
              <p className="text-xs sm:text-sm font-semibold">
                {currentIndex + 1} / {products.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-6">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className={`h-2 sm:h-3 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-primary w-6 sm:w-8"
                : "bg-primary/30 hover:bg-primary/50 w-2 sm:w-3"
            }`}
            aria-label={`Go to product ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Heart icon
function Heart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )
}
