import { getUserInfo } from "@/lib/auth"

export interface Product {
  id: string
  title: string
  price: number
  image: string
  reseller: string
  views: number
  ownerEmail?: string
}

let productList: Product[] = []

const CREATED_KEY = "createdProducts"

const readCreated = (): Product[] => {
  if (typeof window === "undefined") return productList.filter(p => p.ownerEmail)
  try {
    const raw = localStorage.getItem(CREATED_KEY)
    return raw ? (JSON.parse(raw) as Product[]) : []
  } catch {
    return []
  }
}

const writeCreated = (items: Product[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CREATED_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }
}

export const getProducts = (): Product[] => {
  if (typeof window !== "undefined") {
    return readCreated()
  }
  return productList
}

export const getProductsByOwner = (email: string): Product[] => {
  if (!email) return []
  if (typeof window !== "undefined") {
    return readCreated().filter(p => p.ownerEmail === email)
  }
  return productList.filter(p => p.ownerEmail === email)
}

export const getProductById = (id: string): Product | undefined => {
  if (typeof window !== "undefined") {
    return readCreated().find(p => p.id === id)
  }
  return productList.find(p => p.id === id)
}

export const addProduct = (product: Omit<Product, "id" | "reseller" | "views"> & { id?: string; views?: number }) => {
  const user = getUserInfo()
  const toAdd: Product = {
    id: product.id || Date.now().toString(),
    title: product.title,
    price: product.price,
    image: product.image,
    reseller: user?.name || "You",
    views: product.views ?? 0,
    ownerEmail: user?.email,
  }

  // persist to localStorage for client
  const current = readCreated()
  const updated = [...current, toAdd]
  writeCreated(updated)

  // update memory for server fallback
  productList.push(toAdd)
}

export const updateProduct = (id: string, updates: Partial<Omit<Product, "id" | "reseller" | "ownerEmail">>) => {
  const current = readCreated()
  const index = current.findIndex(p => p.id === id)
  
  if (index !== -1) {
    current[index] = { ...current[index], ...updates }
    writeCreated(current)
    
    // update memory
    const memIndex = productList.findIndex(p => p.id === id)
    if (memIndex !== -1) {
      productList[memIndex] = { ...productList[memIndex], ...updates }
    }
  }
}

export const deleteProduct = (id: string) => {
  const current = readCreated()
  const filtered = current.filter(p => p.id !== id)
  writeCreated(filtered)
  
  // update memory
  productList = productList.filter(p => p.id !== id)
}
