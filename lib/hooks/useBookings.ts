import { useCallback, useState } from "react"
import { get, post, del } from "@/lib/api-client"

export interface Booking {
  _id?: string
  userId: string
  destination: string
  startDate: string
  endDate: string
  guides: string[]
  homestays: string[]
  status: "pending" | "confirmed" | "cancelled"
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Hook for managing user bookings
 */
export function useBookings() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getBookings = useCallback(async (): Promise<Booking[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const bookings = await get<Booking[]>("/api/bookings")
      return bookings
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch bookings"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createBooking = useCallback(async (booking: Omit<Booking, "_id">) => {
    setIsLoading(true)
    setError(null)
    try {
      const newBooking = await post<Booking>("/api/bookings", booking)
      return newBooking
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create booking"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateBooking = useCallback(async (bookingId: string, updates: Partial<Booking>) => {
    setIsLoading(true)
    setError(null)
    try {
      const updated = await put<Booking>(`/api/bookings/${bookingId}`, updates)
      return updated
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update booking"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteBooking = useCallback(async (bookingId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await del(`/api/bookings/${bookingId}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete booking"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    isLoading,
    error,
  }
}

// Add missing import
import { put } from "@/lib/api-client"
