import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type FirebaseError,
} from "firebase/auth"
import { auth } from "./client"

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const fbError = error as FirebaseError
    switch (fbError.code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please sign in instead."
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters."
      case "auth/invalid-email":
        return "Invalid email address. Please check and try again."
      case "auth/user-not-found":
        return "No account found with this email. Please sign up first."
      case "auth/wrong-password":
        return "Incorrect password. Please try again."
      case "auth/too-many-requests":
        return "Too many login attempts. Please try again later."
      default:
        return fbError.message || "Authentication failed. Please try again."
    }
  }
  return "Authentication failed. Please try again."
}

export async function signUp(email: string, password: string): Promise<AuthUser> {
  if (!auth || !email || !password) {
    const missing = []
    if (!auth) missing.push("Firebase")
    if (!email) missing.push("Email")
    if (!password) missing.push("Password")
    throw new Error(`${missing.join(", ")} is missing. Please check and try again.`)
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    }
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  if (!auth || !email || !password) {
    const missing = []
    if (!auth) missing.push("Firebase")
    if (!email) missing.push("Email")
    if (!password) missing.push("Password")
    throw new Error(`${missing.join(", ")} is missing. Please check and try again.`)
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    }
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error))
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
