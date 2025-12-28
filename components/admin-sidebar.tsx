"use client"

import Link from "next/link"
import { LayoutDashboard, Package, Users, UserCog, PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminSidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen border-r bg-card space-y-6 sticky top-0"
    >
      <nav className="space-y-2 text-sm">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <LayoutDashboard size={18} className="text-muted-foreground" />
          Dashboard
        </Link>

        <Link
          href="/admin/products"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <Package size={18} className="text-muted-foreground" />
          All Products
        </Link>

        <Link
          href="/admin/users"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <UserCog size={18} className="text-muted-foreground" />
          User Management
        </Link>

        <Link
          href="/admin/resellers"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <Users size={18} className="text-muted-foreground" />
          Resellers
        </Link>

        <Link
          href="/admin/create-product"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/70 hover:text-foreground text-muted-foreground transition font-medium"
        >
          <PlusCircle size={18} className="text-muted-foreground" />
          Add Product
        </Link>
      </nav>
    </motion.aside>
  )
}
