import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth"
import { auth } from "./client"

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

export async function signUp(email: string, password: string): Promise<AuthUser> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    }
  } catch (error) {
    throw error
  }
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    }
  } catch (error) {
    throw error
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser
}
