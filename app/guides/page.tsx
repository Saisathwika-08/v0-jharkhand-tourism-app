"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Phone, Mail, Languages, Shield, Search } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface Guide {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  languages: string[]
  experience_years: number
  rating: number
  location: string
  bio: string
  verified: boolean
  price_per_day: number
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([])
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuides()
  }, [])

  useEffect(() => {
    filterGuides()
  }, [guides, searchTerm, locationFilter, specialtyFilter])

  const fetchGuides = async () => {
    try {
      const { data, error } = await supabase
        .from("guides")
        .select("*")
        .eq("verified", true)
        .order("rating", { ascending: false })

      if (error) throw error
      setGuides(data || [])
    } catch (error) {
      console.error("Error fetching guides:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterGuides = () => {
    let filtered = guides

    if (searchTerm) {
      filtered = filtered.filter(
        (guide) =>
          guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guide.bio.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (locationFilter !== "All Locations") {
      filtered = filtered.filter((guide) => guide.location === locationFilter)
    }

    if (specialtyFilter !== "All Specialties") {
      filtered = filtered.filter((guide) => guide.specialties.includes(specialtyFilter))
    }

    setFilteredGuides(filtered)
  }

  const handleBookGuide = async (guideId: string) => {
    // This would typically open a booking modal or redirect to booking page
    console.log("Booking guide:", guideId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-700">Loading verified guides...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4 flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-orange-600" />
            Verified Local Guides
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Connect with background-verified local guides for authentic Jharkhand experiences
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-emerald-200">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search guides..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Locations">All Locations</SelectItem>
                    <SelectItem value="Ranchi">Ranchi</SelectItem>
                    <SelectItem value="Netarhat">Netarhat</SelectItem>
                    <SelectItem value="Betla">Betla</SelectItem>
                    <SelectItem value="Jamshedpur">Jamshedpur</SelectItem>
                    <SelectItem value="Deoghar">Deoghar</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Specialties">All Specialties</SelectItem>
                    <SelectItem value="Cultural Tours">Cultural Tours</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Wildlife">Wildlife</SelectItem>
                    <SelectItem value="Tribal Heritage">Tribal Heritage</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="border-emerald-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={`/placeholder-bsx29.png?key=1usmd&height=48&width=48&query=guide+${guide.name}`}
                      />
                      <AvatarFallback>
                        {guide.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-emerald-900 flex items-center gap-2">
                        {guide.name}
                        {guide.verified && <Shield className="h-4 w-4 text-emerald-600" />}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {guide.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{guide.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{guide.bio}</p>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {guide.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <Languages className="h-3 w-3" />
                      Languages
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {guide.languages.map((language) => (
                        <Badge key={language} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="text-sm font-medium">{guide.experience_years} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Rate</p>
                      <p className="text-sm font-medium">₹{guide.price_per_day}/day</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleBookGuide(guide.id)}
                  >
                    Book Guide
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                    <Mail className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No guides found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
