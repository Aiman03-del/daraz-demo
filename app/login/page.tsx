"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { DEMO_USERS } from "@/lib/demo-users"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check if it's a demo user (reseller or admin)
    const demoUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (demoUser) {
      // Demo user login
      login({
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role as "user" | "reseller" | "admin",
      })

      toast.success(`Welcome ${demoUser.name}!`, {
        description: `Logging in as ${demoUser.role}...`,
      })

      if (demoUser.role === "admin") {
        router.refresh()
        router.push("/admin/dashboard")
      } else if (demoUser.role === "reseller") {
        router.refresh()
        router.push("/reseller/dashboard")
      }
    } else {
      // Any other email/password - login as regular user
      if (email && password) {
        const userName = email.split("@")[0] // Use email prefix as name
        
        login({
          name: userName.charAt(0).toUpperCase() + userName.slice(1), // Capitalize first letter
          email: email,
          role: "user",
        })

        toast.success(`Welcome ${userName}!`, {
          description: "Logging in as user...",
        })

        router.refresh()
        router.push("/")
      } else {
        setError("Please enter email and password")
        toast.error("Invalid credentials!", {
          description: "Please check your email and password",
        })
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-md space-y-6 border p-8 rounded-lg bg-background shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter any email/password to login as user
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>

        <div className="border-t pt-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                View Admin/Reseller Credentials
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Admin & Reseller Accounts</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded text-sm">
                  <p className="font-semibold text-blue-900 dark:text-blue-100">ℹ️ Regular Users</p>
                  <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">
                    Use any email and password to login as a regular user
                  </p>
                </div>
                {DEMO_USERS.map((user) => (
                  <div
                    key={user.id}
                    className="bg-muted p-4 rounded cursor-pointer hover:bg-muted/80 transition"
                    onClick={() => {
                      setEmail(user.email)
                      setPassword(user.password)
                      setOpen(false)
                    }}
                  >
                    <p className="font-semibold capitalize text-sm mb-2">
                      {user.role} - {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Email: {user.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Password: {user.password}
                    </p>
                    <p className="text-xs text-primary mt-2">
                      Click to fill form →
                    </p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
