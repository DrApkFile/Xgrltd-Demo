"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (isAuthenticated) {
        window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
      } else {
        window.location.href = "/login"
      }
    }
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Products", href: isAuthenticated ? "/products" : "/login" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-purple-50">
                <div className="flex items-center mb-8">
                  <Image src="/images/xgrltd-logo.png" alt="XGRLTD Logo" width={120} height={40} className="mt-4" />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-purple-600",
                        pathname === link.href ? "text-purple-600" : "text-purple-800",
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/xgrltd-logo.png"
                alt="XGRLTD Logo"
                width={120}
                height={40}
                className="hidden md:block"
              />
              <span className="text-2xl font-bold tracking-tight text-purple-700 md:hidden">XGRLTD</span>
            </Link>
            <nav className="ml-10 hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-purple-600",
                    pathname === link.href ? "text-purple-600" : "text-purple-800",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden md:flex items-center w-full max-w-sm mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full border-purple-200 focus:border-purple-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="ml-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-medium text-amber-950">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            <Link href={isAuthenticated ? "/dashboard" : "/login"}>
              <Button
                variant={isAuthenticated ? "ghost" : "default"}
                size={isAuthenticated ? "icon" : "default"}
                className={
                  isAuthenticated
                    ? "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    : "bg-purple-600 hover:bg-purple-700"
                }
              >
                {isAuthenticated ? (
                  <>
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link href="/signup">
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center w-full py-2 px-4 bg-purple-50">
        <form onSubmit={handleSearch} className="flex w-full">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full border-purple-200 focus:border-purple-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="ml-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>
    </header>
  )
}

