"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Users, Sparkles, Loader2 } from "lucide-react"

export default function TripPlannerPage() {
  const [formData, setFormData] = useState({
    duration: "",
    budget: "",
    interests: "",
    groupSize: "",
    travelStyle: "",
  })
  const [tripPlan, setTripPlan] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/trip-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setTripPlan(data.plan)
    } catch (error) {
      console.error("Error generating trip plan:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-orange-600" />
            AI Trip Planner
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Let our AI create a personalized itinerary for your Jharkhand adventure
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Plan Your Journey</CardTitle>
              <CardDescription>Tell us about your travel preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Duration (days)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="30"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="groupSize" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Group Size
                    </Label>
                    <Input
                      id="groupSize"
                      type="number"
                      min="1"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range (₹)</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget (₹5,000-15,000)</SelectItem>
                      <SelectItem value="mid-range">Mid-range (₹15,000-30,000)</SelectItem>
                      <SelectItem value="luxury">Luxury (₹30,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="travelStyle">Travel Style</Label>
                  <Select
                    value={formData.travelStyle}
                    onValueChange={(value) => setFormData({ ...formData, travelStyle: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure & Nature</SelectItem>
                      <SelectItem value="cultural">Cultural & Heritage</SelectItem>
                      <SelectItem value="relaxed">Relaxed & Scenic</SelectItem>
                      <SelectItem value="family">Family Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="interests">Special Interests</Label>
                  <Textarea
                    id="interests"
                    placeholder="e.g., waterfalls, tribal culture, wildlife, temples, adventure sports..."
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Your Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Trip Plan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {tripPlan && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Your Personalized Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-emerald max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{tripPlan}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
