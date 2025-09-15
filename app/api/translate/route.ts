import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json()

    // For demo purposes, we'll use a simple translation mapping
    // In production, you would integrate with Google Translate API
    const translations: Record<string, Record<string, string>> = {
      en: {
        hi: "नमस्ते, आप कैसे हैं?",
        bho: "नमस्कार, कइसन बानी?",
        mag: "नमस्कार, कैसे छी?",
        mai: "नमस्कार, कोना छी?",
        ho: "Johar, chisim menaka?",
        sat: "Johar, chisim menakanme?",
      },
    }

    // Simple demo translation - in production use Google Translate API
    let translatedText = text
    if (translations[from] && translations[from][to]) {
      translatedText = translations[from][to]
    } else {
      // Fallback to indicating translation would happen
      translatedText = `[Translated to ${to}]: ${text}`
    }

    return NextResponse.json({ translatedText })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}
