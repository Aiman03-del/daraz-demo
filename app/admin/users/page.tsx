"use client"

import { useState, useEffect } from "react"
import { getUsers, updateUserRole, deleteUser, type User } from "@/lib/user-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUsers = () => {
    setUsers(getUsers())
  }

  useEffect(() => {
    loadUsers()
    setIsLoading(false)
  }, [])

  const handleRoleChange = (email: string, newRole: "user" | "reseller" | "admin") => {
    const success = updateUserRole(email, newRole)
    if (success) {
      toast.success("Role updated successfully", {
        description: `User role changed to ${newRole}`
      })
      loadUsers()
    } else {
      toast.error("Failed to update role")
    }
  }

  const handleDelete = () => {
    if (deleteEmail) {
      const success = deleteUser(deleteEmail)
      if (success) {
        toast.success("User deleted successfully")
        loadUsers()
      } else {
        toast.error("Failed to delete user")
      }
      setDeleteEmail(null)
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "reseller":
        return "default"
      default:
        return "secondary"
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-8 w-72" />
        <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
          <div className="h-10 bg-muted" />
          <div className="p-4 space-y-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage users and assign reseller privileges
        </p>
      </div>

      <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Change Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="border-t">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <Select
                      value={user.role}
                      onValueChange={(value) =>
                        handleRoleChange(user.email, value as "user" | "reseller" | "admin")
                      }
                    >
                      <SelectTrigger className="w-[130px] h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="reseller">Reseller</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteEmail(user.email)}
                      className="h-9 text-red-600 hover:text-red-700"
                      disabled={user.role === "admin"}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-muted-foreground" colSpan={5}>
                  No users registered yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!deleteEmail} onOpenChange={() => setDeleteEmail(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
