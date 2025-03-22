"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingBag, Truck, CreditCard, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { products } from "@/lib/data"

// Helper function to format Naira
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    // Simulate fetching data
    setFeaturedProducts(products.slice(0, 4))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
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
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href={isAuthenticated ? "/products" : "/login"}>Shop Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <Link href="/team">Meet Our Team</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden"
            >
              <Image src="/images/hero-shopping.png" alt="Hero Image" fill className="object-cover" priority />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-900">About XGRLTD</h2>
            <p className="text-lg text-purple-700 max-w-3xl mx-auto">
              Founded in 2020, XGRLTD has quickly become a leading e-commerce platform, dedicated to providing
              exceptional products and outstanding customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image src="/images/about-team.png" alt="About XGRLTD" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-900">Our Story</h3>
              <p className="text-purple-700 mb-4">
                XGRLTD was born from a simple idea: to create an online shopping experience that truly puts customers
                first. Our founders, with decades of combined experience in retail and technology, set out to build a
                platform that makes shopping online easy, enjoyable, and reliable.
              </p>
              <p className="text-purple-700 mb-6">
                Today, we serve thousands of customers worldwide, offering a carefully curated selection of products
                across multiple categories. Our commitment to quality, affordability, and customer satisfaction remains
                at the heart of everything we do.
              </p>
              <Button asChild className="bg-teal-500 hover:bg-teal-600">
                <Link href="/team">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-amber-800">Featured Products</h2>
            <Button variant="ghost" asChild className="text-amber-700 hover:text-amber-900 hover:bg-amber-100">
              <Link href={isAuthenticated ? "/products" : "/login"} className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden h-full border-amber-200">
                <Link href={isAuthenticated ? `/products/${product.id}` : "/login"}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
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
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-amber-950">
              <Link href={isAuthenticated ? "/products" : "/login"}>
                {isAuthenticated ? "Browse All Products" : "Login to Shop"}
              </Link>
            </Button>
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

      {/* Testimonials */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-800">What Our Customers Say</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3, 4].map((index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-teal-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                          <Image
                            src={`/images/user-avatar.png`}
                            alt={`Customer ${index}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-teal-700 mb-4">
                          "XGRLTD has been my go-to online store for the past year. Their product quality and customer
                          service are exceptional. I highly recommend them!"
                        </p>
                        <h4 className="font-semibold text-teal-900">
                          {["Ade Johnson", "Chioma Eze", "Tunde Bakare", "Zainab Usman"][index - 1]}
                        </h4>
                        <p className="text-sm text-teal-600">Loyal Customer</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-teal-500 text-white hover:bg-teal-600" />
            <CarouselNext className="bg-teal-500 text-white hover:bg-teal-600" />
          </Carousel>
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
              <Button size="lg" variant="secondary" asChild className="bg-amber-400 text-amber-900 hover:bg-amber-500">
                <Link href={isAuthenticated ? "/products" : "/login"}>
                  {isAuthenticated ? "Browse Products" : "Login to Shop"}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-purple-500">
                <Link href="/signup">Create an Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-purple-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-center text-purple-800">Customer First</h3>
                <p className="text-purple-600 text-center">
                  We prioritize our customers in everything we do, ensuring they have the best shopping experience
                  possible.
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-center text-purple-800">Quality Products</h3>
                <p className="text-purple-600 text-center">
                  We carefully curate our product selection to ensure we offer only the highest quality items to our
                  customers.
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-center text-purple-800">Innovation</h3>
                <p className="text-purple-600 text-center">
                  We constantly strive to innovate and improve our platform to provide the best possible service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-amber-800">Stay Updated</h2>
            <p className="mb-6 text-amber-700">
              Subscribe to our newsletter for the latest products, exclusive offers, and discounts.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <Button className="bg-amber-500 hover:bg-amber-600 text-amber-950">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

