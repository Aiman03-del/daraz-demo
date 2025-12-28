const VIEWS_KEY = "productViews"
const VIEWERS_KEY = "productViewers"

let memoryViews: Record<string, number> = {}
let memoryViewers: Record<string, string[]> = {}

interface ViewerData {
  email: string
  name: string
  timestamp: number
}

const readViews = (): Record<string, number> => {
  if (typeof window === "undefined") return memoryViews
  try {
    const raw = localStorage.getItem(VIEWS_KEY)
    if (raw) return JSON.parse(raw)
    return {}
  } catch {
    return {}
  }
}

const writeViews = (map: Record<string, number>) => {
  if (typeof window === "undefined") {
    memoryViews = map
    return
  }
  try {
    localStorage.setItem(VIEWS_KEY, JSON.stringify(map))
    memoryViews = map
  } catch {
    // ignore write errors
  }
}

const readViewers = (): Record<string, ViewerData[]> => {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(VIEWERS_KEY)
    if (raw) return JSON.parse(raw)
    return {}
  } catch {
    return {}
  }
}

const writeViewers = (map: Record<string, ViewerData[]>) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(VIEWERS_KEY, JSON.stringify(map))
    } catch {
      // ignore
    }
  }
}

export const getViews = (id: string) => {
  const views = readViews()
  return views[id] || 0
}

export const getViewers = (productId: string): ViewerData[] => {
  const viewers = readViewers()
  return viewers[productId] || []
}

export const increaseView = (productId: string, userEmail: string, userName: string) => {
  const viewers = readViewers()
  const productViewers = viewers[productId] || []
  
  // Check if this user already viewed this product
  const hasViewed = productViewers.some(v => v.email === userEmail)
  
  if (!hasViewed) {
    // Add viewer
    productViewers.push({
      email: userEmail,
      name: userName,
      timestamp: Date.now()
    })
    viewers[productId] = productViewers
    writeViewers(viewers)
    
    // Increase view count
    const views = readViews()
    views[productId] = (views[productId] || 0) + 1
    writeViews(views)
  }
}
