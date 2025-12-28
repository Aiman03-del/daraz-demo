"use client"

import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        logout()
        router.push("/login")
      }}
    >
      <LogOut size={16} />
      Logout
    </Button>
  )
}
