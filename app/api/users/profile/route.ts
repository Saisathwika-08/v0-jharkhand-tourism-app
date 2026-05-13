import { connectToDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define UserProfile schema interface
interface UserProfile {
  _id?: string
  firebaseUid: string
  email: string
  fullName: string
  phone: string
  profileImage?: string
  bio?: string
  address?: string
  preferences?: {
    languages: string[]
    interests: string[]
  }
  createdAt: Date
  updatedAt: Date
}

// GET: Fetch user profile
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "userId parameter is required" },
        { status: 400 }
      )
    }

    const db = await connectToDatabase()
    const profilesCollection = db.collection<UserProfile>("userProfiles")

    const profile = await profilesCollection.findOne({ firebaseUid: userId })

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("[v0] GET /api/users/profile error:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}

// PUT: Update or create user profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.firebaseUid) {
      return NextResponse.json(
        { error: "firebaseUid is required" },
        { status: 400 }
      )
    }

    const db = await connectToDatabase()
    const profilesCollection = db.collection<UserProfile>("userProfiles")

    const profile: UserProfile = {
      ...body,
      updatedAt: new Date(),
    }

    const result = await profilesCollection.findOneAndUpdate(
      { firebaseUid: body.firebaseUid },
      { $set: profile },
      { upsert: true, returnDocument: "after" }
    )

    return NextResponse.json(result.value || profile)
  } catch (error) {
    console.error("[v0] PUT /api/users/profile error:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
}
