export interface Order {
  id: string
  productId: string
  buyerName: string
  buyerEmail: string
  createdAt: number
}

const ORDERS_KEY = "orders"

const readOrders = (): Order[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

const writeOrders = (orders: Order[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    } catch {
      // ignore
    }
  }
}

export const getOrders = (): Order[] => readOrders()

export const createOrder = (productId: string, buyer: { name: string; email: string }) => {
  const orders = readOrders()
  const order: Order = {
    id: `${productId}-${Date.now()}`,
    productId,
    buyerName: buyer.name,
    buyerEmail: buyer.email,
    createdAt: Date.now(),
  }
  writeOrders([...orders, order])
}

// Helper to get orders belonging to products owned by a reseller
export const getOrdersByReseller = (resellerEmail: string, productIdsOwned: string[]): Order[] => {
  if (!resellerEmail) return []
  const orders = readOrders()
  const owned = new Set(productIdsOwned)
  return orders.filter(o => owned.has(o.productId))
}