"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Mountain, User, ChevronDown } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/contexts/translation-context"
import { LanguageSelector } from "@/components/language-selector"

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/trip-planner", label: t("nav.tripPlanner") },
    { href: "/bookings", label: t("nav.bookings") },
    { href: "/guides", label: t("nav.guides") },
    { href: "/translate", label: t("nav.translate") },
  ]

  const destinationItems = [
    { href: "/destinations/pristine-waterfalls", label: t("destinations.waterfalls") },
    { href: "/destinations/tribal-heritage", label: t("destinations.heritage") },
    { href: "/destinations/dense-forests", label: t("destinations.forests") },
    { href: "/destinations/authentic-homestays", label: t("destinations.homestays") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Mountain className="h-6 w-6 text-emerald-600" />
            <span className="font-bold text-emerald-900">Jharkhand Tourism</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors">
                {t("nav.destinations")}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {destinationItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSelector />

            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 bg-transparent">
                <User className="h-4 w-4" />
                {t("nav.login")}
              </Button>
            </Link>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-emerald-700 hover:text-emerald-900 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-semibold text-emerald-800 mb-3">{t("nav.destinations")}</p>
                    {destinationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block text-sm text-emerald-600 hover:text-emerald-800 transition-colors py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">{t("nav.login")}</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
