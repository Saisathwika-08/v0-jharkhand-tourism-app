import { useCallback, useState } from "react"
import { get } from "@/lib/api-client"

export interface Guide {
  _id?: string
  name: string
  email: string
  phone: string
  specializations: string[]
  languages: string[]
  rating: number
  reviews: number
  available: boolean
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Hook for fetching and managing guides
 */
export function useGuides() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getGuides = useCallback(async (filters?: Record<string, unknown>): Promise<Guide[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, String(value))
          }
        })
      }

      const url = `/api/guides${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
      const guides = await get<Guide[]>(url)
      return guides
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch guides"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getGuideById = useCallback(async (guideId: string): Promise<Guide> => {
    setIsLoading(true)
    setError(null)
    try {
      const guide = await get<Guide>(`/api/guides/${guideId}`)
      return guide
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch guide"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    getGuides,
    getGuideById,
    isLoading,
    error,
  }
}
