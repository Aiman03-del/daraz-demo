"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, User, LogOut, BarChart3, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { logout } from "@/lib/auth"
import { toast } from "sonner"
import Cookies from "js-cookie"

export default function Navbar() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const checkAuth = () => {
      const role = Cookies.get("role")
      const userName = Cookies.get("userName")
      const userEmail = Cookies.get("userEmail")

      if (role && userName && userEmail) {
        setUserInfo({ role, name: userName, email: userEmail })
      } else {
        setUserInfo(null)
      }
    }

    checkAuth()

    const interval = setInterval(checkAuth, 500)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    const userName = userInfo?.name || "User"
    logout()
    setUserInfo(null)

    toast.success(`Goodbye ${userName}!`, {
      description: "You have been logged out successfully",
    })

    router.refresh()
    router.push("/login")
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm"
      suppressHydrationWarning
    >
      <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl hover:opacity-80 transition"
        >
          <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <span className="hidden xs:inline">Daraz</span>
        </Link>

        {!isMounted ? (
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/"
              className="text-xs sm:text-sm hover:text-primary transition font-medium hidden sm:inline"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-xs sm:text-sm hover:text-primary transition font-medium hidden sm:inline"
            >
              About
            </Link>
            <Link href="/login">
              <Button size="sm" className="px-3 sm:px-6 text-xs sm:text-sm h-8 sm:h-9">
                Sign In
              </Button>
            </Link>
          </div>
        ) : !userInfo ? (
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/"
              className="text-xs sm:text-sm hover:text-primary transition font-medium hidden sm:inline"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-xs sm:text-sm hover:text-primary transition font-medium hidden sm:inline"
            >
              About
            </Link>
            <Link href="/login">
              <Button size="sm" className="px-3 sm:px-6 text-xs sm:text-sm h-8 sm:h-9">
                Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-muted"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 sm:w-64 mt-2">
                <div className="px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {userInfo.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {userInfo.email}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs capitalize">
                      {userInfo.role}
                    </Badge>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="py-2">
                  <Link href="/" className="cursor-pointer">
                    Home
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="py-2">
                  <Link href="/about" className="cursor-pointer">
                    About
                  </Link>
                </DropdownMenuItem>

                {userInfo.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="py-2">
                      <Link
                        href="/admin/dashboard"
                        className="cursor-pointer font-medium flex items-center gap-2"
                      >
                        <BarChart3 className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="py-2">
                      <Link href="/admin/products" className="cursor-pointer">
                        All Products
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="py-2">
                      <Link href="/admin/users" className="cursor-pointer">
                        User Management
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {userInfo.role === "reseller" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="py-2">
                      <Link
                        href="/reseller/dashboard"
                        className="cursor-pointer font-medium flex items-center gap-2"
                      >
                        <TrendingUp className="h-4 w-4" />
                        Reseller Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="py-2">
                      <Link
                        href="/reseller/products"
                        className="cursor-pointer"
                      >
                        My Products
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer py-2 font-medium"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  )
}
