"use client"

import Link from "next/link"
import { LayoutDashboard, Package, PlusCircle, ShoppingCart, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen border-r bg-card space-y-2 sticky top-0"
    >

      <nav className="space-y-2 text-sm">
        <Link
          href="/reseller/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <LayoutDashboard size={18} className="text-muted-foreground" />
          Dashboard
        </Link>

        <Link
          href="/reseller/products"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <Package size={18} className="text-muted-foreground" />
          My Products
        </Link>

        <Link
          href="/reseller/orders"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <ShoppingCart size={18} className="text-muted-foreground" />
          Orders
        </Link>

        <Link
          href="/reseller/viewers"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <Eye size={18} className="text-muted-foreground" />
          Viewers
        </Link>

        <Link
          href="/reseller/create-product"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <PlusCircle size={18} className="text-muted-foreground" />
          Add Product
        </Link>
      </nav>
    </motion.aside>
  )
}
