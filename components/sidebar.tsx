"use client"

import Link from "next/link"
import { LayoutDashboard, Package, PlusCircle, ShoppingCart, Eye, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Check initial window size
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkDesktop()

    // Handle window resize
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  // Auto close sidebar when switching to desktop
  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false)
    }
  }, [isDesktop])

  return (
    <>
      {/* Overlay - Only show on mobile */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ 
          x: isDesktop ? 0 : (isOpen ? 0 : -280),
          opacity: 1 
        }}
        transition={{ duration: 0.3 }}
        className="fixed lg:static top-0 left-0 w-56 sm:w-64 h-screen border-r bg-card space-y-2 z-40 lg:z-0 p-3 sm:p-4 overflow-y-auto"
      >
        {/* Project Name Header */}
        <div className="pb-4 sm:pb-6 border-b">
          <h1 className="text-base sm:text-lg font-bold text-primary flex items-center gap-2">
            <Package size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Daraz</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Reseller Panel</p>
        </div>

        {/* Close button on mobile when sidebar is open */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-sm sm:text-base font-bold">Menu</h2>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <X size={16} />
          </Button>
        </div>

        <nav className="space-y-1 text-xs sm:text-sm">
          <Link
            href="/reseller/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
          >
            <LayoutDashboard size={16} className="sm:w-5 sm:h-5 shrink-0" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <Link
            href="/reseller/products"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
          >
            <Package size={16} className="sm:w-5 sm:h-5 shrink-0" />
            <span className="hidden sm:inline">My Products</span>
          </Link>

          <Link
            href="/reseller/orders"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
          >
            <ShoppingCart size={16} className="sm:w-5 sm:h-5 shrink-0" />
            <span className="hidden sm:inline">Orders</span>
          </Link>

          <Link
            href="/reseller/viewers"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
          >
            <Eye size={16} className="sm:w-5 sm:h-5 shrink-0" />
            <span className="hidden sm:inline">Viewers</span>
          </Link>

          <Link
            href="/reseller/create-product"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
          >
            <PlusCircle size={16} className="sm:w-5 sm:h-5 shrink-0" />
            <span className="hidden sm:inline">Add Product</span>
          </Link>
        </nav>
      </motion.aside>
    </>
  )
}
