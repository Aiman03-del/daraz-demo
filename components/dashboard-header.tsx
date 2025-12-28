"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, User, Bell, Home, Info } from "lucide-react"
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

export default function DashboardHeader() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    const checkAuth = () => {
      const role = Cookies.get("role")
      const userName = Cookies.get("userName")
      const userEmail = Cookies.get("userEmail")

      if (role && userName && userEmail) {
        setUserInfo({ role, name: userName, email: userEmail })
      } else {
        router.push("/login")
      }
    }

    checkAuth()

    const interval = setInterval(checkAuth, 500)
    return () => clearInterval(interval)
  }, [router])

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

  if (!userInfo) return null

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm">
      <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 gap-4">
        {/* Left Side - Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg sm:text-xl font-bold whitespace-nowrap">
            {userInfo.role === "admin" ? "Admin" : "Reseller"} Dashboard
          </h1>
          <Badge variant="outline" className="text-xs capitalize hidden sm:inline-flex">
            {userInfo.role}
          </Badge>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-sm hover:text-primary transition text-muted-foreground font-medium">
              Home
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition text-muted-foreground font-medium">
              About
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-5 border-l border-muted-foreground/30"></div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative rounded-full h-9 w-9 sm:h-10 sm:w-10 p-0"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-9 w-9 sm:h-10 sm:w-10 p-0 hover:bg-muted"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 sm:w-64 mt-2">
              <div className="px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {userInfo.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userInfo.email}
                  </p>
                  <Badge variant="outline" className="mt-1.5 text-xs capitalize">
                    {userInfo.role}
                  </Badge>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Mobile Navigation Links in Dropdown */}
              <div className="md:hidden space-y-1 px-2 py-2">
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2 cursor-pointer py-2">
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className="flex items-center gap-2 cursor-pointer py-2">
                    About
                  </Link>
                </DropdownMenuItem>
              </div>

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
      </div>
    </header>
  )
}
