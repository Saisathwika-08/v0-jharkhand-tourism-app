"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Phone, Mail, CheckCircle } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function BookingsPage() {
  const [bookingData, setBookingData] = useState({
    service_type: "",
    destination: "",
    check_in: "",
    check_out: "",
    guests: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    special_requests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          ...bookingData,
          user_id: user?.id,
          status: "pending",
        },
      ])

      if (error) throw error

      setShowSuccess(true)
      setBookingData({
        service_type: "",
        destination: "",
        check_in: "",
        check_out: "",
        guests: "",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        special_requests: "",
      })
    } catch (error) {
      console.error("Error creating booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">Booking Confirmed!</h2>
            <p className="text-emerald-700 mb-4">
              Your booking request has been submitted successfully. We'll contact you within 24 hours.
            </p>
            <Button onClick={() => setShowSuccess(false)} className="bg-emerald-600 hover:bg-emerald-700">
              Make Another Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">Book Your Experience</h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Reserve homestays, guided tours, and authentic Jharkhand experiences
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Booking Details</CardTitle>
              <CardDescription>Fill in your travel requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="service_type">Service Type</Label>
                  <Select
                    value={bookingData.service_type}
                    onValueChange={(value) => setBookingData({ ...bookingData, service_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homestay">Tribal Homestay</SelectItem>
                      <SelectItem value="guided_tour">Guided Tour</SelectItem>
                      <SelectItem value="cultural_experience">Cultural Experience</SelectItem>
                      <SelectItem value="adventure_package">Adventure Package</SelectItem>
                      <SelectItem value="festival_tour">Festival Tour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Destination
                  </Label>
                  <Select
                    value={bookingData.destination}
                    onValueChange={(value) => setBookingData({ ...bookingData, destination: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="netarhat">Netarhat</SelectItem>
                      <SelectItem value="betla">Betla National Park</SelectItem>
                      <SelectItem value="hundru_falls">Hundru Falls</SelectItem>
                      <SelectItem value="ranchi">Ranchi</SelectItem>
                      <SelectItem value="jamshedpur">Jamshedpur</SelectItem>
                      <SelectItem value="deoghar">Deoghar</SelectItem>
                      <SelectItem value="hazaribagh">Hazaribagh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="check_in" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Check-in Date
                    </Label>
                    <Input
                      id="check_in"
                      type="date"
                      value={bookingData.check_in}
                      onChange={(e) => setBookingData({ ...bookingData, check_in: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="check_out">Check-out Date</Label>
                    <Input
                      id="check_out"
                      type="date"
                      value={bookingData.check_out}
                      onChange={(e) => setBookingData({ ...bookingData, check_out: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Number of Guests
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_name">Full Name</Label>
                    <Input
                      id="contact_name"
                      value={bookingData.contact_name}
                      onChange={(e) => setBookingData({ ...bookingData, contact_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="contact_phone"
                      type="tel"
                      value={bookingData.contact_phone}
                      onChange={(e) => setBookingData({ ...bookingData, contact_phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact_email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={bookingData.contact_email}
                    onChange={(e) => setBookingData({ ...bookingData, contact_email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="special_requests">Special Requests</Label>
                  <Textarea
                    id="special_requests"
                    placeholder="Any dietary restrictions, accessibility needs, or special preferences..."
                    value={bookingData.special_requests}
                    onChange={(e) => setBookingData({ ...bookingData, special_requests: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
