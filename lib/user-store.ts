export interface User {
  email: string
  name: string
  role: "user" | "reseller" | "admin"
  createdAt: number
}

const STORAGE_KEY = "registeredUsers"

export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function addUser(user: Omit<User, "createdAt">): void {
  const users = getUsers()
  const exists = users.find(u => u.email === user.email)
  
  if (!exists) {
    users.push({
      ...user,
      createdAt: Date.now()
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }
}

export function updateUserRole(email: string, newRole: "user" | "reseller" | "admin"): boolean {
  const users = getUsers()
  const userIndex = users.findIndex(u => u.email === email)
  
  if (userIndex !== -1) {
    users[userIndex].role = newRole
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    return true
  }
  return false
}

export function deleteUser(email: string): boolean {
  const users = getUsers()
  const filtered = users.filter(u => u.email !== email)
  
  if (filtered.length !== users.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  }
  return false
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email === email)
}
