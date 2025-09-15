import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { duration, budget, interests, groupSize, travelStyle } = await request.json()

    const prompt = `Create a detailed ${duration}-day travel itinerary for Jharkhand, India for ${groupSize} people with a ${budget} budget and ${travelStyle} travel style. 

Key interests: ${interests}

Include:
- Day-by-day detailed itinerary
- Must-visit destinations like Netarhat, Betla National Park, Hundru Falls, Ranchi, Jamshedpur
- Local tribal culture experiences
- Traditional cuisine recommendations
- Accommodation suggestions
- Transportation tips
- Budget breakdown
- Emergency contacts and safety tips
- Best time to visit each location
- Cultural etiquette and local customs

Focus on authentic Jharkhand experiences including tribal heritage, waterfalls, forests, and local festivals. Make it practical and actionable.`

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
      maxTokens: 2000,
    })

    return NextResponse.json({ plan: text })
  } catch (error) {
    console.error("Error generating trip plan:", error)
    return NextResponse.json({ error: "Failed to generate trip plan" }, { status: 500 })
  }
}
