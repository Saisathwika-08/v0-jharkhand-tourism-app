"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Languages, Volume2, Copy, RotateCcw } from "lucide-react"

export default function TranslatePage() {
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [fromLanguage, setFromLanguage] = useState("en")
  const [toLanguage, setToLanguage] = useState("hi")
  const [isTranslating, setIsTranslating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "bho", name: "Bhojpuri" },
    { code: "mag", name: "Magahi" },
    { code: "mai", name: "Maithili" },
    { code: "kha", name: "Kharia" },
    { code: "ho", name: "Ho" },
    { code: "mun", name: "Mundari" },
    { code: "sat", name: "Santali" },
    { code: "kur", name: "Kurukh" },
  ]

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          from: fromLanguage,
          to: toLanguage,
        }),
      })

      const data = await response.json()
      setTranslatedText(data.translatedText)
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleSpeak = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "en" ? "en-US" : "hi-IN"
      utterance.onend = () => setIsPlaying(false)
      speechSynthesis.speak(utterance)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const swapLanguages = () => {
    setFromLanguage(toLanguage)
    setToLanguage(fromLanguage)
    setInputText(translatedText)
    setTranslatedText(inputText)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4 flex items-center justify-center gap-3">
            <Languages className="h-8 w-8 text-orange-600" />
            Language Translator
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Translate to local Jharkhand languages with voice support for better communication
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Translate Text</CardTitle>
              <CardDescription>
                Communicate effectively with local communities in their native languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Language Selection */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Select value={fromLanguage} onValueChange={setFromLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" size="sm" onClick={swapLanguages} className="px-3 bg-transparent">
                    <RotateCcw className="h-4 w-4" />
                  </Button>

                  <div className="flex-1">
                    <Select value={toLanguage} onValueChange={setToLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Translation Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-emerald-900">
                        {languages.find((l) => l.code === fromLanguage)?.name}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSpeak(inputText, fromLanguage)}
                          disabled={!inputText || isPlaying}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(inputText)} disabled={!inputText}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Enter text to translate..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  {/* Output */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-emerald-900">
                        {languages.find((l) => l.code === toLanguage)?.name}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSpeak(translatedText, toLanguage)}
                          disabled={!translatedText || isPlaying}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(translatedText)}
                          disabled={!translatedText}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Translation will appear here..."
                      value={translatedText}
                      readOnly
                      rows={6}
                      className="resize-none bg-gray-50"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || isTranslating}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  {isTranslating ? "Translating..." : "Translate"}
                </Button>

                {/* Common Phrases */}
                <div className="mt-8">
                  <h3 className="font-medium text-emerald-900 mb-4">Common Travel Phrases</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Hello, how are you?",
                      "Thank you very much",
                      "Where is the nearest hospital?",
                      "Can you help me?",
                      "How much does this cost?",
                      "Where is the bathroom?",
                    ].map((phrase) => (
                      <Button
                        key={phrase}
                        variant="outline"
                        className="justify-start text-left h-auto p-3 bg-transparent"
                        onClick={() => setInputText(phrase)}
                      >
                        {phrase}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
