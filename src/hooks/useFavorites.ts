import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'weather-vn:favorites'

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    // localStorage bị chặn (chế độ riêng tư…) hoặc dữ liệu hỏng
    return []
  }
}

/** Danh sách id thành phố yêu thích, đồng bộ với localStorage */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Không lưu được thì vẫn dùng state trong phiên hiện tại
    }
  }, [favorites])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  return { favorites, toggleFavorite }
}
