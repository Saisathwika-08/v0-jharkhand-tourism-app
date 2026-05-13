import { connectToDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define Guide schema interface
interface Guide {
  _id?: string
  name: string
  email: string
  phone: string
  specializations: string[]
  languages: string[]
  rating: number
  reviews: number
  available: boolean
  createdAt: Date
  updatedAt: Date
}

// GET: Fetch guides with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const specialization = searchParams.get("specialization")
    const language = searchParams.get("language")
    const available = searchParams.get("available") === "true"

    const db = await connectToDatabase()
    const guidesCollection = db.collection<Guide>("guides")

    // Build filter query
    const filter: Record<string, unknown> = {}
    if (specialization) {
      filter.specializations = { $in: [specialization] }
    }
    if (language) {
      filter.languages = { $in: [language] }
    }
    if (available) {
      filter.available = true
    }

    const guides = await guidesCollection
      .find(filter)
      .sort({ rating: -1 })
      .toArray()

    return NextResponse.json(guides)
  } catch (error) {
    console.error("[v0] GET /api/guides error:", error)
    return NextResponse.json(
      { error: "Failed to fetch guides" },
      { status: 500 }
    )
  }
}

// POST: Create a new guide (admin only - TODO: add auth check)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const db = await connectToDatabase()
    const guidesCollection = db.collection<Guide>("guides")

    const newGuide: Guide = {
      ...body,
      rating: body.rating || 0,
      reviews: body.reviews || 0,
      available: body.available !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await guidesCollection.insertOne(newGuide)

    return NextResponse.json(
      { ...newGuide, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] POST /api/guides error:", error)
    return NextResponse.json(
      { error: "Failed to create guide" },
      { status: 500 }
    )
  }
}
