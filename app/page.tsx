"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Users, Mountain, TreePine, Waves, Building2, Sparkles, Languages, Shield } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/contexts/translation-context"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-orange-50">
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-32 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-jharkhand.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg">{t("home.title")}</h2>
            <p className="text-2xl text-white mb-8 text-pretty leading-relaxed drop-shadow-md">{t("home.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trip-planner">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t("home.planTrip")}
                </Button>
              </Link>
              <Link href="/bookings">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-3 bg-white/20 backdrop-blur-sm"
                >
                  {t("common.bookNow")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-emerald-900 mb-4">{t("home.exploreDestinations")}</h3>
            <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
              From ancient tribal cultures to modern eco-tourism, discover what makes Jharkhand unique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/destinations/pristine-waterfalls">
              <Card className="border-emerald-100 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full flex flex-col">
                <div 
                  className="h-40 bg-cover bg-center relative"
                  style={{
                    backgroundImage: "url('/waterfall-jh.jpg')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Waves className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-emerald-800">{t("destinations.waterfalls")}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-emerald-600 text-center">{t("destinations.waterfalls.desc")}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/destinations/tribal-heritage">
              <Card className="border-orange-100 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full flex flex-col">
                <div 
                  className="h-40 bg-cover bg-center relative"
                  style={{
                    backgroundImage: "url('/tribal-jh.jpg')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-800">{t("destinations.heritage")}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-orange-600 text-center">{t("destinations.heritage.desc")}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/destinations/dense-forests">
              <Card className="border-emerald-100 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full flex flex-col">
                <div 
                  className="h-40 bg-cover bg-center relative"
                  style={{
                    backgroundImage: "url('/hero-jharkhand.jpg')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TreePine className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-emerald-800">{t("destinations.forests")}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-emerald-600 text-center">{t("destinations.forests.desc")}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/destinations/authentic-homestays">
              <Card className="border-orange-100 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full flex flex-col">
                <div 
                  className="h-40 bg-cover bg-center relative"
                  style={{
                    backgroundImage: "url('/tribal-jh.jpg')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-800">{t("destinations.homestays")}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-orange-600 text-center">{t("destinations.homestays.desc")}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-emerald-900 mb-4">{t("smartTourism.title")}</h3>
            <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
              Advanced technology to enhance your Jharkhand experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-800">{t("smartTourism.aiTripPlanner")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600 text-center mb-4">
                  Get personalized itineraries based on your preferences and interests
                </p>
                <Link href="/trip-planner">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {t("smartTourism.planYourTrip")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Languages className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">{t("smartTourism.languageTranslator")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-600 text-center mb-4">
                  Communicate in local tribal languages with voice translation
                </p>
                <Link href="/translate">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    {t("smartTourism.startTranslating")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-800">{t("smartTourism.verifiedGuides")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600 text-center mb-4">
                  Connect with background-verified local guides for safe experiences
                </p>
                <Link href="/guides">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">{t("smartTourism.findGuides")}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 px-4 bg-red-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-red-800 mb-4">{t("emergency.title")}</h3>
            <p className="text-red-600 text-lg">{t("emergency.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <Card className="border-red-200 bg-white">
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="font-semibold text-red-800">{t("emergency.police")}</p>
                <p className="text-red-600">#100</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="font-semibold text-red-800">{t("emergency.medical")}</p>
                <p className="text-red-600">*108</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="font-semibold text-red-800">{t("emergency.fire")}</p>
                <p className="text-red-600">&101</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="font-semibold text-red-800">{t("emergency.tourist")}</p>
                <p className="text-red-600">@1363</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="font-semibold text-red-800">She Team</p>
                <p className="text-red-600">#181</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Employment Opportunities */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-emerald-900 mb-4">{t("employment.title")}</h3>
            <p className="text-emerald-700 text-lg max-w-2xl mx-auto">{t("employment.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-800">{t("employment.tourismGuideTraining")}</CardTitle>
                <CardDescription>{t("employment.tourismGuideTraining.duration")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">{t("employment.tourismGuideTraining.fee")}</Badge>
                  <p className="text-sm text-emerald-600">{t("employment.tourismGuideTraining.description")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-orange-800">{t("employment.handicraftTraining")}</CardTitle>
                <CardDescription>{t("employment.handicraftTraining.duration")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">{t("employment.handicraftTraining.fee")}</Badge>
                  <p className="text-sm text-orange-600">{t("employment.handicraftTraining.description")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-800">{t("employment.homestayManagement")}</CardTitle>
                <CardDescription>{t("employment.homestayManagement.duration")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">{t("employment.homestayManagement.fee")}</Badge>
                  <p className="text-sm text-emerald-600">{t("employment.homestayManagement.description")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Traditional Cuisines Section */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-orange-900 mb-4">{t("cuisines.title")}</h3>
            <p className="text-orange-700 text-lg max-w-2xl mx-auto">{t("cuisines.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img src="/traditional-rice-dish.jpg" alt="Dhuska" className="w-10 h-10 rounded" />
                </div>
                <CardTitle className="text-orange-800">{t("cuisines.dhuska")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-600 text-center text-sm">{t("cuisines.dhuska.desc")}</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img src="/traditional-meat-curry.jpg" alt="Mutton Curry" className="w-10 h-10 rounded" />
                </div>
                <CardTitle className="text-emerald-800">{t("cuisines.koinarDaal")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600 text-center text-sm">{t("cuisines.koinarDaal.desc")}</p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img src="/traditional-sweet-dish.jpg" alt="Pittha" className="w-10 h-10 rounded" />
                </div>
                <CardTitle className="text-orange-800">{t("cuisines.pittha")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-600 text-center text-sm">{t("cuisines.pittha.desc")}</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img src="/traditional-vegetable-dish.jpg" alt="Rugra" className="w-10 h-10 rounded" />
                </div>
                <CardTitle className="text-emerald-800">{t("cuisines.rugra")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600 text-center text-sm">{t("cuisines.rugra.desc")}</p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img src="/traditional-drink.jpg" alt="Handia" className="w-10 h-10 rounded" />
                </div>
                <CardTitle className="text-orange-800">{t("cuisines.handia")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-600 text-center text-sm">{t("cuisines.handia.desc")}</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img src="/traditional-snack.png" alt="Chilka Roti" className="w-10 h-10 rounded" />
                </div>
                <CardTitle className="text-emerald-800">{t("cuisines.chilkaRoti")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600 text-center text-sm">{t("cuisines.chilkaRoti.desc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-orange-400 rounded-lg flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold">{t("footer.jharkhandTourism")}</h4>
              </div>
              <p className="text-emerald-200 text-sm">{t("footer.discover")}</p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">{t("footer.explore")}</h5>
              <ul className="space-y-2 text-sm text-emerald-200">
                <li>
                  <Link href="/trip-planner" className="hover:text-white">
                    {t("footer.tripPlanner")}
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-white">
                    {t("footer.guides")}
                  </Link>
                </li>
                <li>
                  <Link href="/bookings" className="hover:text-white">
                    {t("footer.bookings")}
                  </Link>
                </li>
                <li>
                  <Link href="/translate" className="hover:text-white">
                    {t("footer.translate")}
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/pristine-waterfalls" className="hover:text-white">
                    {t("footer.pristineWaterfalls")}
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/tribal-heritage" className="hover:text-white">
                    {t("footer.tribalHeritage")}
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/dense-forests" className="hover:text-white">
                    {t("footer.denseForests")}
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/authentic-homestays" className="hover:text-white">
                    {t("footer.authenticHomestays")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">{t("footer.services")}</h5>
              <ul className="space-y-2 text-sm text-emerald-200">
                <li>
                  <Link href="/trip-planner" className="hover:text-white">
                    {t("footer.aiTripPlanner")}
                  </Link>
                </li>
                <li>
                  <Link href="/translate" className="hover:text-white">
                    {t("footer.languageTranslation")}
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-white">
                    {t("footer.verifiedGuides")}
                  </Link>
                </li>
                <li>
                  <Link href="/bookings" className="hover:text-white">
                    {t("footer.bookExperiences")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">{t("footer.contact")}</h5>
              <ul className="space-y-2 text-sm text-emerald-200">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{t("footer.touristHelpline")}: @1363</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t("footer.location")}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-sm text-emerald-200">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
