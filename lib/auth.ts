import Cookies from "js-cookie"
import { addUser } from "./user-store"

export type Role = "user" | "reseller" | "admin"

export interface UserInfo {
  name: string
  email: string
  role: Role
}

export const login = (userInfo: UserInfo) => {
  Cookies.set("role", userInfo.role)
  Cookies.set("userName", userInfo.name)
  Cookies.set("userEmail", userInfo.email)
  
  // Store user in localStorage for admin management
  addUser({
    email: userInfo.email,
    name: userInfo.name,
    role: userInfo.role
  })
}

export const logout = () => {
  Cookies.remove("role")
  Cookies.remove("userName")
  Cookies.remove("userEmail")
}

export const getRole = (): Role | null => {
  return (Cookies.get("role") as Role) || null
}

export const getUserInfo = (): UserInfo | null => {
  const role = Cookies.get("role")
  const name = Cookies.get("userName")
  const email = Cookies.get("userEmail")

  if (!role || !name || !email) return null

  return { role: role as Role, name, email }
}
