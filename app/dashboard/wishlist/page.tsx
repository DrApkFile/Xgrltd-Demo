"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { wishlistItems } from "@/lib/data"

// Helper function to format Naira
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function WishlistPage() {
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" className="text-purple-700 hover:text-purple-900 hover:bg-purple-50 -ml-4" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-coral-900">My Wishlist</h1>
          <p className="text-coral-700">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            className="bg-coral-500 hover:bg-coral-600"
            onClick={() => wishlistItems.forEach((item) => addToCart(item))}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add All to Cart
          </Button>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-coral-200 h-full">
                <div className="relative">
                  <div className="relative aspect-square">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <Badge className="absolute top-2 left-2 bg-coral-500 hover:bg-coral-600">{item.category}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-coral-500 hover:text-coral-700 hover:bg-white"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-coral-900 text-lg">{item.name}</h3>
                  <p className="text-xl font-bold text-coral-800 mt-2">{formatNaira(item.price)}</p>
                  <p className="text-sm text-coral-600 mt-1">Added on July 15, 2023</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button className="bg-coral-500 hover:bg-coral-600" onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="border-coral-300 text-coral-700 hover:bg-coral-50" asChild>
                      <Link href={`/products/${item.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="border-coral-200 text-center py-16">
          <CardContent>
            <Heart className="mx-auto h-16 w-16 text-coral-300 mb-4" />
            <h2 className="text-2xl font-bold text-coral-900 mb-2">Your wishlist is empty</h2>
            <p className="text-coral-600 mb-8 max-w-md mx-auto">
              Browse our products and save your favorites to your wishlist for easy access later.
            </p>
            <Button className="bg-coral-500 hover:bg-coral-600" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

