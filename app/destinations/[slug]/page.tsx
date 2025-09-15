"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Camera, Navigation, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const destinations = {
  "pristine-waterfalls": {
    title: "Pristine Waterfalls",
    description:
      "Discover the breathtaking waterfalls of Jharkhand, where crystal-clear waters cascade down ancient rock formations.",
    image: "/beautiful-waterfall-in-forest.jpg",
    highlights: [
      "Hundru Falls - 98 meters high, 45km from Ranchi",
      "Dassam Falls - Multi-tiered waterfall, 40km from Ranchi",
      "Jonha Falls - Sacred waterfall with temple, 40km from Ranchi",
      "Hirni Falls - Hidden gem in Seraikela-Kharsawan",
      "Panchghagh Falls - Five-stream waterfall in Khunti",
    ],
    bestTime: "October to March",
    duration: "2-3 days",
    difficulty: "Easy to Moderate",
    locations: [
      {
        name: "Hundru Falls",
        distance: "45 km from Ranchi",
        coordinates: "23.4241° N, 85.5762° E",
        description: "The highest waterfall in Jharkhand, formed by the Subarnarekha River",
      },
      {
        name: "Dassam Falls",
        distance: "40 km from Ranchi",
        coordinates: "23.4667° N, 85.5833° E",
        description: "Multi-tiered waterfall perfect for photography and picnics",
      },
      {
        name: "Jonha Falls",
        distance: "40 km from Ranchi",
        coordinates: "23.4500° N, 85.5667° E",
        description: "Sacred waterfall with ancient Shiva temple at the base",
      },
    ],
  },
  "tribal-heritage": {
    title: "Tribal Heritage",
    description:
      "Experience the rich cultural tapestry of Jharkhand's indigenous communities, their traditions, festivals, and way of life.",
    image: "/tribal-dance-festival-colorful-traditional.jpg",
    highlights: [
      "Sarhul Festival - Worship of nature and trees",
      "Karma Festival - Celebration of harvest season",
      "Traditional Tribal Villages in Khunti and Gumla",
      "Tribal Museums in Ranchi showcasing artifacts",
      "Authentic tribal handicrafts and bamboo work",
    ],
    bestTime: "November to February",
    duration: "3-4 days",
    difficulty: "Easy",
    locations: [
      {
        name: "Tribal Research Institute",
        distance: "5 km from Ranchi center",
        coordinates: "23.3441° N, 85.3096° E",
        description: "Museum showcasing tribal culture, artifacts, and history",
      },
      {
        name: "Khunti Tribal Villages",
        distance: "40 km from Ranchi",
        coordinates: "23.0833° N, 85.2833° E",
        description: "Authentic tribal villages where you can experience traditional lifestyle",
      },
      {
        name: "Gumla Cultural Center",
        distance: "85 km from Ranchi",
        coordinates: "23.0500° N, 84.5333° E",
        description: "Center for tribal arts, crafts, and cultural performances",
      },
    ],
  },
  "dense-forests": {
    title: "Dense Forests",
    description:
      "Explore the pristine wilderness of Jharkhand's national parks and wildlife sanctuaries, home to tigers, elephants, and diverse flora.",
    image: "/dense-forest-wildlife-sanctuary-tigers.jpg",
    highlights: [
      "Betla National Park - Tigers, elephants, and leopards",
      "Palamau Tiger Reserve - One of India's first tiger reserves",
      "Hazaribagh Wildlife Sanctuary - Diverse bird species",
      "Dalma Wildlife Sanctuary - Elephant corridor",
      "Trekking trails through Sal and bamboo forests",
    ],
    bestTime: "November to April",
    duration: "2-4 days",
    difficulty: "Moderate",
    locations: [
      {
        name: "Betla National Park",
        distance: "150 km from Ranchi",
        coordinates: "23.9000° N, 84.2000° E",
        description: "Premier wildlife destination with tigers, elephants, and ancient fort ruins",
      },
      {
        name: "Palamau Tiger Reserve",
        distance: "170 km from Ranchi",
        coordinates: "24.0000° N, 84.0000° E",
        description: "Historic tiger reserve with diverse wildlife and scenic landscapes",
      },
      {
        name: "Hazaribagh Wildlife Sanctuary",
        distance: "90 km from Ranchi",
        coordinates: "24.0000° N, 85.3667° E",
        description: "Bird watcher's paradise with over 180 species of birds",
      },
    ],
  },
  "authentic-homestays": {
    title: "Authentic Homestays",
    description:
      "Stay with local tribal families and experience traditional Jharkhand hospitality, cuisine, and daily life.",
    image: "/traditional-tribal-house-homestay-village.jpg",
    highlights: [
      "Traditional mud houses with modern amenities",
      "Home-cooked tribal cuisine and local delicacies",
      "Participate in daily village activities",
      "Learn traditional crafts and farming techniques",
      "Evening cultural programs and folk music",
    ],
    bestTime: "October to March",
    duration: "2-5 days",
    difficulty: "Easy",
    locations: [
      {
        name: "Netarhat Homestays",
        distance: "150 km from Ranchi",
        coordinates: "23.4667° N, 84.2667° E",
        description: "Hill station homestays with sunrise views and tribal hospitality",
      },
      {
        name: "Khunti Village Homestays",
        distance: "40 km from Ranchi",
        coordinates: "23.0833° N, 85.2833° E",
        description: "Authentic tribal village experience with traditional houses",
      },
      {
        name: "Gumla Forest Homestays",
        distance: "85 km from Ranchi",
        coordinates: "23.0500° N, 84.5333° E",
        description: "Forest-edge homestays perfect for nature lovers and bird watching",
      },
    ],
  },
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = destinations[params.slug as keyof typeof destinations]

  if (!destination) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">{destination.title}</h1>
              <p className="text-xl text-emerald-700 text-pretty leading-relaxed max-w-3xl mx-auto">
                {destination.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {destination.duration}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                {destination.difficulty}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                {destination.bestTime}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">What to Expect</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {destination.highlights.map((highlight, index) => (
              <Card key={index} className="border-emerald-100">
                <CardContent className="p-4">
                  <p className="text-emerald-700 flex items-start gap-2">
                    <Star className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    {highlight}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">Key Locations</h2>
          <div className="space-y-6">
            {destination.locations.map((location, index) => (
              <Card key={index} className="border-emerald-100">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-emerald-800 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        {location.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Navigation className="w-4 h-4" />
                        {location.distance}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://maps.google.com/?q=${location.coordinates}`, "_blank")}
                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      View Map
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-700 mb-2">{location.description}</p>
                  <p className="text-sm text-emerald-600">
                    <strong>Coordinates:</strong> {location.coordinates}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 px-4 bg-emerald-900 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-emerald-200 mb-8 text-lg">
            Plan your visit to {destination.title} with our AI trip planner or book a verified guide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trip-planner">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                Plan Your Trip
              </Button>
            </Link>
            <Link href="/guides">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-900 px-8 bg-transparent"
              >
                Find a Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
