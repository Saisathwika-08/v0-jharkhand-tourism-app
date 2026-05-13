import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your Firebase configuration - these will be environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase only once and only on the client
let app: any = null
let auth: any = null

if (typeof window !== "undefined") {
  // Check if Firebase app is already initialized
  if (getApps().length === 0) {
    // Validate that all required config values are present
    const missingConfigs = Object.entries(firebaseConfig)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    if (missingConfigs.length > 0) {
      console.error("[v0] Missing Firebase configuration:", missingConfigs)
      console.error(
        "[v0] Please ensure these environment variables are set in your Vercel project: ",
        missingConfigs.join(", ")
      )
    } else {
      console.log("[v0] Firebase config is valid, initializing...")
      try {
        app = initializeApp(firebaseConfig)
        auth = getAuth(app)
        console.log("[v0] Firebase initialized successfully")
      } catch (error) {
        console.error("[v0] Firebase initialization error:", error)
      }
    }
  } else {
    app = getApps()[0]
    auth = getAuth(app)
  }
}

export { app }
export { auth }

export default app
