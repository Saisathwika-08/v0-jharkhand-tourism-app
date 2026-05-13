import { connectToDatabase } from "@/lib/mongodb"
import { auth } from "@/lib/firebase/client"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define Booking schema interface
interface Booking {
  _id?: string
  userId: string
  destination: string
  startDate: string
  endDate: string
  guides: string[]
  homestays: string[]
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

// GET: Fetch user's bookings
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement proper Firebase auth verification
    // const token = request.headers.get('Authorization')?.split('Bearer ')[1]

    const db = await connectToDatabase()

    // Get bookings collection
    const bookingsCollection = db.collection<Booking>("bookings")
    const bookings = await bookingsCollection.find({}).toArray()

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("[v0] GET /api/bookings error:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

// POST: Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Validate Firebase auth token

    if (!body.userId || !body.destination) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const db = await connectToDatabase()
    const bookingsCollection = db.collection<Booking>("bookings")

    const newBooking: Booking = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await bookingsCollection.insertOne(newBooking)

    return NextResponse.json(
      { ...newBooking, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] POST /api/bookings error:", error)
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    )
  }
}
