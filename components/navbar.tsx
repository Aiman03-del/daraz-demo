"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/auth"
import { toast } from "sonner"
import Cookies from "js-cookie"

export default function Navbar() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const role = Cookies.get("role")
      const userName = Cookies.get("userName")
      const userEmail = Cookies.get("userEmail")

      if (role && userName && userEmail) {
        setUserInfo({ role, name: userName, email: userEmail })
      } else {
        setUserInfo(null)
      }
      setIsLoading(false)
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

  if (isLoading) {
    return (
      <nav className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <ShoppingBag className="h-5 w-5" />
            Daraz
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <ShoppingBag className="h-5 w-5" />
          Daraz
        </Link>

        {!userInfo ? (
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm hover:text-primary transition">
              Home
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition">
              About
            </Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{userInfo.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    Home
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/about" className="cursor-pointer">
                    About
                  </Link>
                </DropdownMenuItem>

                {userInfo.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="cursor-pointer">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}

                {userInfo.role === "reseller" && (
                  <DropdownMenuItem asChild>
                    <Link href="/reseller/dashboard" className="cursor-pointer">
                      Reseller Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer"
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
