import { useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase/client"

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

/**
 * Hook for managing Firebase authentication state
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser>({
    uid: "",
    email: null,
    displayName: null,
    photoURL: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          isLoading: false,
          isAuthenticated: true,
        })
      } else {
        setUser({
          uid: "",
          email: null,
          displayName: null,
          photoURL: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return user
}
