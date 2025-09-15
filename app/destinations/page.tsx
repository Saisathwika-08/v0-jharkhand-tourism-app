import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Star } from "lucide-react"
import Link from "next/link"

const destinations = [
  {
    slug: "pristine-waterfalls",
    title: "Pristine Waterfalls",
    description: "Discover breathtaking waterfalls cascading down ancient rock formations",
    image: "/beautiful-waterfall-in-forest.jpg",
    highlights: ["Hundru Falls", "Dassam Falls", "Jonha Falls"],
    duration: "2-3 days",
    difficulty: "Easy to Moderate",
  },
  {
    slug: "tribal-heritage",
    title: "Tribal Heritage",
    description: "Experience rich cultural tapestry of indigenous communities",
    image: "/tribal-dance-festival-colorful-traditional.jpg",
    highlights: ["Sarhul Festival", "Traditional Villages", "Tribal Museums"],
    duration: "3-4 days",
    difficulty: "Easy",
  },
  {
    slug: "dense-forests",
    title: "Dense Forests",
    description: "Explore pristine wilderness and wildlife sanctuaries",
    image: "/dense-forest-wildlife-sanctuary-tigers.jpg",
    highlights: ["Betla National Park", "Palamau Tiger Reserve", "Wildlife Safari"],
    duration: "2-4 days",
    difficulty: "Moderate",
  },
  {
    slug: "authentic-homestays",
    title: "Authentic Homestays",
    description: "Stay with local families and experience traditional hospitality",
    image: "/traditional-tribal-house-homestay-village.jpg",
    highlights: ["Traditional Houses", "Local Cuisine", "Cultural Programs"],
    duration: "2-5 days",
    difficulty: "Easy",
  },
]

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
            Explore Jharkhand's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">
              Hidden Gems
            </span>
          </h1>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto text-pretty leading-relaxed">
            From cascading waterfalls to ancient tribal traditions, discover the diverse landscapes and rich cultural
            heritage that make Jharkhand truly special.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {destinations.map((destination) => (
              <Card
                key={destination.slug}
                className="border-emerald-100 hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="aspect-video relative">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-emerald-900">{destination.title}</CardTitle>
                  <CardDescription className="text-emerald-700 text-base">{destination.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, index) => (
                        <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-emerald-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {destination.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {destination.difficulty}
                      </div>
                    </div>

                    <Link href={`/destinations/${destination.slug}`}>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
                        Explore Destination
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-emerald-900 text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-emerald-200 mb-8 text-lg">
            Let our AI trip planner create the perfect itinerary for your Jharkhand adventure
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
