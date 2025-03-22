"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingBag, Truck, CreditCard, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Helper function to format Naira
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Sample products data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 75000,
    image: "/images/product-headphones.png",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 120000,
    image: "/images/product-smartwatch.png",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 45000,
    image: "/images/product-speaker.png",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Ultra Slim Laptop Pro",
    price: 850000,
    image: "/images/product-laptop.png",
    category: "Electronics",
  },
]

export default function Preview() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-bold tracking-tight text-purple-700">XGRLTD</div>
              <nav className="ml-10 hidden md:flex items-center space-x-6">
                <Link href="#" className="text-sm font-medium text-purple-600">
                  Home
                </Link>
                <Link href="#" className="text-sm font-medium text-purple-800 hover:text-purple-600">
                  About
                </Link>
                <Link href="#" className="text-sm font-medium text-purple-800 hover:text-purple-600">
                  Team
                </Link>
                <Link href="#" className="text-sm font-medium text-purple-800 hover:text-purple-600">
                  Products
                </Link>
                <Link href="#" className="text-sm font-medium text-purple-800 hover:text-purple-600">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                Login
              </Button>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-purple-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-amber-400 text-amber-900 hover:bg-amber-500">Welcome to XGRLTD</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-purple-900">
                Your Ultimate Shopping Destination
              </h1>
              <p className="text-lg text-purple-700 mb-8">
                XGRLTD is a premier online marketplace offering a wide range of high-quality products at competitive
                prices. From electronics to fashion, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Meet Our Team
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-purple-200 flex items-center justify-center text-purple-600">
                Hero Image
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-amber-800">Featured Products</h2>
            <Button variant="ghost" className="text-amber-700 hover:text-amber-900 hover:bg-amber-100">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden h-full border-amber-200">
                <Link href="#">
                  <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-400">Product Image</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1 text-amber-900">{product.name}</h3>
                    <p className="text-lg font-bold mt-1 text-amber-700">{formatNaira(product.price)}</p>
                    <p className="text-sm text-amber-600 mt-2">Login to view details and purchase</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-amber-500 hover:bg-amber-600 text-amber-950">Login to Shop</Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-coral-700">Why Choose XGRLTD</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-coral-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-coral-100 rounded-full mb-4">
                    <ShoppingBag className="h-6 w-6 text-coral-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-coral-700">Wide Selection</h3>
                  <p className="text-coral-600">Thousands of products across multiple categories to choose from.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-coral-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-coral-100 rounded-full mb-4">
                    <Truck className="h-6 w-6 text-coral-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-coral-700">Fast Delivery</h3>
                  <p className="text-coral-600">Quick and reliable shipping to get your products to you faster.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-coral-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-coral-100 rounded-full mb-4">
                    <CreditCard className="h-6 w-6 text-coral-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-coral-700">Secure Payment</h3>
                  <p className="text-coral-600">Multiple secure payment options for your convenience.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-coral-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-coral-100 rounded-full mb-4">
                    <Clock className="h-6 w-6 text-coral-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-coral-700">24/7 Support</h3>
                  <p className="text-coral-600">Our customer service team is always ready to help you.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of satisfied customers and discover the XGRLTD difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-amber-400 text-amber-900 hover:bg-amber-500">
                Login to Shop
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-500">
                Create an Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <div className="text-2xl font-bold text-white">XGRLTD</div>
              </div>
              <p className="text-purple-200">
                Your ultimate shopping destination for quality products at affordable prices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    Deals & Offers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    Shipping & Delivery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    Meet the Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-amber-400">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-12 pt-8 text-center text-purple-300">
            <p>&copy; {new Date().getFullYear()} XGRLTD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

