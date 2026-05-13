import { auth } from "./firebase/client"

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>
}

/**
 * Centralized API client with Firebase authentication
 */
export async function apiClient(
  endpoint: string,
  options: RequestOptions = {}
) {
  const { headers = {}, ...restOptions } = options

  // Get Firebase auth token
  let authHeader = {}
  try {
    const token = await auth.currentUser?.getIdToken()
    if (token) {
      authHeader = {
        Authorization: `Bearer ${token}`,
      }
    }
  } catch (error) {
    console.error("[v0] Failed to get auth token:", error)
  }

  const response = await fetch(endpoint, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(error.message || `API Error: ${response.status}`)
  }

  return response.json()
}

/**
 * Fetch with automatic JSON parsing and error handling
 */
export async function get<T>(endpoint: string): Promise<T> {
  return apiClient(endpoint, {
    method: "GET",
  })
}

/**
 * POST request with JSON body
 */
export async function post<T>(endpoint: string, data: unknown): Promise<T> {
  return apiClient(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

/**
 * PUT request with JSON body
 */
export async function put<T>(endpoint: string, data: unknown): Promise<T> {
  return apiClient(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string): Promise<T> {
  return apiClient(endpoint, {
    method: "DELETE",
  })
}
