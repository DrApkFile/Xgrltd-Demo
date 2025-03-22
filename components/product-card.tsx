"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart, type Product } from "@/components/cart-provider"

// Helper function to format Naira
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/products/${product.id}`}>
        <Card
          className="overflow-hidden h-full border-teal-200"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {product.category && (
              <Badge className="absolute top-2 left-2 bg-teal-500 hover:bg-teal-600">{product.category}</Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 bg-background/80 backdrop-blur-sm ${
                isFavorite ? "text-coral-500" : "text-muted-foreground"
              }`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-coral-500" : ""}`} />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium line-clamp-1 text-teal-900">{product.name}</h3>
            <p className="text-lg font-bold mt-1 text-teal-700">{formatNaira(product.price)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-teal-500 hover:bg-teal-600" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

