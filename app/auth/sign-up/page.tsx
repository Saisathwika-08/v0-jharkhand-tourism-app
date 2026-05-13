"use client"

import type React from "react"

import { signUp } from "@/lib/firebase/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mountain } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await signUp(email, password)
      // TODO: Store fullName and phone in MongoDB user profile
      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred during sign up")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-900">Jharkhand Tourism</h1>
            <p className="text-emerald-600">Join our community</p>
          </div>

          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-900">Create Account</CardTitle>
              <CardDescription>Sign up to book guides, homestays, and plan your trip</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-emerald-600 hover:text-emerald-800 underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
