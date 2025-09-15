"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Sparkles, Languages, Shield, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const supabase = createClient()

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-orange-50 flex items-center justify-center">
        <div className="text-emerald-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-orange-50">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-emerald-900 mb-2">
                Welcome back, {user?.user_metadata?.full_name || "Explorer"}!
              </h1>
              <p className="text-emerald-700">Ready to discover more of Jharkhand?</p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-800">Plan New Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600 text-center mb-4">Use AI to create personalized itineraries</p>
                <Link href="/trip-planner">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Planning</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">Find Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-600 text-center mb-4">Connect with verified local guides</p>
                <Link href="/guides">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Browse Guides</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Languages className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-800">Translate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600 text-center mb-4">Communicate in local tribal languages</p>
                <Link href="/translate">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Translating</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Explore Destinations */}
      <section className="py-8 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Explore Destinations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/destinations/pristine-waterfalls">
              <Card className="border-emerald-100 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <img
                    src="/beautiful-waterfall-in-forest.jpg"
                    alt="Pristine Waterfalls"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-emerald-800 text-lg">Pristine Waterfalls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-600 text-center text-sm">Hundru, Dassam, and Jonha Falls</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/destinations/tribal-heritage">
              <Card className="border-orange-100 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <img
                    src="/tribal-dance-festival-colorful-traditional.jpg"
                    alt="Tribal Heritage"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-orange-800 text-lg">Tribal Heritage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-600 text-center text-sm">Authentic culture and festivals</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/destinations/dense-forests">
              <Card className="border-emerald-100 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <img
                    src="/dense-forest-wildlife-sanctuary-tigers.jpg"
                    alt="Dense Forests"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-emerald-800 text-lg">Dense Forests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-600 text-center text-sm">Betla and Palamau reserves</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/destinations/authentic-homestays">
              <Card className="border-orange-100 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <img
                    src="/traditional-tribal-house-homestay-village.jpg"
                    alt="Authentic Homestays"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-orange-800 text-lg">Authentic Homestays</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-600 text-center text-sm">Traditional hospitality</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Getting Started</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Plan Your First Trip
                </CardTitle>
                <CardDescription>Use our AI trip planner to create your perfect Jharkhand itinerary</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/trip-planner">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Connect with Locals
                </CardTitle>
                <CardDescription>Find verified guides and book authentic homestays</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Link href="/guides">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      Find Guides
                    </Button>
                  </Link>
                  <Link href="/bookings">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      Book Stay
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-8 px-4 bg-red-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-red-800 mb-6">Emergency Contacts</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl">
            <Card className="border-red-200 bg-white">
              <CardContent className="p-3 text-center">
                <p className="font-semibold text-red-800 text-sm">Police</p>
                <p className="text-red-600 font-mono">#100</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-white">
              <CardContent className="p-3 text-center">
                <p className="font-semibold text-red-800 text-sm">Ambulance</p>
                <p className="text-red-600 font-mono">*108</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-white">
              <CardContent className="p-3 text-center">
                <p className="font-semibold text-red-800 text-sm">Fire</p>
                <p className="text-red-600 font-mono">&101</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-white">
              <CardContent className="p-3 text-center">
                <p className="font-semibold text-red-800 text-sm">Tourist Help</p>
                <p className="text-red-600 font-mono">@1363</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-white">
              <CardContent className="p-3 text-center">
                <p className="font-semibold text-red-800 text-sm">She Team</p>
                <p className="text-red-600 font-mono">#181</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
